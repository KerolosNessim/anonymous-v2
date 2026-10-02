"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { toast } from "sonner";
import { CalendarClockIcon, CheckCircle2Icon, CreditCardIcon, DownloadIcon, RotateCcwIcon, SparklesIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { individualPlans, teamPlans } from "@/features/shared/constants/plans";
import { downloadJson } from "@/features/shared/utils/download";
import { cn } from "@/lib/utils";
import { cancelSubscription, changeBillingCycle, resumeSubscription } from "../services/account";
import type { BillingCycle, Invoice, Subscription, UsageMeter } from "../types";

const YEARLY_MONTHS_CHARGED = 10;

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

const invoiceStyle: Record<Invoice["status"], string> = {
  paid: "border-emerald-400/50 bg-emerald-400/10 text-emerald-300",
  pending: "border-amber-300/50 bg-amber-300/10 text-amber-200",
  failed: "border-red-400/50 bg-red-400/10 text-red-300",
};

function UsageRow({ meter }: { meter: UsageMeter }) {
  const percent = Math.min(100, Math.round((meter.used / meter.limit) * 100));
  const high = percent >= 80;
  return (
    <li className="space-y-2">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-muted-foreground">{meter.label}</span>
        <span className="font-mono">
          <span className={cn("font-bold", high ? "text-amber-300" : "text-foreground")}>{meter.used.toLocaleString("en-US")}</span>
          <span className="text-muted-foreground"> / {meter.limit.toLocaleString("en-US")}</span>
        </span>
      </div>
      <Progress
        value={percent}
        aria-label={`${meter.label}: ${percent} percent used`}
        className={cn("h-2 bg-white/10", high && "[&>[data-slot=progress-indicator]]:bg-amber-300")}
      />
    </li>
  );
}

export default function SubscriptionOverview({ initial, invoices }: { initial: Subscription; invoices: Invoice[] }) {
  const [subscription, setSubscription] = useState(initial);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [busy, setBusy] = useState(false);

  const plan = [...individualPlans, ...teamPlans].find((item) => item.slug === subscription.planSlug);
  const monthly = Number(plan?.price.replace(/[^0-9.]/g, "") ?? 0);
  const yearly = monthly * YEARLY_MONTHS_CHARGED;
  const price = subscription.cycle === "yearly" ? yearly : monthly;
  const canceling = subscription.status === "canceling";

  async function run(action: () => Promise<void>, onDone: () => void, success: string) {
    setBusy(true);
    try {
      await action();
      onDone();
      toast.success(success);
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  const switchCycle = () => {
    const next: BillingCycle = subscription.cycle === "monthly" ? "yearly" : "monthly";
    return run(
      () => changeBillingCycle(next),
      () => setSubscription((current) => ({ ...current, cycle: next })),
      next === "yearly" ? "Switched to yearly billing. You save about 17%." : "Switched to monthly billing."
    );
  };

  const cancel = () =>
    run(
      cancelSubscription,
      () => setSubscription((current) => ({ ...current, status: "canceling" })),
      `Your plan will end on ${longDate(subscription.renewsAt)}.`
    );

  const resume = () =>
    run(
      resumeSubscription,
      () => setSubscription((current) => ({ ...current, status: "active" })),
      "Your subscription will keep renewing."
    );

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold md:text-3xl">Subscription</h1>
        <p className="text-sm text-muted-foreground md:text-base">Your plan, what you have used, and your billing history.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="relative h-full overflow-hidden border border-primary/60 ring-0">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,224,0.16),transparent_55%)]" />
            <CardHeader className="relative">
              <CardDescription className="flex items-center gap-2 font-bold text-primary">
                <SparklesIcon aria-hidden className="size-4" />
                Current plan
              </CardDescription>
              <CardTitle className="text-3xl font-bold">{plan?.name ?? "Plan"}</CardTitle>
              <CardAction>
                <Badge
                  variant="outline"
                  className={cn(
                    "h-auto rounded-full px-3 py-1 text-xs font-bold",
                    canceling ? "border-amber-300/50 bg-amber-300/10 text-amber-200" : "border-emerald-400/50 bg-emerald-400/10 text-emerald-300"
                  )}
                >
                  {canceling ? "Ending soon" : "Active"}
                </Badge>
              </CardAction>
            </CardHeader>

            <CardContent className="relative space-y-6">
              <p className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">{money.format(price)}</span>
                <span className="text-sm text-muted-foreground">/ {subscription.cycle === "yearly" ? "year" : "month"}</span>
              </p>

              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div className="space-y-0.5">
                  <dt className="text-muted-foreground">Billing</dt>
                  <dd className="font-bold capitalize">{subscription.cycle}</dd>
                </div>
                <div className="space-y-0.5">
                  <dt className="text-muted-foreground">Member since</dt>
                  <dd className="font-bold">{longDate(subscription.startedAt)}</dd>
                </div>
                <div className="space-y-0.5 sm:col-span-2">
                  <dt className="flex items-center gap-1.5 text-muted-foreground">
                    <CalendarClockIcon aria-hidden className="size-4" />
                    {canceling ? "Access ends on" : "Next renewal"}
                  </dt>
                  <dd className={cn("font-bold", canceling && "text-amber-300")}>{longDate(subscription.renewsAt)}</dd>
                </div>
              </dl>

              {canceling && (
                <p role="status" className="rounded-lg border border-amber-300/30 bg-amber-300/5 px-3 py-2 text-sm leading-relaxed text-amber-200">
                  You will keep full access until this date. After that your account moves to the free tier. You can resume at any time before then.
                </p>
              )}
            </CardContent>

            <CardFooter className="relative flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild className="custom-btn h-11 rounded-full border-none px-6 font-bold text-dark-blue">
                <Link href={`/plans/${subscription.planSlug}`}>Change plan</Link>
              </Button>
              {canceling ? (
                <Button type="button" disabled={busy} onClick={resume} variant="outline" className="h-11 rounded-full border-2 border-primary bg-transparent px-6 font-bold text-primary hover:bg-primary! hover:text-primary-foreground">
                  <RotateCcwIcon data-icon="inline-start" />
                  Resume subscription
                </Button>
              ) : (
                <>
                  <Button type="button" disabled={busy} onClick={switchCycle} variant="outline" className="h-11 rounded-full border-2 border-primary bg-transparent px-6 font-bold text-primary hover:bg-primary! hover:text-primary-foreground">
                    {subscription.cycle === "monthly" ? "Switch to yearly and save 17%" : "Switch to monthly"}
                  </Button>
                  <Button type="button" disabled={busy} onClick={() => setConfirmCancel(true)} variant="ghost" className="h-11 rounded-full px-6 font-bold text-muted-foreground hover:text-destructive">
                    Cancel subscription
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <Card className="border border-border ring-0">
              <CardHeader>
                <CardTitle>Usage this period</CardTitle>
                <CardDescription>Resets on {longDate(subscription.renewsAt)}.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-5">
                  {subscription.usage.map((meter) => (
                    <UsageRow key={meter.label} meter={meter} />
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
            <Card className="border border-border ring-0">
              <CardHeader>
                <CardTitle>Payment method</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border text-primary">
                  <CreditCardIcon aria-hidden className="size-5" />
                </span>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="font-bold">
                    {subscription.paymentMethod.brand} ending in {subscription.paymentMethod.last4}
                  </p>
                  <p className="text-muted-foreground">Expires {subscription.paymentMethod.expires}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => toast.info("Payment details are updated on a secure page, which is not connected yet.")}
                  className="rounded-full border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Update payment method
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
        <Card className="border border-border ring-0">
          <CardHeader>
            <CardTitle>Billing history</CardTitle>
            <CardDescription>Your last {invoices.length} invoices.</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-4">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Date</TableHead>
                  <TableHead className="hidden sm:table-cell">Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">
                    <span className="sr-only">Invoice</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium whitespace-nowrap">{shortDate(invoice.date)}</TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {invoice.description}
                      <span className="block font-mono text-xs">{invoice.id}</span>
                    </TableCell>
                    <TableCell className="text-right font-mono">{money.format(invoice.amount)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("h-auto rounded-full px-2.5 py-0.5 text-xs font-bold capitalize", invoiceStyle[invoice.status])}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Download invoice ${invoice.id}`}
                        onClick={() => downloadJson(`${invoice.id}.json`, invoice)}
                      >
                        <DownloadIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <AlertDialog open={confirmCancel} onOpenChange={setConfirmCancel}>
        <AlertDialogContent className="border border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel your subscription?</AlertDialogTitle>
            <AlertDialogDescription>
              You keep full access until {longDate(subscription.renewsAt)}. After that, your account moves to the free tier and you are not charged again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep my plan</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={() => void cancel()}>
              Cancel subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <CheckCircle2Icon aria-hidden className="size-3.5" />
        Billing details are mock data until payments are connected.
      </p>
    </div>
  );
}
