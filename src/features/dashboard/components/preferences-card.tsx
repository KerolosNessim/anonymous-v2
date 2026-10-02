"use client";

import { useId, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { savePreferences } from "../services/profile";
import type { NotificationPreferences } from "../types";
import { useUser } from "./user-provider";

const options: { key: keyof NotificationPreferences; title: string; description: string }[] = [
  { key: "analysis", title: "Analysis results", description: "Email me when an analysis finishes." },
  { key: "threats", title: "Threat alerts", description: "Email me right away when malware is found in a file." },
  { key: "billing", title: "Billing and plan", description: "Email me about renewals, invoices and failed payments." },
];

export default function PreferencesCard() {
  const { profile, setPreferences } = useUser();
  const [pending, setPending] = useState<keyof NotificationPreferences | null>(null);
  const baseId = useId();

  // each switch saves as soon as it is flipped, and goes back if saving fails
  async function toggle(key: keyof NotificationPreferences, value: boolean) {
    const previous = profile.preferences;
    const next = { ...previous, [key]: value };
    setPreferences(next);
    setPending(key);
    try {
      await savePreferences(next);
      toast.success("Preference saved.");
    } catch {
      setPreferences(previous);
      toast.error("We could not save that preference. Try again.");
    } finally {
      setPending(null);
    }
  }

  return (
    <Card className="border border-border ring-0">
      <CardHeader>
        <CardTitle>Email notifications</CardTitle>
        <CardDescription>Choose what we send to {profile.email}. These save as soon as you change them.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-border">
          {options.map((option) => {
            const id = `${baseId}-${option.key}`;
            return (
              <li key={option.key} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <label htmlFor={id} className="min-w-0 flex-1 cursor-pointer space-y-0.5">
                  <span className="block text-sm font-bold">{option.title}</span>
                  <span className="block text-sm text-muted-foreground">{option.description}</span>
                </label>
                <Switch
                  id={id}
                  checked={profile.preferences[option.key]}
                  disabled={pending === option.key}
                  onCheckedChange={(value) => void toggle(option.key, value)}
                  className="data-[state=checked]:bg-primary"
                />
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
