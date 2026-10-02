"use client";

import Link from "next/link";
import { BriefcaseIcon, BuildingIcon, CalendarIcon, MailIcon, SparklesIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "./user-provider";

const memberSince = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default function ProfileSummary() {
  const { profile, fullName, initials } = useUser();

  const details = [
    { Icon: MailIcon, value: profile.email },
    { Icon: BuildingIcon, value: profile.company },
    { Icon: BriefcaseIcon, value: profile.jobTitle },
    { Icon: CalendarIcon, value: `Member since ${memberSince(profile.memberSince)}` },
  ];

  return (
    <Card className="relative h-fit overflow-hidden border border-border ring-0">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(0,255,224,0.18),transparent_70%)]" />
      <CardContent className="relative flex flex-col items-center gap-4 pt-4 text-center">
        <Avatar className="size-24 text-3xl shadow-lg shadow-primary/20 ring-4 ring-primary/30">
          <AvatarFallback className="bg-primary text-3xl font-bold text-primary-foreground">{initials}</AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <h2 className="text-xl font-bold">{fullName}</h2>
          <Badge className="h-auto rounded-full bg-primary/15 px-3 py-1 text-primary hover:bg-primary/15">
            <SparklesIcon data-icon="inline-start" />
            {profile.plan} plan
          </Badge>
        </div>

        <ul className="w-full space-y-2.5 pt-2 text-left text-sm">
          {details.map(({ Icon, value }) => (
            <li key={value} className="flex items-center gap-3 text-muted-foreground">
              <Icon aria-hidden className="size-4 shrink-0 text-primary" />
              <span className="min-w-0 break-words">{value}</span>
            </li>
          ))}
        </ul>

        <Link href="/dashboard/subscription" className="mt-1 text-sm font-bold text-primary underline-offset-4 hover:underline">
          Manage subscription
        </Link>
      </CardContent>
    </Card>
  );
}
