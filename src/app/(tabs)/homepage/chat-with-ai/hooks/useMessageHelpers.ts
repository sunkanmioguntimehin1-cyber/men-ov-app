import { Message } from "../types/chat";

export const formatDateHeader = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const messageDate = new Date(date);
  messageDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);

  if (messageDate.getTime() === today.getTime()) {
    return "Today";
  } else if (messageDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    return messageDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};

export const shouldShowDateSeparator = (
  currentMsg: Message,
  prevMsg: Message | null
): boolean => {
  if (!prevMsg) return true;

  const currentDate = new Date(currentMsg.fullDate);
  const prevDate = new Date(prevMsg.fullDate);
  currentDate.setHours(0, 0, 0, 0);
  prevDate.setHours(0, 0, 0, 0);

  return currentDate.getTime() !== prevDate.getTime();
};

export const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
