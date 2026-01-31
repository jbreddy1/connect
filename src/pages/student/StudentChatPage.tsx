import { useRef, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString([], { month: "short", day: "numeric" }) + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function StudentChatPage() {
  const { user } = useAuth();
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight);
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput("");
  };

  return (
    <>
      <section className="student-hero student-hero--chat">
        <h1>Discussion Hub</h1>
        <p>Chat with other members. Network, ask questions, and share ideas.</p>
      </section>

      <div className="chat-hub">
        <div className="chat-hub__messages" ref={listRef}>
          {messages.map((msg) => {
            const isOwn = user && msg.userId === user.id;
            const isSystem = msg.userId === "system";
            return (
              <div
                key={msg.id}
                className={
                  "chat-hub__message" +
                  (isOwn ? " chat-hub__message--own" : "") +
                  (isSystem ? " chat-hub__message--system" : "")
                }
              >
                {!isSystem && <span className="chat-hub__message-name">{msg.userName}</span>}
                <span className="chat-hub__message-text">{msg.text}</span>
                <span className="chat-hub__message-time">{formatTime(msg.timestamp)}</span>
              </div>
            );
          })}
        </div>

        <form className="chat-hub__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-hub__input"
            placeholder={user ? "Type a message…" : "Log in to chat"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!user}
            maxLength={500}
          />
          <button type="submit" className="chat-hub__send" disabled={!user || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </>
  );
}
