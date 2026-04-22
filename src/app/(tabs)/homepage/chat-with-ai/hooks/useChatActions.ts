import { useCallback, useMemo } from "react";
import { ScrollView } from "react-native";
import useChatStore from "@/src/store/chatStore";
import { formatDateHeader } from "@/src/utils/formatDateHeader";
import { ChatMessageDetail, Message } from "../types";

interface UseChatActionsProps {
  scrollViewRef: React.RefObject<ScrollView>;
  messages: Message[];
  setIsNearBottom: (value: boolean) => void;
  setMessageDatail: (detail: ChatMessageDetail) => void;
}

export const useChatActions = ({
  scrollViewRef,
  messages,
  setIsNearBottom,
  setMessageDatail,
}: UseChatActionsProps) => {
  const createTimestamp = useCallback(() => {
    const fullDate = new Date();
    const timestamp = fullDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const date = formatDateHeader(fullDate);
    return { timestamp, date, fullDate };
  }, []);

  const scrollToBottom = useCallback((animated: boolean = false) => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated });
      }, 100);
    });
  }, [scrollViewRef]);

  const scrollToBottomWithDelay = useCallback(() => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
        setIsNearBottom(true);
      }
    }, 100);
  }, [scrollViewRef, setIsNearBottom]);

  const handleActionPress = useCallback(async (messageId: string, action: string) => {
    const { timestamp, date, fullDate } = createTimestamp();

    useChatStore.getState().updateMessageSelectedAction(messageId, action);

    useChatStore.getState().addMessage({
      id: `user-${Date.now()}`,
      text: action,
      isAi: false,
      timestamp,
      date,
      fullDate,
    });

    useChatStore.getState().addMessage({
      id: "typing-indicator",
      text: "...",
      isAi: true,
      timestamp,
      date,
      fullDate,
    });

    scrollToBottomWithDelay();

    const chatHistory = messages.map((msg) => ({
      role: msg.isAi ? "assistant" : "user",
      content: msg.text,
    })) as ChatMessageDetail["messages"];

    setMessageDatail({
      messages: [
        ...chatHistory,
        {
          role: "user" as const,
          content: action,
        },
      ],
    });
  }, [messages, createTimestamp, scrollToBottomWithDelay, setMessageDatail]);

  const handleDateSubmit = useCallback(async (
    messageId: string,
    payload: { date: string }
  ) => {
    const { timestamp, date, fullDate } = createTimestamp();

    useChatStore.getState().updateMessageSelectedDate(messageId, payload.date);

    useChatStore.getState().addMessage({
      id: `user-${Date.now()}`,
      text: payload.date,
      isAi: false,
      timestamp,
      date,
      fullDate,
    });

    useChatStore.getState().addMessage({
      id: "typing-indicator",
      text: "...",
      isAi: true,
      timestamp,
      date,
      fullDate,
    });

    scrollToBottomWithDelay();

    const chatHistory = messages.map((msg) => ({
      role: msg.isAi ? "assistant" : "user",
      content: msg.text,
    })) as ChatMessageDetail["messages"];

    setMessageDatail({
      messages: [
        ...chatHistory,
        {
          role: "user" as const,
          content: payload.date,
        },
      ],
    });
  }, [messages, createTimestamp, scrollToBottomWithDelay, setMessageDatail]);

  const handleCycleSubmit = useCallback(async (
    messageId: string,
    payload: { cycleData: string }
  ) => {
    const { timestamp, date, fullDate } = createTimestamp();

    useChatStore.getState().updateMessageSelectedCycle(messageId, payload.cycleData);

    useChatStore.getState().addMessage({
      id: `user-${Date.now()}`,
      text: payload.cycleData,
      isAi: false,
      timestamp,
      date,
      fullDate,
    });

    useChatStore.getState().addMessage({
      id: "typing-indicator",
      text: "...",
      isAi: true,
      timestamp,
      date,
      fullDate,
    });

    scrollToBottomWithDelay();

    const chatHistory = messages.map((msg) => ({
      role: msg.isAi ? "assistant" : "user",
      content: msg.text,
    })) as ChatMessageDetail["messages"];

    setMessageDatail({
      messages: [
        ...chatHistory,
        {
          role: "user" as const,
          content: payload.cycleData,
        },
      ],
    });
  }, [messages, createTimestamp, scrollToBottomWithDelay, setMessageDatail]);

  const handleSymptomSubmit = useCallback(async (
    messageId: string,
    payload: { symptomData: string }
  ) => {
    const { timestamp, date, fullDate } = createTimestamp();

    useChatStore.getState().updateMessageSelectedSymptom(messageId, payload.symptomData);

    useChatStore.getState().addMessage({
      id: `user-${Date.now()}`,
      text: payload.symptomData,
      isAi: false,
      timestamp,
      date,
      fullDate,
    });

    useChatStore.getState().addMessage({
      id: "typing-indicator",
      text: "...",
      isAi: true,
      timestamp,
      date,
      fullDate,
    });

    scrollToBottomWithDelay();

    const chatHistory = messages.map((msg) => ({
      role: msg.isAi ? "assistant" : "user",
      content: msg.text,
    })) as ChatMessageDetail["messages"];

    setMessageDatail({
      messages: [
        ...chatHistory,
        {
          role: "user" as const,
          content: payload.symptomData,
        },
      ],
    });
  }, [messages, createTimestamp, scrollToBottomWithDelay, setMessageDatail]);

  const handleWidgetSubmit = useCallback((
    messageId: string,
    payload: any
  ) => {
    const { timestamp, date, fullDate } = createTimestamp();

    useChatStore.getState().addMessage({
      id: `user-${Date.now()}`,
      text: JSON.stringify(payload),
      isAi: false,
      timestamp,
      date,
      fullDate,
    });

    scrollToBottomWithDelay();
  }, [createTimestamp, scrollToBottomWithDelay]);

  return {
    handleActionPress,
    handleDateSubmit,
    handleCycleSubmit,
    handleSymptomSubmit,
    handleWidgetSubmit,
  };
};