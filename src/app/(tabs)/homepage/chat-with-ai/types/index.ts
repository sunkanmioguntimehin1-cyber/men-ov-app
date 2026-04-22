import {
  CyclePayload,
  SymptomPayload,
  WidgetName,
} from "@/src/widgets/messageParser";
export { CyclePayload, SymptomPayload } from "@/src/widgets/messageParser";

export interface Message {
  id: string;
  text: string;
  isAi: boolean;
  timestamp: string;
  date: string;
  fullDate: Date;
  widget?: WidgetName;
  widgetPayload?: string;
  selectedAction?: string;
  selectedDate?: string;
  selectedCycle?: string;
  selectedSymptom?: string;
  initialDate?: string;
  initialCycle?: CyclePayload;
  initialSymptom?: SymptomPayload;
}

export interface ChatMessageDetail {
  messages: {
    role: "user" | "assistant";
    content: string;
  }[];
}

export const STREAMING_BASE_URL = process.env.EXPO_PUBLIC_STREAMING_BASE_URL;
export const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
