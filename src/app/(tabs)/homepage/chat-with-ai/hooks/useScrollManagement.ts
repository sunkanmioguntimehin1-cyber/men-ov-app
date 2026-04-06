import { useRef, useCallback, useState } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { SCROLL_BOTTOM_PADDING_PX } from "../types/chat";

interface UseScrollManagementProps {
  messagesLength: number;
}

interface UseScrollManagementReturn {
  scrollViewRef: React.RefObject<ScrollView | null>;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollToBottom: (animated?: boolean) => void;
  isNearBottom: boolean;
  showScrollButton: boolean;
}

export const useScrollManagement = ({
  messagesLength,
}: UseScrollManagementProps): UseScrollManagementReturn => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = useCallback((animated: boolean = false) => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated });
        setIsNearBottom(true);
        setShowScrollButton(false);
      }, 100);
    });
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
      const isAtBottom =
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - SCROLL_BOTTOM_PADDING_PX;

      setIsNearBottom(isAtBottom);
      setShowScrollButton(!isAtBottom && messagesLength > 0);
    },
    [messagesLength]
  );

  return {
    scrollViewRef,
    handleScroll,
    scrollToBottom,
    isNearBottom,
    showScrollButton,
  };
};
