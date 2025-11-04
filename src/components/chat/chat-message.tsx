"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  avatar: ReactNode;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && message.avatar}
      <div
        className={cn(
          "max-w-lg rounded-lg p-3",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary"
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
      {isUser && message.avatar}
    </div>
  );
}
