import { useRef, useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import useChatStore from "@/src/store/chatStore";
import { extractQuota } from "@/src/widgets/messageParser";
import { API_KEY, STREAMING_BASE_URL } from "../types";
import { formatDateHeader } from "@/src/utils/formatDateHeader";
import { ChatMessageDetail } from "../types";

interface UseChatStreamReturn {
  streamingText: string;
  setStreamingText: React.Dispatch<React.SetStateAction<string>>;
  isStreaming: boolean;
  fetchAI: (messageDatail: ChatMessageDetail) => Promise<void>;
  stopTypingAnimation: () => void;
  hasFetchedAIRef: React.MutableRefObject<boolean>;
  lastMessageDetailRef: React.MutableRefObject<ChatMessageDetail | null>;
}

export const useChatStream = (
  onQuotaError: (error: { message: string; refillsAt: string }) => void,
  setQuotaInfo: (info: any) => void,
): UseChatStreamReturn => {
  const queryClient = useQueryClient();
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const typingQueueRef = useRef<string>("");
  const isTypingRef = useRef(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasFetchedAIRef = useRef(false);
  const lastMessageDetailRef = useRef<ChatMessageDetail | null>(null);

  const startTypingAnimation = useCallback(() => {
    if (isTypingRef.current) return;

    isTypingRef.current = true;

    typingIntervalRef.current = setInterval(() => {
      if (typingQueueRef.current.length === 0) {
        return;
      }

      const nextChar = typingQueueRef.current[0];
      typingQueueRef.current = typingQueueRef.current.slice(1);

      setStreamingText((prev) => prev + nextChar);
    }, 30);
  }, []);

  const stopTypingAnimation = useCallback(() => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    isTypingRef.current = false;
  }, []);

  useEffect(() => {
    return () => {
      stopTypingAnimation();
    };
  }, [stopTypingAnimation]);

  const fetchAI = useCallback(async (messageDatail: ChatMessageDetail) => {
    const token = await AsyncStorage.getItem("token");

    try {
      setIsStreaming(true);
      setStreamingText("");
      typingQueueRef.current = "";

      startTypingAnimation();

      const response = await fetch(`${STREAMING_BASE_URL}/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY || "",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageDatail),
      });

      if (!response.ok) {
        stopTypingAnimation();
        setIsStreaming(false);
        useChatStore.getState().removeTypingIndicator();

        try {
          const errData = await response.json();
          if (errData?.error === "quota_exceeded") {
            const refillDate = new Date(errData.quota_refills_at);
            const refillsAt = refillDate.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });
            onQuotaError({
              message: errData.message || "You've used all your tokens for this period.",
              refillsAt,
            });
            setQuotaInfo({
              status: "exhausted",
              plan: "free",
              used: 0,
              limit: 0,
              resets: errData.quota_refills_at,
            });
          }
        } catch {
          console.error("Failed to fetch AI", response.status);
        }
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        stopTypingAnimation();
        setIsStreaming(false);
        return;
      }

      const decoder = new TextDecoder("utf-8");
      let isFirstChunk = true;

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          const waitForTyping = setInterval(() => {
            if (typingQueueRef.current.length === 0) {
              clearInterval(waitForTyping);
              stopTypingAnimation();

              setStreamingText((prev) => {
                const fullDate = new Date();
                const timestamp = fullDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const date = formatDateHeader(fullDate);

                useChatStore.getState().removeTypingIndicator();
                useChatStore.getState().addMessage({
                  id: `ai-${Date.now()}`,
                  text: prev,
                  isAi: true,
                  timestamp,
                  date,
                  fullDate,
                });

                const q = extractQuota(prev);
                if (q) setQuotaInfo(q);

                queryClient.invalidateQueries({
                  queryKey: ["get-all-chat-history"],
                });
                return "";
              });

              setIsStreaming(false);
            }
          }, 50);

          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const cleanedChunk = chunk.replace(/\\n/g, "\n");

        if (isFirstChunk) {
          useChatStore.getState().removeTypingIndicator();
          isFirstChunk = false;
        }

        typingQueueRef.current += cleanedChunk;

        console.log(
          `📦 Received chunk: ${chunk.length} chars. Queue size: ${typingQueueRef.current.length}`,
        );
      }
    } catch (error) {
      console.error("Error in fetchAI:", error);
      stopTypingAnimation();
      setIsStreaming(false);

      const fullDate = new Date();
      const timestamp = fullDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const date = formatDateHeader(fullDate);

      useChatStore.getState().removeTypingIndicator();
      useChatStore.getState().addMessage({
        id: `error-${Date.now()}`,
        text: "Failed to get response. Please try again.",
        isAi: true,
        timestamp,
        date,
        fullDate,
      });

      queryClient.invalidateQueries({ queryKey: ["get-all-chat-history"] });
    }
  }, [startTypingAnimation, stopTypingAnimation, onQuotaError, setQuotaInfo, queryClient]);

  return {
    streamingText,
    setStreamingText,
    isStreaming,
    fetchAI,
    stopTypingAnimation,
    hasFetchedAIRef,
    lastMessageDetailRef,
  };
};