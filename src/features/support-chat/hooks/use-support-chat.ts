"use client";

import { useCallback, useState } from "react";
import { welcomeMessage } from "../constants/chat-config";
import { getSupportReply } from "../services/get-reply";
import type { ChatMessage } from "../types";

let counter = 0;
const nextId = () => `msg-${++counter}`;

export function useSupportChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: "welcome", role: "support", text: welcomeMessage, createdAt: Date.now() },
  ]);
  const [pending, setPending] = useState(false);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || pending) return;

      setMessages((current) => [...current, { id: nextId(), role: "user", text, createdAt: Date.now() }]);
      setPending(true);
      try {
        const reply = await getSupportReply(text);
        setMessages((current) => [...current, { id: nextId(), role: "support", createdAt: Date.now(), ...reply }]);
      } catch {
        setMessages((current) => [
          ...current,
          {
            id: nextId(),
            role: "support",
            createdAt: Date.now(),
            text: "Something went wrong on our side. Please try again in a moment.",
          },
        ]);
      } finally {
        setPending(false);
      }
    },
    [pending]
  );

  return { messages, pending, send, hasUserMessage: messages.some((m) => m.role === "user") };
}
