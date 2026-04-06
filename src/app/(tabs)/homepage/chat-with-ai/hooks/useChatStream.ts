import { useCallback, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STREAMING_BASE_URL, API_KEY, MessageDetail } from "../types/chat";
import useChatStore from "@/src/store/chatStore";

interface UseChatStreamProps {
  onChunkReceived: (chunk: string) => void;
  onStreamStart: () => void;
  onStreamEnd: (fullText: string) => void;
  onStreamError: (error: string) => void;
}

export const useChatStream = ({
  onChunkReceived,
  onStreamStart,
  onStreamEnd,
  onStreamError,
}: UseChatStreamProps) => {
  const hasFetchedRef = useRef(false);
  const lastMessageDetailRef = useRef<string>("");

  const fetchAI = useCallback(async (messageDetail: MessageDetail) => {
    const token = await AsyncStorage.getItem("token");

    onStreamStart();

    try {
      const response = await fetch(`${STREAMING_BASE_URL}/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY || "",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageDetail),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch AI: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No reader available");
      }

      const decoder = new TextDecoder("utf-8");
      let fullText = "";
      let isFirstChunk = true;

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          onStreamEnd(fullText);
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const cleanedChunk = chunk.replace(/\\n/g, "\n");

        if (isFirstChunk) {
          useChatStore.getState().removeTypingIndicator();
          isFirstChunk = false;
        }

        fullText += cleanedChunk;
        onChunkReceived(cleanedChunk);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to get response. Please try again.";
      onStreamError(errorMessage);
    }
  }, [onChunkReceived, onStreamStart, onStreamEnd, onStreamError]);

  const canFetch = useCallback(
    (messageDetail: MessageDetail | null): boolean => {
      if (!messageDetail) return false;

      const currentString = JSON.stringify(messageDetail);
      const shouldFetch =
        currentString !== lastMessageDetailRef.current && !hasFetchedRef.current;

      if (shouldFetch) {
        hasFetchedRef.current = true;
        lastMessageDetailRef.current = currentString;
      }

      return shouldFetch;
    },
    []
  );

  const resetFetchFlag = useCallback(() => {
    hasFetchedRef.current = false;
  }, []);

  return {
    fetchAI,
    canFetch,
    resetFetchFlag,
  };
};
