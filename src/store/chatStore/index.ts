import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Message {
  id: string;
  text: string;
  isAi: boolean;
  timestamp: string;
  date: string;
  fullDate: Date;
}

interface ChatStore {
  messages: Message[];
  hydrated?: boolean;            
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  updateLastMessage: (text: string) => void;
  removeTypingIndicator: () => void;
}

const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
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
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        messages: state.messages.map(msg => ({
          ...msg,
          fullDate: msg.fullDate instanceof Date ? msg.fullDate.toISOString() : msg.fullDate,
        })) as any,
      }),
    }
  )
);

export default useChatStore;
