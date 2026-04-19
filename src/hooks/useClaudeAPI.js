import { useState, useCallback, useRef } from 'react';

export function useClaudeAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(null);

  const sendMessage = useCallback(async (userMessage, conversationHistory, simulatorState, onChunk) => {
    setIsLoading(true);

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage,
          conversationHistory,
          simulatorState,
        }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API 请求失败');
      }

      const fullText = data.reply || '';
      onChunk?.(fullText);
      return fullText;
    } catch (err) {
      if (err.name !== 'AbortError') {
        onChunk?.(`\n（请求出错：${err.message}）`);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const abort = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return { sendMessage, isLoading, abort };
}
