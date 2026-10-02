import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Message, MessageAvatar, MessageContent, MessageFooter } from "@/components/ui/message";
import type { ChatMessage as ChatMessageData } from "../types";

const formatTime = (timestamp: number) =>
  new Date(timestamp).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

export default function ChatMessage({ message }: { message: ChatMessageData }) {
  const fromUser = message.role === "user";

  return (
    <Message align={fromUser ? "end" : "start"} className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300 motion-reduce:animate-none">
      {!fromUser && (
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarImage src="/images/logo-green.png" alt="Anonymous Support" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </MessageAvatar>
      )}
      <MessageContent>
        <Bubble variant={fromUser ? "default" : "secondary"} align={fromUser ? "end" : "start"}>
          <BubbleContent>{message.text}</BubbleContent>
        </Bubble>

        {message.link && (
          <Button asChild variant="outline" size="sm" className="w-fit">
            <Link href={message.link.href}>
              {message.link.label}
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        )}

        <MessageFooter>{formatTime(message.createdAt)}</MessageFooter>
      </MessageContent>
    </Message>
  );
}
