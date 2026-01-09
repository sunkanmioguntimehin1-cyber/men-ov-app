import { formatDateHeader } from "./formatDateHeader";

interface MessageTimestamp {
  fullDate: Date;
  timestamp: string;
  date: string;
}

export const createMessageTimestamp = (): MessageTimestamp => {
  const fullDate = new Date();
  return {
    fullDate,
    timestamp: fullDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    date: formatDateHeader(fullDate),
  };
};
