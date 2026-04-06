export interface Message {
  id: string;
  text: string;
  isAi: boolean;
  timestamp: string;
  date: string;
  fullDate: Date;
}

export interface MessageDetail {
  messages: {
    role: "user" | "assistant";
    content: string;
  }[];
}

export const STREAMING_BASE_URL = process.env.EXPO_PUBLIC_STREAMING_BASE_URL;
export const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const GRADIENT_COLORS = ["#6B5591", "#6E3F8C", "#853385", "#9F3E83"] as const;

export const MAX_BUBBLE_WIDTH_RATIO = 0.9;
export const BUBBLE_MAX_WIDTH_PX = 640;
export const SCROLL_BOTTOM_PADDING_PX = 50;
export const TYPING_CHAR_DELAY_MS = 30;
export const TYPING_CHECK_INTERVAL_MS = 50;
