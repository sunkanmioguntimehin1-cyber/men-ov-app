import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
}

interface ChatStore {
  messages: Message[];
  hydrated: boolean;
  hasHydrated: () => boolean;
  setMessages: (messages: Message[]) => void;
  mergeMessages: (newMessages: Message[]) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  updateLastMessage: (text: string) => void;
  removeTypingIndicator: () => void;
  updateMessageSelectedAction: (messageId: string, action: string) => void;
  updateMessageSelectedDate: (messageId: string, date: string) => void;
  updateMessageSelectedCycle: (messageId: string, data: string) => void;
  updateMessageSelectedSymptom: (messageId: string, data: string) => void;
}

const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      hydrated: false,

      hasHydrated: () => get().hydrated,

      setMessages: (messages: Message[]) => {
        set({ messages });
      },

      mergeMessages: (newMessages: Message[]) => {
        set((state) => {
          const existingIds = new Set(state.messages.map((m) => m.id));
          const uniqueNewMessages = newMessages.filter(
            (m) => !existingIds.has(m.id)
          );
          const merged = [...state.messages, ...uniqueNewMessages];
          merged.sort((a, b) => {
            const dateA = a.fullDate instanceof Date ? a.fullDate : new Date(a.fullDate);
            const dateB = b.fullDate instanceof Date ? b.fullDate : new Date(b.fullDate);
            return dateA.getTime() - dateB.getTime();
          });
          return { messages: merged };
        });
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
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === messageId ? { ...msg, selectedDate: date } : msg
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
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        messages: state.messages.map((msg) => ({
          ...msg,
          fullDate: msg.fullDate instanceof Date ? msg.fullDate.toISOString() : msg.fullDate,
        })),
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (!error && state) {
            state.hydrated = true;
          }
        };
      },
    }
  )
);

export default useChatStore;
