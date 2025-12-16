import { TYPING_ANIMATION_SPEED, TYPING_FINISH_CHECK_INTERVAL } from "@/src/constants";
import { useCallback, useEffect, useRef, useState } from "react";

export const useTypingAnimation = (onAnimationComplete?: () => void) => {
  const [displayedText, setDisplayedText] = useState("");
  const typingQueueRef = useRef<string>("");
  const isTypingRef = useRef(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTyping = useCallback(() => {
    if (isTypingRef.current) return;

    isTypingRef.current = true;

    typingIntervalRef.current = setInterval(() => {
      if (typingQueueRef.current.length === 0) {
        return;
      }

      const nextChar = typingQueueRef.current[0];
      typingQueueRef.current = typingQueueRef.current.slice(1);

      setDisplayedText((prev) => prev + nextChar);
    }, TYPING_ANIMATION_SPEED);
  }, []);

  const stopTyping = useCallback(() => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    isTypingRef.current = false;
  }, []);

  const addToQueue = useCallback((text: string) => {
    typingQueueRef.current += text;
  }, []);

  const reset = useCallback(() => {
    stopTyping();
    setDisplayedText("");
    typingQueueRef.current = "";
  }, [stopTyping]);

  const waitForCompletion = useCallback(
    (callback: () => void) => {
      const checkInterval = setInterval(() => {
        if (typingQueueRef.current.length === 0) {
          clearInterval(checkInterval);
          stopTyping();
          callback();
        }
      }, TYPING_FINISH_CHECK_INTERVAL);

      return () => clearInterval(checkInterval);
    },
    [stopTyping]
  );

  useEffect(() => {
    return () => {
      stopTyping();
    };
  }, [stopTyping]);

  return {
    displayedText,
    startTyping,
    stopTyping,
    addToQueue,
    reset,
    waitForCompletion,
    isQueueEmpty: () => typingQueueRef.current.length === 0,
  };
};
