"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRightIcon, BellOffIcon, CheckCheckIcon, CheckIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { formatDateTime, formatRelative } from "@/features/shared/utils/format";
import { cn } from "@/lib/utils";
import type { AppNotification } from "../types";
import NotificationIcon from "./notification-icon";
import { useNotifications } from "./notifications-provider";

type Filter = "all" | "unread";

function NotificationCard({ item }: { item: AppNotification }) {
  const { markRead, remove } = useNotifications();

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "flex gap-3 rounded-2xl border p-4 transition-colors duration-300 sm:gap-4 sm:p-5",
        item.read ? "border-border bg-card/50" : "border-primary/40 bg-primary/5"
      )}
    >
      <NotificationIcon type={item.type} className="size-11 rounded-xl" />

      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className={cn("flex items-center gap-2 text-sm leading-snug sm:text-base", item.read ? "font-medium text-foreground/80" : "font-bold text-foreground")}>
            {!item.read && <span aria-label="Unread" className="size-2 shrink-0 rounded-full bg-primary" />}
            <span>{item.title}</span>
          </h3>
          <time
            dateTime={item.createdAt}
            suppressHydrationWarning
            title={formatDateTime(item.createdAt)}
            className="shrink-0 pt-0.5 text-xs text-muted-foreground"
          >
            {formatRelative(item.createdAt)}
          </time>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>

        <div className="flex flex-wrap items-center gap-1 pt-1">
          {item.href && (
            <Link
              href={item.href}
              onClick={() => markRead(item.id)}
              className="mr-2 inline-flex items-center gap-1 text-sm font-bold text-primary underline-offset-4 hover:underline"
            >
              View
              <ArrowRightIcon aria-hidden className="size-4" />
            </Link>
          )}
          <div className="ml-auto flex items-center gap-1">
            {!item.read && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                title="Mark as read"
                aria-label={`Mark as read: ${item.title}`}
                onClick={() => markRead(item.id)}
                className="text-muted-foreground hover:text-primary"
              >
                <CheckIcon />
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              title="Delete"
              aria-label={`Delete notification: ${item.title}`}
              onClick={() => remove(item.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2Icon />
            </Button>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

function Section({ title, items }: { title: string; items: AppNotification[] }) {
  if (items.length === 0) return null;
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
        {title}
        <span className="font-mono text-primary">{items.length}</span>
      </h2>
      <ul className="space-y-3">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item) => (
            <NotificationCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const [filter, setFilter] = useState<Filter>("all");

  const fresh = notifications.filter((item) => !item.read);
  const earlier = filter === "all" ? notifications.filter((item) => item.read) : [];
  const empty = fresh.length === 0 && earlier.length === 0;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold md:text-3xl">Notifications</h1>
          <p className="text-sm text-muted-foreground md:text-base">
            {unreadCount > 0 ? `You have ${unreadCount} unread ${unreadCount === 1 ? "notification" : "notifications"}.` : "You are all caught up."}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={unreadCount === 0}
          onClick={markAllRead}
          className="h-11 rounded-full border-2 border-primary bg-transparent px-6 font-bold text-primary hover:bg-primary! hover:text-primary-foreground"
        >
          <CheckCheckIcon data-icon="inline-start" />
          Mark all as read
        </Button>
      </div>

      <ToggleGroup
        type="single"
        variant="outline"
        value={filter}
        onValueChange={(value) => value && setFilter(value as Filter)}
        aria-label="Filter notifications"
        className="w-full sm:w-auto"
      >
        <ToggleGroupItem value="all" className="h-11 flex-1 px-5 font-bold data-[state=on]:bg-primary data-[state=on]:text-primary-foreground sm:flex-none">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="unread" className="h-11 flex-1 px-5 font-bold data-[state=on]:bg-primary data-[state=on]:text-primary-foreground sm:flex-none">
          Unread{unreadCount > 0 ? ` (${unreadCount})` : ""}
        </ToggleGroupItem>
      </ToggleGroup>

      {!empty ? (
        <div className="space-y-8">
          <Section title="New" items={fresh} />
          <Section title="Earlier" items={earlier} />
        </div>
      ) : (
        <Empty className="rounded-2xl border border-dashed border-border py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BellOffIcon />
            </EmptyMedia>
            <EmptyTitle>{filter === "unread" ? "Nothing unread" : "No notifications"}</EmptyTitle>
            <EmptyDescription>
              {filter === "unread" ? "You have read everything. New alerts will show up here." : "Alerts about your analyses and your plan will show up here."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  );
}
