"use client";

import Link from "next/link";
import { ArrowRightIcon, FileTextIcon, MailIcon, MessagesSquareIcon, ShieldCheckIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { contactLinks } from "@/features/shared/constants/contact";
import { useSupportChat } from "../hooks/use-support-chat";
import ChatPanel from "./chat-panel";

const email = contactLinks.find((link) => link.title === "Email Address");

const helpfulLinks = [
  { label: "Compare plans and pricing", href: "/#plans", Icon: FileTextIcon },
  { label: "Terms & Conditions", href: "/terms", Icon: FileTextIcon },
  { label: "Privacy Policy", href: "/privacy", Icon: ShieldCheckIcon },
];

/** The support chat as a full page, for the dashboard. It uses the same chat panel as the floating widget. */
export default function SupportChatPage() {
  const chat = useSupportChat();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold md:text-3xl">Support</h1>
        <p className="text-sm text-muted-foreground md:text-base">Ask a question and get an answer right away, or reach the team.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <section
          aria-label="Support chat"
          className="h-[min(40rem,calc(100dvh-14rem))] min-h-96 overflow-hidden rounded-2xl border border-primary/60 bg-popover shadow-lg shadow-primary/10"
        >
          <ChatPanel {...chat} />
        </section>

        <aside className="space-y-6">
          <Card className="border border-border ring-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessagesSquareIcon aria-hidden className="size-5 text-primary" />
                Talk to the team
              </CardTitle>
              <CardDescription>The assistant covers common questions. For anything about your account or billing, write to us.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {email && (
                <a href={email.href} className="flex items-center gap-2 text-sm font-bold break-all transition-colors hover:text-primary">
                  <MailIcon aria-hidden className="size-4 shrink-0 text-primary" />
                  {email.label}
                </a>
              )}
              <Link
                href="/contact"
                className="custom-btn inline-flex rounded-full px-6 py-2.5 text-sm font-bold text-dark-blue"
              >
                Open the contact form
              </Link>
            </CardContent>
          </Card>

          <Card className="border border-border ring-0">
            <CardHeader>
              <CardTitle>Helpful pages</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border">
                {helpfulLinks.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <Link href={href} className="group flex items-center gap-3 py-2.5 text-sm transition-colors hover:text-primary">
                      <Icon aria-hidden className="size-4 shrink-0 text-primary" />
                      <span className="flex-1">{label}</span>
                      <ArrowRightIcon aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
