"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Send, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  from: string;
  role: "user" | "admin";
  text: string;
  time: string;
}

export default function ChatPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    const saved = localStorage.getItem("kmk_chat");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {}
    } else {
      // Welcome message
      const welcome: Message = {
        id: "1",
        from: "Admin",
        role: "admin",
        text: "မင်္ဂလာပါ! Welcome to Kyaw Min Kyaw Store. How can we help you today?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([welcome]);
      localStorage.setItem("kmk_chat", JSON.stringify([welcome]));
    }
  }, [user, router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!text.trim() || !user) return;
    const msg: Message = {
      id: Date.now().toString(),
      from: user.name,
      role: isAdmin ? "admin" : "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [...messages, msg];
    setMessages(updated);
    localStorage.setItem("kmk_chat", JSON.stringify(updated));
    setText("");
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="glass-strong rounded-3xl overflow-hidden flex flex-col h-[70vh]">
        <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
            <MessageCircle size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-white">Chat with Admin</h1>
            <p className="text-xs text-white/50">
              {isAdmin ? "You are Admin — reply to customers" : "Kyaw Min Kyaw Store Support"}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === (isAdmin ? "admin" : "user") ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  m.role === (isAdmin ? "admin" : "user")
                    ? "bg-red-600 text-white rounded-br-md"
                    : "bg-white/10 text-white rounded-bl-md"
                }`}
              >
                <div className="text-xs opacity-70 mb-1">
                  {m.from} · {m.time}
                </div>
                <p className="text-sm leading-relaxed">{m.text}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex gap-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30"
            />
            <button
              onClick={send}
              className="px-5 py-3 rounded-xl bg-red-600 text-white hover:bg-red-500 transition flex items-center gap-2"
            >
              <Send size={18} />
              Send
            </button>
          </div>
          <p className="text-xs text-white/40 mt-2 text-center">
            Messages are stored locally for demo. For production, connect a real database.
          </p>
        </div>
      </div>
    </div>
  );
}
