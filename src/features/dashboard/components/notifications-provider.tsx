"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { AppNotification } from "../types";

interface NotificationsValue {
  notifications: AppNotification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
}

const NotificationsContext = createContext<NotificationsValue | null>(null);

/** Holds the notifications for the whole dashboard, so the sidebar badge, the header menu and the page stay in sync. */
export function NotificationsProvider({ initial, children }: { initial: AppNotification[]; children: React.ReactNode }) {
  const [notifications, setNotifications] = useState(initial);

  const markRead = useCallback(
    (id: string) => setNotifications((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item))),
    []
  );
  const markAllRead = useCallback(() => setNotifications((current) => current.map((item) => ({ ...item, read: true }))), []);
  const remove = useCallback((id: string) => setNotifications((current) => current.filter((item) => item.id !== id)), []);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount: notifications.filter((item) => !item.read).length,
      markRead,
      markAllRead,
      remove,
    }),
    [notifications, markRead, markAllRead, remove]
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications() {
  const value = useContext(NotificationsContext);
  if (!value) throw new Error("useNotifications must be used inside NotificationsProvider");
  return value;
}
