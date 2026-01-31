import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useAuth } from "./AuthContext";

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
}

interface ChatContextValue {
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

// Seed a few welcome messages so the hub doesn't feel empty
const SEED_MESSAGES: ChatMessage[] = [
  { id: "m0", userId: "system", userName: "Connect", text: "Welcome to the Discussion Hub. Say hi and network with other members!", timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: "m1", userId: "u1", userName: "Alex Chen", text: "Anyone going to the React workshop this weekend?", timestamp: new Date(Date.now() - 1800000).toISOString() },
  { id: "m2", userId: "u2", userName: "Sam Rivera", text: "Yes! Signed up yesterday. Looking forward to it.", timestamp: new Date(Date.now() - 900000).toISOString() },
];

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(SEED_MESSAGES);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || !user) return;
      const newMsg: ChatMessage = {
        id: "msg-" + Date.now(),
        userId: user.id,
        userName: user.name,
        text: trimmed,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMsg]);
    },
    [user]
  );

  const value: ChatContextValue = { messages, sendMessage };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
