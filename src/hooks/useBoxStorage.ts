// src/hooks/useBoxStorage.ts
/**
 * Hook for interacting with NodeAI box/unbox storage API.
 *
 * Provides methods to store (box) and retrieve (unbox) data associated
 * with an agent's mind, such as portfolio configurations.
 */
import { useCallback, useMemo, useState } from 'react';

export interface BoxResponse {
  ok: boolean;
  key?: string;
  error?: string;
}

export interface UnboxResponse<T = any> {
  ok: boolean;
  content?: T;
  contentType?: string;
  error?: string;
}

interface UseBoxStorageOptions {
  baseOrigin?: string;
  mindType?: string;
  mindId?: string;
  timeoutMs?: number;
}

const DEFAULT_BASE = 'http://127.0.0.1:8080';

export default function useBoxStorage(options: UseBoxStorageOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseOrigin = useMemo(() => {
    const origin = options.baseOrigin ||
      process.env.NEXT_PUBLIC_NODEAI_API_URL ||
      DEFAULT_BASE;
    return origin.replace(/\/+$/, '');
  }, [options.baseOrigin]);

  const mindType = options.mindType || 'DrHiroAgent';
  const mindId = options.mindId || '_collective';
  const timeoutMs = options.timeoutMs || 30000;

  /**
   * Store data in agent storage (box operation).
   *
   * @param path - Storage key/path (e.g., 'portfolio')
   * @param content - Content to store (JSON-serializable)
   * @param contentType - Content type: 'json', 'text', or 'bytes'
   * @returns BoxResponse indicating success or failure
   */
  const box = useCallback(
    async (
      path: string,
      content: any,
      contentType: string = 'json'
    ): Promise<BoxResponse> => {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(`${baseOrigin}/nodeai/box`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mind_type: mindType,
            mind_id: mindId,
            path,
            content,
            content_type: contentType,
          }),
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok || !data.ok) {
          const errMsg = data.error || `HTTP ${response.status}`;
          setError(errMsg);
          return { ok: false, error: errMsg };
        }

        return { ok: true, key: data.key };
      } catch (err: any) {
        const errMsg = err.name === 'AbortError' ? 'timeout' : String(err);
        setError(errMsg);
        return { ok: false, error: errMsg };
      } finally {
        clearTimeout(t);
        setLoading(false);
      }
    },
    [baseOrigin, mindType, mindId, timeoutMs]
  );

  /**
   * Retrieve data from agent storage (unbox operation).
   *
   * @param path - Storage key/path (e.g., 'portfolio')
   * @returns UnboxResponse with content or error
   */
  const unbox = useCallback(
    async <T = any>(path: string): Promise<UnboxResponse<T>> => {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(`${baseOrigin}/nodeai/unbox`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mind_type: mindType,
            mind_id: mindId,
            path,
          }),
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok || !data.ok) {
          const errMsg = data.error || `HTTP ${response.status}`;
          // Don't set error state for "not_found" - it's a valid response
          if (errMsg !== 'not_found') {
            setError(errMsg);
          }
          return { ok: false, error: errMsg };
        }

        return {
          ok: true,
          content: data.content as T,
          contentType: data.content_type,
        };
      } catch (err: any) {
        const errMsg = err.name === 'AbortError' ? 'timeout' : String(err);
        setError(errMsg);
        return { ok: false, error: errMsg };
      } finally {
        clearTimeout(t);
        setLoading(false);
      }
    },
    [baseOrigin, mindType, mindId, timeoutMs]
  );

  return {
    box,
    unbox,
    loading,
    error,
    clearError: () => setError(null),
  };
}
