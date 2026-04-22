import { create } from "zustand";

export type WidgetName =
  | "symptom_form"
  | "cycle_form"
  | "date_picker"
  | "intensity_slider"
  | "management_tabs"
  | "resource";

interface Message {
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

interface ChatStore {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  updateLastMessage: (text: string) => void;
  removeTypingIndicator: () => void;
  updateMessageSelectedAction: (messageId: string, action: string) => void;
  updateMessageSelectedDate: (messageId: string, date: string) => void;
  updateMessageSelectedCycle: (messageId: string, data: string) => void;
  updateMessageSelectedSymptom: (messageId: string, data: string) => void;
}

const useChatStore = create<ChatStore>()((set, get) => ({
  messages: [],

  setMessages: (messages: Message[]) => {
    set({ messages });
  },

  addMessage: (message: Message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  clearMessages: () => {
    set({ messages: [] });
  },

  updateLastMessage: (text: string) => {
    set((state) => {
      const messages = [...state.messages];
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.isAi) {
          lastMessage.text = text;
        }
      }
      return { messages };
    });
  },

  removeTypingIndicator: () => {
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== "typing-indicator"),
    }));
  },

  updateMessageSelectedAction: (messageId: string, action: string) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, selectedAction: action } : msg
      ),
    }));
  },

  updateMessageSelectedDate: (messageId: string, date: string) => {
    // Normalize date to ISO format (YYYY-MM-DD) to avoid timezone issues
    let normalizedDate = date;
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const parsed = new Date(date);
      if (!isNaN(parsed.getTime())) {
        const year = parsed.getFullYear();
        const month = String(parsed.getMonth() + 1).padStart(2, "0");
        const day = String(parsed.getDate()).padStart(2, "0");
        normalizedDate = `${year}-${month}-${day}`;
      }
    }
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, selectedDate: normalizedDate } : msg
      ),
    }));
  },

  updateMessageSelectedCycle: (messageId: string, data: string) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, selectedCycle: data } : msg
      ),
    }));
  },

  updateMessageSelectedSymptom: (messageId: string, data: string) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, selectedSymptom: data } : msg
      ),
    }));
  },
}));

export default useChatStore;
