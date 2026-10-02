"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { NotificationPreferences, Profile } from "../types";

interface UserValue {
  profile: Profile;
  fullName: string;
  initials: string;
  updateProfile: (changes: Partial<Profile>) => void;
  setPreferences: (preferences: NotificationPreferences) => void;
}

const UserContext = createContext<UserValue | null>(null);

/** Holds the signed-in user's profile, so the header and the sidebar show new details as soon as they are saved. */
export function UserProvider({ initial, children }: { initial: Profile; children: React.ReactNode }) {
  const [profile, setProfile] = useState(initial);

  const updateProfile = useCallback((changes: Partial<Profile>) => setProfile((current) => ({ ...current, ...changes })), []);
  const setPreferences = useCallback((preferences: NotificationPreferences) => setProfile((current) => ({ ...current, preferences })), []);

  const value = useMemo(() => {
    const fullName = `${profile.firstName} ${profile.lastName}`.trim();
    const initials = `${profile.firstName[0] ?? ""}${profile.lastName[0] ?? ""}`.toUpperCase();
    return { profile, fullName, initials, updateProfile, setPreferences };
  }, [profile, updateProfile, setPreferences]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const value = useContext(UserContext);
  if (!value) throw new Error("useUser must be used inside UserProvider");
  return value;
}
