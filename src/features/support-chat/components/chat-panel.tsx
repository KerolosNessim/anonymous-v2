"use client";

import { InfoIcon } from "lucide-react";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Spinner } from "@/components/ui/spinner";
import { quickReplies } from "../constants/chat-config";
import type { useSupportChat } from "../hooks/use-support-chat";
import ChatComposer from "./chat-composer";
import ChatMessage from "./chat-message";

// The chat state lives in SupportChat so the conversation survives closing the panel.
export default function ChatPanel({ messages, pending, send, hasUserMessage }: ReturnType<typeof useSupportChat>) {

  return (
    <div className="flex size-full flex-col">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Avatar size="lg">
          <AvatarImage src="/images/logo-green.png" alt="" />
          <AvatarFallback>AD</AvatarFallback>
          <AvatarBadge className="bg-primary" />
        </Avatar>
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-foreground">Anonymous Support</h2>
          <p className="text-xs text-muted-foreground">Automated assistant. Replies in seconds.</p>
        </div>
      </header>

      <div className="min-h-0 flex-1">
        <MessageScrollerProvider autoScroll>
          <MessageScroller>
            <MessageScrollerViewport aria-label="Conversation" role="log" aria-live="polite">
              <MessageScrollerContent className="gap-4 p-4">
                <MessageScrollerItem messageId="intro">
                  <Marker>
                    <MarkerIcon>
                      <InfoIcon />
                    </MarkerIcon>
                    <MarkerContent>
                      This is an automated assistant. For account or billing issues, contact the team.
                    </MarkerContent>
                  </Marker>
                </MessageScrollerItem>

                {messages.map((message) => (
                  <MessageScrollerItem key={message.id} messageId={message.id} scrollAnchor={message.role === "user"}>
                    <ChatMessage message={message} />
                  </MessageScrollerItem>
                ))}

                {pending && (
                  <MessageScrollerItem messageId="typing">
                    <Message className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300 motion-reduce:animate-none">
                      <MessageAvatar>
                        <Avatar size="sm">
                          <AvatarImage src="/images/logo-green.png" alt="" />
                          <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                      </MessageAvatar>
                      <MessageContent>
                        <Bubble variant="secondary">
                          <BubbleContent className="flex items-center gap-2 text-muted-foreground">
                            <Spinner />
                            Typing
                          </BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                )}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>

      {!hasUserMessage && (
        <div className="flex flex-wrap gap-2 px-4 pb-3">
          {quickReplies.map((reply) => (
            <Button
              key={reply.label}
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => send(reply.message)}
            >
              {reply.label}
            </Button>
          ))}
        </div>
      )}

      <ChatComposer disabled={pending} onSend={send} />
    </div>
  );
}
