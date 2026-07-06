'use client';

import { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  actionDraft?: {
    type: string;
    description: string;
    details: string;
  };
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'system',
      content: 'Chat is the source of truth for all actions. UI components draft actions here for your confirmation.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for drafted actions from UI components
  useEffect(() => {
    const handleDraftAction = (event: CustomEvent) => {
      const action = event.detail as { type: string; description: string; details: string };
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'agent',
        content: `Drafted action: ${action.description}`,
        timestamp: new Date(),
        actionDraft: action,
      };
      setMessages((prev) => [...prev, newMessage]);
      
      // Auto-open chat if closed
      if (!isOpen) {
        // Trigger parent to open chat - this would need to be passed as prop in real implementation
        window.dispatchEvent(new CustomEvent('openChat'));
      }
    };

    window.addEventListener('draftAction', handleDraftAction as EventListener);
    return () => {
      window.removeEventListener('draftAction', handleDraftAction as EventListener);
    };
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: 'Action confirmed. Executing...',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    }, 500);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Chat Panel */}
      <aside
        className={`fixed right-0 top-0 h-full bg-tem-dark-2 border-l border-tem-dark-3 transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } w-full lg:w-96`}
      >
        {/* Header */}
        <div className="p-4 border-b border-tem-dark-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Chat</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-tem-dark-3 text-tem-neutral-muted hover:text-white transition-colors"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-tem-accent text-tem-dark-1'
                    : message.type === 'agent'
                    ? 'bg-tem-dark-3 text-white'
                    : 'bg-tem-accent-deep/30 text-tem-neutral-muted border border-tem-accent/20'
                }`}
              >
                <div className="text-sm">{message.content}</div>
                {message.actionDraft && (
                  <div className="mt-2 pt-2 border-t border-tem-accent/20">
                    <div className="text-xs font-mono text-tem-accent">
                      {message.actionDraft.type}
                    </div>
                    <div className="text-xs mt-1">{message.actionDraft.details}</div>
                  </div>
                )}
                <div className="text-xs mt-1 opacity-60">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-tem-dark-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white placeholder-tem-neutral-muted focus:outline-none focus:border-tem-accent/50"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-tem-accent text-tem-dark-1 font-semibold rounded-lg hover:bg-tem-accent-soft transition-colors"
            >
              Send
            </button>
          </div>
          <p className="text-xs text-tem-neutral-muted mt-2">
            All actions are drafted here. Confirm in chat to execute.
          </p>
        </div>
      </aside>
    </>
  );
}


