"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BellIcon, CheckCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatRelative } from "@/features/shared/utils/format";
import { cn } from "@/lib/utils";
import NotificationIcon from "./notification-icon";
import { useNotifications } from "./notifications-provider";

const PREVIEW_COUNT = 5;
// The height cap goes on the scroll viewport (see the ScrollArea below), otherwise the list spills over the footer.

export default function NotificationsMenu() {
  const router = useRouter();
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();
  const recent = notifications.slice(0, PREVIEW_COUNT);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"}
          className="relative size-10 rounded-full border border-border hover:border-primary data-[state=open]:border-primary [&_svg:not([class*='size-'])]:size-5"
        >
          <BellIcon />
          {unreadCount > 0 && (
            <span
              aria-hidden
              className="absolute -top-1 -right-1 flex min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[0.7rem] leading-5 font-bold text-white ring-2 ring-background"
            >
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={10} className="w-[min(24rem,calc(100vw-2rem))] rounded-xl border border-border p-0">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-bold">Notifications</p>
            <p className="text-xs text-muted-foreground">{unreadCount > 0 ? `${unreadCount} unread` : "You are all caught up"}</p>
          </div>
          <Button type="button" variant="ghost" size="sm" disabled={unreadCount === 0} onClick={markAllRead} className="text-primary">
            <CheckCheckIcon data-icon="inline-start" />
            Mark all read
          </Button>
        </div>

        {recent.length > 0 ? (
          <ScrollArea className="[&_[data-slot=scroll-area-viewport]]:max-h-80">
            <ul className="p-1.5">
              {recent.map((item) => (
                <li key={item.id}>
                  <DropdownMenuItem
                    onSelect={() => {
                      markRead(item.id);
                      if (item.href) router.push(item.href);
                    }}
                    className="items-start gap-3 rounded-lg p-2.5"
                  >
                    <NotificationIcon type={item.type} />
                    <span className="min-w-0 flex-1 space-y-0.5">
                      <span className={cn("block text-sm", item.read ? "font-medium text-foreground/80" : "font-bold text-foreground")}>
                        {item.title}
                      </span>
                      <span className="line-clamp-2 block text-xs leading-relaxed text-muted-foreground">{item.body}</span>
                      <span suppressHydrationWarning className="block text-xs text-primary/80">
                        {formatRelative(item.createdAt)}
                      </span>
                    </span>
                    {!item.read && <span aria-label="Unread" className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />}
                  </DropdownMenuItem>
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">No notifications yet.</p>
        )}

        <div className="border-t border-border p-1.5">
          <DropdownMenuItem asChild className="justify-center rounded-lg py-2 font-bold text-primary">
            <Link href="/dashboard/notifications">View all notifications</Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
