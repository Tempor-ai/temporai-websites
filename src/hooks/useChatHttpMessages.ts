// src/hooks/useChatHttpMessages.ts
import { useCallback, useMemo } from 'react';
import { v4 as uuid4 } from 'uuid';

export interface ChatResponse {
  ok: boolean;
  status: number;
  replyText?: string;
  raw?: any;
  responses?: any[];
  error?: string;
}

interface UseChatOptions {
  baseOrigin?: string;
  username?: string;
  account?: string;
  world?: string;
  storageMode?: string;
  timeoutMs?: number;
  authHeaderName?: string;
}

const DEFAULT_BASE = 'http://127.0.0.1:8080'; // Default NodeAI backend port (maps to container port 80)

export default function useChatHttpMessages(options: UseChatOptions = {}) {
  const baseOrigin = useMemo(() => {
    const origin = options.baseOrigin ||
      process.env.NEXT_PUBLIC_NODEAI_API_URL ||
      DEFAULT_BASE;
    return origin.replace(/\/+$/, '');
  }, [options.baseOrigin]);

  const username = options.username || 'anonymous';
  const account = options.account || username || 'MyAccount';
  const world = options.world || 'Agents';
  const storageMode = options.storageMode || 'local';
  const timeoutMs = options.timeoutMs || 300000;
  const authHeaderName = options.authHeaderName || 'X-Auth-User';

  const sendToAgent = useCallback(
    async (agentKey: string, agentId: string, text: string | object, extraMeta: any = {}): Promise<ChatResponse> => {
      const extraHeaders = extraMeta?.extraHeaders || {};

      // Build envelope
      const thought = typeof text === 'object' && text !== null
        ? { message_type: 'plain/txt', role: 'user', ...text }
        : { message_type: 'plain/txt', content: String(text ?? ''), role: 'user' };

      const envelope = {
        id: uuid4(),
        mind_type: agentKey,
        mind_id: agentId || '_collective',
        sequence: 1,
        correlation_id: uuid4(),
        thought,
        metadata: {
          username,
          account,
          world,
          storage_mode: storageMode,
          ...extraMeta,
          client_ts: Date.now(),
        },
        protocol_version: '1.0',
      };

      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...extraHeaders,
        };

        if (authHeaderName && username) {
          headers[authHeaderName] = username;
        }

        // DEBUG: Log request details
        // Use wait=all to capture all streamed responses (buttons, media, etc.) not just final
        console.log('[useChatHttpMessages] POSTing to:', `${baseOrigin}/nodeai/send?wait=all`);
        console.log('[useChatHttpMessages] Envelope:', envelope);

        const resp = await fetch(`${baseOrigin}/nodeai/send?wait=all`, {
          method: 'POST',
          headers,
          body: JSON.stringify(envelope),
          signal: controller.signal,
        });

        const rawText = await resp.text();

        // DEBUG: Log raw response
        console.log('[useChatHttpMessages] Raw Response:', rawText);

        if (!resp.ok) {
          console.error('[useChatHttpMessages] HTTP Error:', resp.status);
          return { ok: false, status: resp.status, error: rawText || `HTTP ${resp.status}` };
        }

        let json;
        try {
          json = JSON.parse(rawText);
          // DEBUG: Log parsed JSON
          console.log('[useChatHttpMessages] Parsed JSON:', json);
        } catch {
          console.error('[useChatHttpMessages] Invalid JSON received');
          return { ok: false, status: resp.status, error: 'Invalid JSON', raw: rawText };
        }

        // Extract reply text from the response structure
        // Backend returns: { status, correlation_id, response: { id, type, content, role, metadata }, responses, error }
        let replyText = '';
        if (json.response?.content) {
          replyText = json.response.content;
        } else if (json.answer) {
          // Fallback for simple agents
          replyText = json.answer;
        } else if (Array.isArray(json.responses) && json.responses.length > 0) {
          // If using wait=all, get content from first response
          replyText = json.responses[0]?.content || '';
        }

        return {
          ok: true,
          status: 200,
          replyText,
          raw: json,
          responses: Array.isArray(json.responses) ? json.responses : (json.response ? [json.response] : []),
        };
      } catch (err: any) {
        return { ok: false, status: 0, error: err.name === 'AbortError' ? 'timeout' : String(err) };
      } finally {
        clearTimeout(t);
      }
    },
    [account, authHeaderName, baseOrigin, storageMode, timeoutMs, username, world]
  );

  return { baseUrl: baseOrigin, sendToAgent };
}
