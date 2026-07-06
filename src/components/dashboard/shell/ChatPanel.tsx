'use client';

import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import useChatHttpMessages from '@/hooks/useChatHttpMessages';
import { marked } from 'marked';

// --- Configuration ---
const MIND_TYPE = "DrHiroAgent";
const MIND_ID = "testing_abc";

// --- Types ---
interface ButtonAction {
  type: 'postback' | 'url' | 'web_app' | 'login' | 'pay' | 'callback';
  data?: string;
  url?: string;
  params?: Record<string, any>;
}

interface ChatButton {
  label: string;
  action: ButtonAction;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  mediaType?: 'image' | 'audio' | 'document';
  dataUri?: string;
  mimeType?: string;
  fileName?: string;
  // Button support
  buttons?: ChatButton[][];
  // Legacy action draft
  actionDraft?: {
    type: string;
    description: string;
    details: string;
  };
}

interface Attachment {
  id: string;
  file: File;
  kind: 'image' | 'audio' | 'document';
  previewUrl: string | null;
}

type FocusMode = 'normal' | 'chat-focus';

// --- Helper Functions ---

// 0. Base64 to Blob URL (for agent->client media)
function b64ToBlobUrl(base64: string, mimeType: string): string | null {
  try {
    const byteChars = atob(base64);
    const bytes = new Uint8Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      bytes[i] = byteChars.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: mimeType || 'application/octet-stream' });
    return URL.createObjectURL(blob);
  } catch (e) {
    console.error('[ChatPanel] b64ToBlobUrl failed:', e);
    return null;
  }
}

// 1. File to Base64
function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      const res = fr.result as string;
      const idx = res.indexOf(',');
      resolve(idx >= 0 ? res.slice(idx + 1) : res);
    };
    fr.onerror = () => reject(fr.error);
    fr.readAsDataURL(file);
  });
}

// 2. Rich Text Renderer (Markdown/HTML) - handles SSR safely
const RichText = memo(({ text }: { text: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [cleanHtml, setCleanHtml] = useState<string>('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    // Only run in browser where DOMPurify works
    const sanitize = async () => {
      const DOMPurify = (await import('dompurify')).default;
      const parsed = marked.parse(text) as string;
      setCleanHtml(DOMPurify.sanitize(parsed));
    };
    sanitize();
  }, [text, isMounted]);

  // During SSR or before mount, render nothing to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  if (!cleanHtml) {
    // Loading state while sanitizing
    return <span className="text-sm opacity-70">{text}</span>;
  }

  return (
    <div
      className="prose prose-invert prose-sm max-w-none [&>p]:mb-1 [&>p:last-child]:mb-0"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
});
RichText.displayName = 'RichText';

// 3. Button Click Handler
const handleButtonClick = (action: ButtonAction, sendCallback: (text: string) => void) => {
  switch (action.type) {
    case 'url':
    case 'web_app':
      // Open URL in new tab
      if (action.url) {
        window.open(action.url, '_blank', 'noopener,noreferrer');
      }
      break;
    case 'postback':
    case 'callback':
      // Send postback data as a message to the agent
      if (action.data) {
        sendCallback(action.data);
      }
      break;
    case 'login':
      // Handle login action - could trigger auth flow
      console.log('[ChatPanel] Login action triggered:', action);
      break;
    case 'pay':
      // Handle payment action
      console.log('[ChatPanel] Pay action triggered:', action);
      break;
    default:
      console.warn('[ChatPanel] Unknown button action type:', action);
  }
};

// 4. Inline Keyboard Component
const InlineKeyboard = memo(({
  buttons,
  onButtonClick
}: {
  buttons: ChatButton[][];
  onButtonClick: (action: ButtonAction) => void;
}) => {
  if (!buttons || buttons.length === 0) return null;

  return (
    <div className="mt-2 space-y-1">
      {buttons.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-1 flex-wrap">
          {row.map((btn, btnIdx) => (
            <button
              key={`${rowIdx}-${btnIdx}`}
              onClick={() => onButtonClick(btn.action)}
              className="flex-1 min-w-[80px] px-3 py-2 bg-tem-accent/20 hover:bg-tem-accent/40 text-tem-accent text-xs font-medium rounded border border-tem-accent/30 transition-colors"
            >
              {btn.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
});
InlineKeyboard.displayName = 'InlineKeyboard';

// 5. Typing Indicator
const TypingDots = () => (
  <div className="flex space-x-1 p-2 bg-tem-dark-3/50 rounded-lg w-fit">
    <div className="w-2 h-2 bg-tem-accent/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-tem-accent/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-tem-accent/50 rounded-full animate-bounce"></div>
  </div>
);

// --- Main Component ---

const DEFAULT_WIDTH = 30;
const MIN_WIDTH_PX = 350;
const MAX_WIDTH_PERCENT = 60;

export default function ChatPanel() {
  // -- State --
  const [isMounted, setIsMounted] = useState(false);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [focusMode, setFocusMode] = useState<FocusMode>('normal');
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  // Hydration fix: only render after client mount
  useEffect(() => {
    setIsMounted(true);
    // Initialize messages only on client to avoid hydration mismatch
    setMessages([{
      id: 'init',
      type: 'system',
      content: `Connected to ${MIND_TYPE} (${MIND_ID}). Ready for commands.`,
      timestamp: new Date()
    }]);
  }, []);

  // -- Refs --
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isResizingRef = useRef(false);
  const seenIdsRef = useRef(new Set<string>());

  // -- Hooks --
  const { sendToAgent, baseUrl } = useChatHttpMessages({
    username: 'dashboard_user', // Could come from auth context
  });

  // -- Effects --

  // 1. Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // 2. Handle Resizing
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current || !panelRef.current?.parentElement?.parentElement) return;
    const container = panelRef.current.parentElement.parentElement;
    const containerRect = container.getBoundingClientRect();
    const newWidthPx = containerRect.right - e.clientX;
    const newWidthPercent = (newWidthPx / container.offsetWidth) * 100;
    const clamped = Math.max((MIN_WIDTH_PX / container.offsetWidth) * 100, Math.min(MAX_WIDTH_PERCENT, newWidthPercent));
    setWidth(clamped);
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizingRef.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // 3. SSE Listener (Streaming)
  useEffect(() => {
    let es: EventSource | null = null;
    try {
      const url = `${baseUrl}/nodeai/events/${MIND_TYPE}/${MIND_ID}`;
      console.log('[ChatPanel] Connecting SSE:', url);
      es = new EventSource(url);

      es.onopen = () => {
        console.log('[ChatPanel] SSE Connected');
      };

      es.onmessage = (evt) => {
        console.log('[ChatPanel] SSE Event:', evt.data);
        try {
          const obj = JSON.parse(evt.data);
          if (obj?.type === 'connected' || obj?.type === 'heartbeat') {
            console.log('[ChatPanel] SSE heartbeat/connected:', obj.type);
            return;
          }

          // Dedup based on envelope ID
          if (obj?.id && seenIdsRef.current.has(obj.id)) {
            console.log('[ChatPanel] SSE Dedup - skipping:', obj.id);
            return;
          }
          if (obj?.id) seenIdsRef.current.add(obj.id);

          const th = obj?.thought || {};
          console.log('[ChatPanel] Processing thought from SSE:', th);
          handleIncomingThought(th);
        } catch (e) {
          console.error("[ChatPanel] SSE Parse Error", e);
        }
      };

      es.onerror = (e) => {
        console.error("[ChatPanel] SSE Error:", e);
      };
    } catch (e) {
      console.error("[ChatPanel] SSE Connection Error", e);
    }
    return () => {
      console.log('[ChatPanel] SSE Closing');
      es?.close();
    };
  }, [baseUrl]);

  // 4. Listen for Draft Actions from UI
  useEffect(() => {
    const handleDraftAction = (event: CustomEvent) => {
      const action = event.detail;
      // Auto-open if closed
      if (isCollapsed) setIsCollapsed(false);

      // Populate input or send immediately depending on UX preference.
      // Here we append a system message asking for confirmation
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'agent',
        content: `Drafting Action: ${action.description}`,
        timestamp: new Date(),
        actionDraft: action
      }]);
    };

    window.addEventListener('draftAction', handleDraftAction as EventListener);
    return () => window.removeEventListener('draftAction', handleDraftAction as EventListener);
  }, [isCollapsed]);

  // -- Logic --

  const handleIncomingThought = (th: any) => {
    console.log('[ChatPanel] handleIncomingThought called with:', th);
    setIsThinking(false);

    // Extract content - may be string or object
    const rawContent = th.content || th.text || '';

    // message_type can be at top level OR in metadata
    const mt = th.message_type || th.mime_type || th.metadata?.message_type || '';

    // Also check 'type' field for button detection (backend sends type: 'buttons')
    const thoughtType = th.type || '';

    console.log('[ChatPanel] Extracted content type:', typeof rawContent, 'message_type:', mt, 'type:', thoughtType);

    // Handle ButtonThought - detect by MIME type OR by type field
    const isButtonThought = mt === 'application/vnd.nodeai.buttons+json' || thoughtType === 'buttons';

    if (isButtonThought) {
      console.log('[ChatPanel] Detected ButtonThought');
      try {
        // Content may already be an object or may be JSON string
        const buttonData = typeof rawContent === 'string' ? JSON.parse(rawContent) : rawContent;
        const textContent = buttonData.text || '';
        const rawButtons = buttonData.buttons || [];

        // Transform to ChatButton format
        const buttons: ChatButton[][] = rawButtons.map((row: any[]) =>
          row.map((btn: any) => ({
            label: btn.label || btn.text || 'Button',
            action: {
              type: btn.action?.type || 'postback',
              data: btn.action?.data,
              url: btn.action?.url,
              params: btn.action?.params
            }
          }))
        );

        console.log('[ChatPanel] Adding button message with', buttons.length, 'rows, text:', textContent);
        setMessages(prev => [...prev, {
          id: Date.now().toString() + Math.random(),
          type: 'agent' as const,
          content: textContent,
          timestamp: new Date(),
          buttons
        }]);
      } catch (e) {
        console.error('[ChatPanel] Failed to parse ButtonThought:', e);
        // Fallback: show text representation
        const fallbackText = typeof rawContent === 'object' ? JSON.stringify(rawContent) : String(rawContent);
        if (fallbackText) {
          setMessages(prev => [...prev, {
            id: Date.now().toString() + Math.random(),
            type: 'agent' as const,
            content: fallbackText,
            timestamp: new Date()
          }]);
        }
      }
      return;
    }

    // Ensure content is a string for non-button/non-media thoughts
    const content = typeof rawContent === 'object' ? JSON.stringify(rawContent) : String(rawContent || '');

    // Handle Images - detect by MIME type OR by type field
    const isImageThought = mt.startsWith('image/') || thoughtType === 'image';
    if (isImageThought) {
      const imageMime = mt.startsWith('image/') ? mt : (th.metadata?.message_type || 'image/jpeg');
      console.log('[ChatPanel] Adding image message:', imageMime);
      const blobUrl = b64ToBlobUrl(content, imageMime);
      const imageCaption = th.caption || th.query || th.metadata?.caption || '';
      if (blobUrl) {
        setMessages(prev => [...prev, {
          id: Date.now().toString() + Math.random(),
          type: 'agent' as const,
          content: imageCaption,
          timestamp: new Date(),
          mediaType: 'image' as const,
          mimeType: imageMime,
          dataUri: blobUrl
        }]);
      } else {
        // Fallback to data URI if blob fails
        setMessages(prev => [...prev, {
          id: Date.now().toString() + Math.random(),
          type: 'agent' as const,
          content: imageCaption,
          timestamp: new Date(),
          mediaType: 'image' as const,
          mimeType: imageMime,
          dataUri: `data:${imageMime};base64,${content}`
        }]);
      }
      return;
    }

    // Handle Audio - detect by MIME type OR by type field
    const isAudioThought = mt.startsWith('audio/') || thoughtType === 'audio';
    if (isAudioThought) {
      const audioMime = mt.startsWith('audio/') ? mt : (th.metadata?.message_type || 'audio/mpeg');
      console.log('[ChatPanel] Adding audio message:', audioMime);
      const blobUrl = b64ToBlobUrl(content, audioMime);
      const audioCaption = th.caption || th.query || th.metadata?.caption || '';
      if (blobUrl) {
        setMessages(prev => [...prev, {
          id: Date.now().toString() + Math.random(),
          type: 'agent' as const,
          content: audioCaption,
          timestamp: new Date(),
          mediaType: 'audio' as const,
          mimeType: audioMime,
          dataUri: blobUrl
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: Date.now().toString() + Math.random(),
          type: 'agent' as const,
          content: audioCaption,
          timestamp: new Date(),
          mediaType: 'audio' as const,
          mimeType: audioMime,
          dataUri: `data:${audioMime};base64,${content}`
        }]);
      }
      return;
    }

    // Handle Documents (PDF, XLS, XLSX) - detect by MIME type OR by type field
    const DOC_MIMES = [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    const isDocumentThought = DOC_MIMES.includes(mt) || thoughtType === 'document';
    if (isDocumentThought) {
      // Get the actual MIME type - may be in mt or metadata
      const docMime = DOC_MIMES.includes(mt) ? mt : (th.metadata?.message_type || 'application/pdf');
      console.log('[ChatPanel] Adding document message:', docMime);
      const blobUrl = b64ToBlobUrl(content, docMime);

      // Determine filename - check multiple sources
      let fileName = th.filename || th.fileName || th.metadata?.filename;
      if (!fileName) {
        if (docMime === 'application/pdf') fileName = 'document.pdf';
        else if (docMime === 'application/vnd.ms-excel') fileName = 'workbook.xls';
        else fileName = 'workbook.xlsx';
      }

      // Determine file type label
      let fileTypeLabel = 'FILE';
      if (docMime === 'application/pdf') fileTypeLabel = 'PDF';
      else if (docMime === 'application/vnd.ms-excel') fileTypeLabel = 'XLS';
      else if (docMime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') fileTypeLabel = 'XLSX';

      // Get caption from multiple sources
      const caption = th.caption || th.metadata?.caption || '';

      if (blobUrl) {
        setMessages(prev => [...prev, {
          id: Date.now().toString() + Math.random(),
          type: 'agent' as const,
          content: caption,
          timestamp: new Date(),
          mediaType: 'document' as const,
          mimeType: docMime,
          dataUri: blobUrl,
          fileName
        }]);
      } else {
        // Fallback: show filename only (can't create blob)
        setMessages(prev => [...prev, {
          id: Date.now().toString() + Math.random(),
          type: 'agent' as const,
          content: `[${fileTypeLabel}] ${fileName}`,
          timestamp: new Date()
        }]);
      }
      return;
    }

    // Handle Text (fallback)
    if (content) {
      console.log('[ChatPanel] Adding text message:', content.substring(0, 100));
      setMessages(prev => [...prev, {
        id: Date.now().toString() + Math.random(),
        type: 'agent' as const,
        content: content,
        timestamp: new Date()
      }]);
    } else {
      console.log('[ChatPanel] No content to add from thought');
    }
  };

  const handleSend = async () => {
    console.log('[ChatPanel] handleSend called, input:', input, 'attachments:', attachments.length);
    if ((!input.trim() && attachments.length === 0) || isThinking) {
      console.log('[ChatPanel] handleSend early return - empty input or already thinking');
      return;
    }

    const textToSend = input;
    const filesToSend = [...attachments];

    // Clear UI immediately
    setInput('');
    setAttachments([]);
    setIsThinking(true);

    // Optimistic UI Update
    const tempId = Date.now().toString();

    // 1. Handle Files
    if (filesToSend.length > 0) {
      console.log('[ChatPanel] Sending files:', filesToSend.length);
      for (const att of filesToSend) {
        setMessages(prev => [...prev, {
          id: tempId + att.id,
          type: 'user',
          content: '',
          timestamp: new Date(),
          mediaType: att.kind,
          dataUri: att.previewUrl || undefined,
          fileName: att.file.name
        }]);

        try {
          const base64 = await readFileAsBase64(att.file);
          await sendToAgent(MIND_TYPE, MIND_ID, {
            message_type: att.file.type,
            content: base64,
            filename: att.file.name,
            caption: filesToSend.length === 1 ? textToSend : undefined // Caption only if single file
          });
        } catch (e) {
          console.error("[ChatPanel] Upload failed", e);
          setMessages(prev => [...prev, { id: Date.now().toString(), type: 'system', content: `Failed to upload ${att.file.name}`, timestamp: new Date() }]);
        }
      }
    }

    // 2. Handle Text (if not used as single caption)
    if (textToSend && !(filesToSend.length === 1)) {
      console.log('[ChatPanel] Sending text:', textToSend);
      setMessages(prev => [...prev, {
        id: tempId,
        type: 'user',
        content: textToSend,
        timestamp: new Date()
      }]);

      const res = await sendToAgent(MIND_TYPE, MIND_ID, textToSend);
      console.log('[ChatPanel] sendToAgent result:', res);

      // Handle HTTP response - process ALL responses (buttons, media, text)
      if (res.ok) {
        console.log('[ChatPanel] Processing responses:', res.responses?.length || 0, 'items');

        // Process each response in the responses array
        if (res.responses && res.responses.length > 0) {
          for (const response of res.responses) {
            // Each response has: { id, type, content, role, metadata, message_type }
            const thought = response.thought || response;
            console.log('[ChatPanel] Processing response thought:', thought);
            handleIncomingThought(thought);
          }
        } else if (res.replyText) {
          // Fallback: just show replyText if no structured responses
          console.log('[ChatPanel] Fallback to replyText:', res.replyText);
          setMessages(prev => [...prev, {
            id: Date.now().toString() + Math.random(),
            type: 'agent' as const,
            content: res.replyText!,
            timestamp: new Date()
          }]);
        }
        setIsThinking(false);
      } else if (!res.ok) {
        console.error('[ChatPanel] sendToAgent error:', res.error);
        setIsThinking(false);
        setMessages(prev => [...prev, { id: Date.now().toString(), type: 'system', content: `Error: ${res.error}`, timestamp: new Date() }]);
      }
    }
  };

  // Attachments Logic
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newAttachments: Attachment[] = Array.from(e.target.files).map(f => ({
        id: Math.random().toString(36),
        file: f,
        kind: f.type.startsWith('image/') ? 'image' : f.type.startsWith('audio/') ? 'audio' : 'document',
        previewUrl: (f.type.startsWith('image/') || f.type.startsWith('audio/')) ? URL.createObjectURL(f) : null
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  // -- Render --

  // Prevent hydration mismatch by not rendering until client-side
  if (!isMounted) {
    return null;
  }

  console.log('[ChatPanel] Rendering. Messages count:', messages.length);

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed right-6 bottom-6 w-14 h-14 bg-tem-accent text-tem-dark-1 rounded-full shadow-tem-glow hover:bg-tem-accent-soft flex items-center justify-center z-50 transition-transform hover:scale-105"
      >
        <span className="text-2xl">💬</span>
      </button>
    );
  }

  const actualWidth = isCollapsed ? 0 : width;

  return (
    <div
      className="relative h-full flex z-40 shadow-xl"
      style={{
        width: `${actualWidth}%`,
        minWidth: `${MIN_WIDTH_PX}px`,
      }}
    >
      {/* Resize Handle */}
      <div
        onMouseDown={startResize}
        className="absolute left-0 top-0 bottom-0 w-1 bg-tem-dark-3 hover:bg-tem-accent cursor-col-resize z-50 transition-colors group"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-transparent group-hover:bg-tem-accent rounded-full" />
      </div>

      <aside ref={panelRef} className="h-full bg-tem-dark-2 border-l border-tem-dark-3 flex flex-col w-full">
        {/* Header */}
        <div className="p-4 border-b border-tem-dark-3 flex justify-between items-center bg-tem-dark-1/50">
          <div>
            <h3 className="font-semibold text-white">Dr. Hiro</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tem-accent animate-pulse"/>
              <span className="text-xs text-tem-neutral-muted font-mono">{MIND_ID}</span>
            </div>
          </div>
          <button onClick={() => setIsCollapsed(true)} className="p-2 hover:bg-tem-dark-3 rounded text-tem-neutral-muted">
            ✕
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-tem-dark-2">
          {messages.map((msg) => {
            const isUser = msg.type === 'user';
            const isSystem = msg.type === 'system';
            return (
              <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`
                    max-w-[85%] rounded-2xl p-3 text-sm
                    ${isSystem ? 'bg-tem-dark-3 border border-dashed border-tem-neutral-muted/30 text-tem-neutral-muted w-full text-center' : ''}
                    ${isUser ? 'bg-tem-accent text-tem-dark-1 rounded-tr-none' : ''}
                    ${!isUser && !isSystem ? 'bg-tem-dark-3 text-white border border-tem-dark-3 rounded-tl-none' : ''}
                  `}
                >
                  {/* Media: Images */}
                  {msg.mediaType === 'image' && msg.dataUri && (
                    <img src={msg.dataUri} alt="media" className="max-h-64 max-w-full rounded-md mb-2 border border-black/10" />
                  )}

                  {/* Media: Audio */}
                  {msg.mediaType === 'audio' && msg.dataUri && (
                    <div className="mb-2">
                      <audio controls src={msg.dataUri} className="max-w-full">
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}

                  {/* Media: Documents (PDF/XLS/XLSX) */}
                  {msg.mediaType === 'document' && msg.dataUri && (
                    <div className="flex items-center gap-3 mb-2 p-2 bg-black/10 rounded-lg border border-white/10">
                      <div className="px-2 py-1 text-xs rounded bg-tem-accent/20 border border-tem-accent/30 text-tem-accent font-mono">
                        {msg.mimeType === 'application/pdf' ? 'PDF' :
                         msg.mimeType === 'application/vnd.ms-excel' ? 'XLS' :
                         msg.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? 'XLSX' : 'FILE'}
                      </div>
                      <a
                        href={msg.dataUri}
                        download={msg.fileName || 'document'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-tem-accent hover:text-tem-accent-soft underline text-sm truncate max-w-[200px]"
                      >
                        {msg.fileName || 'Download'}
                      </a>
                    </div>
                  )}

                  {/* Content (text/caption) */}
                  {msg.content && <RichText text={msg.content} />}

                  {/* Action Draft UI */}
                  {msg.actionDraft && (
                    <div className="mt-3 p-3 bg-black/20 rounded border border-white/10">
                      <p className="font-mono text-xs text-tem-accent mb-1 uppercase">{msg.actionDraft.type}</p>
                      <p className="text-xs opacity-90">{msg.actionDraft.details}</p>
                      <button
                        onClick={() => {
                          setInput(`Confirm execute: ${msg.actionDraft?.description}`);
                          // Optional: Auto-focus input
                        }}
                        className="mt-2 w-full py-1 bg-tem-accent/20 hover:bg-tem-accent/30 text-tem-accent text-xs rounded transition-colors"
                      >
                        Load into Input
                      </button>
                    </div>
                  )}

                  {/* Inline Keyboard Buttons */}
                  {msg.buttons && msg.buttons.length > 0 && (
                    <InlineKeyboard
                      buttons={msg.buttons}
                      onButtonClick={(action) => {
                        handleButtonClick(action, async (postbackData) => {
                          // Send postback as user message directly
                          if (isThinking) return;
                          setIsThinking(true);

                          // Add user message showing the button click
                          setMessages(prev => [...prev, {
                            id: Date.now().toString(),
                            type: 'user' as const,
                            content: postbackData,
                            timestamp: new Date()
                          }]);

                          // Send to agent
                          const res = await sendToAgent(MIND_TYPE, MIND_ID, postbackData);
                          if (res.ok && res.replyText) {
                            setMessages(prev => [...prev, {
                              id: Date.now().toString() + Math.random(),
                              type: 'agent' as const,
                              content: res.replyText!,
                              timestamp: new Date()
                            }]);
                            setIsThinking(false);
                          } else if (!res.ok) {
                            setMessages(prev => [...prev, {
                              id: Date.now().toString(),
                              type: 'system' as const,
                              content: `Error: ${res.error}`,
                              timestamp: new Date()
                            }]);
                            setIsThinking(false);
                          }
                        });
                      }}
                    />
                  )}

                  <div className={`text-[10px] mt-1 text-right ${isUser ? 'opacity-60 text-black' : 'text-tem-neutral-muted'}`}>
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            );
          })}

          {isThinking && <TypingDots />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-tem-dark-3 bg-tem-dark-2">
          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
              {attachments.map(att => (
                <div key={att.id} className="relative group flex-shrink-0">
                  {att.kind === 'image' && att.previewUrl ? (
                    <img src={att.previewUrl} className="h-16 w-16 object-cover rounded border border-tem-accent/30" alt="" />
                  ) : (
                    <div className="h-16 w-16 bg-tem-dark-3 border border-tem-dark-3 rounded flex items-center justify-center text-xs text-center p-1">
                      {att.kind}
                    </div>
                  )}
                  <button
                    onClick={() => setAttachments(prev => prev.filter(p => p.id !== att.id))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >✕</button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2">
            {/* File Upload */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 bg-tem-dark-3 rounded-xl hover:bg-tem-dark-3/80 text-tem-accent transition-colors"
            >
              📎
            </button>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
            />

            {/* Text Input */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask Dr. Hiro..."
              className="flex-1 bg-tem-dark-3 border border-tem-dark-3 rounded-xl px-4 py-3 text-white placeholder-tem-neutral-muted focus:outline-none focus:border-tem-accent resize-none h-[48px] max-h-[120px]"
              rows={1}
            />

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={isThinking || (!input.trim() && attachments.length === 0)}
              className="p-3 bg-tem-accent text-tem-dark-1 rounded-xl font-bold hover:bg-tem-accent-soft disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-tem-glow"
            >
              ➤
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
