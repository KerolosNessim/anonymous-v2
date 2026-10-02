"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircleIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { chatThemeClass } from "../constants/chat-config";
import { useSupportChat } from "../hooks/use-support-chat";
import ChatPanel from "./chat-panel";

/** Floating support chat: a launcher button that opens the conversation in a popover above it. */
export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const chat = useSupportChat();

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setSeen(true);
      }}
    >
      {/* the launcher pops in shortly after the page loads */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1 }}
        className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6"
      >
        {/* a soft pulse invites the first click, and stops once the chat has been opened */}
        {!seen && (
          <span aria-hidden className="absolute inset-0 rounded-full bg-custom-primary/40 motion-safe:animate-ping" />
        )}
        <PopoverTrigger asChild>
          <Button
            aria-label={open ? "Close support chat" : "Open support chat"}
            className="custom-btn text-white! relative size-14 rounded-full border-none shadow-lg shadow-custom-primary/30 [&_svg:not([class*='size-'])]:size-6"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {open ? <XIcon /> : <MessageCircleIcon />}
              </motion.span>
            </AnimatePresence>
          </Button>
        </PopoverTrigger>
      </motion.div>

      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        collisionPadding={16}
        // keep focus on the message field, which is auto-focused when the panel mounts
        onOpenAutoFocus={(event) => event.preventDefault()}
        className={cn(
          "h-[min(34rem,calc(100dvh-11rem))] w-[min(24rem,calc(100vw-2rem))] gap-0 overflow-hidden rounded-2xl border border-border p-0 shadow-xl shadow-custom-primary/10 ring-0",
          // Radix sets data-state, so the open and close animation is wired here, growing out of the launcher
          "origin-bottom-right data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90 data-[state=open]:slide-in-from-bottom-6 data-[state=open]:duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-200 motion-reduce:animate-none",
          chatThemeClass
        )}
      >
        <ChatPanel {...chat} />
      </PopoverContent>
    </Popover>
  );
}
