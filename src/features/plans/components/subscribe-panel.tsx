"use client";

import { useState } from "react";
import Link from "next/link";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import TextField from "@/features/shared/components/text-field";
import { errorClass } from "@/features/shared/constants/form-styles";
import { cn } from "@/lib/utils";
import { subscribeToPlan } from "../services/subscribe";
import { subscribeSchema, type BillingCycle, type PlanWithDetail, type SubscribeValues } from "../types";
import { formatUsd, getPricing } from "../utils/pricing";

const cycles: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export default function SubscribePanel({ plan }: { plan: PlanWithDetail }) {
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<SubscribeValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { email: "", cycle: "monthly", terms: false },
  });

  const cycle = useWatch({ control: form.control, name: "cycle" });
  const pricing = getPricing(plan.price, cycle);
  const yearly = getPricing(plan.price, "yearly");
  const { isSubmitting } = form.formState;

  async function onSubmit(values: SubscribeValues) {
    setSubmitError(null);
    try {
      const result = await subscribeToPlan(plan.slug, values);
      if (!result.ok) {
        setSubmitError(result.message);
        return;
      }
      setDone(true);
    } catch {
      setSubmitError("We couldn't start your subscription. Check your connection and try again.");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-custom-primary/80 bg-[#061a32]/80 shadow-lg shadow-custom-primary/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,224,0.16),transparent_55%)]" />

      <div className="relative space-y-6 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-custom-primary">Subscribe to {plan.name}</h2>
          {plan.highlighted && (
            <span className="rounded-full bg-custom-primary px-3 py-1 text-xs font-bold text-dark-blue">
              Most popular
            </span>
          )}
        </div>

        {done ? (
          <div role="status" className="space-y-4 py-4 text-center">
            <CheckCircle2 aria-hidden className="mx-auto size-12 text-custom-primary" />
            <h3 className="text-xl font-bold text-white">You&apos;re on the {plan.name} plan</h3>
            <p className="text-sm leading-relaxed text-gray-300">
              We sent the next steps to <span className="font-bold text-white">{form.getValues("email")}</span>.
              You will confirm payment there before anything is charged.
            </p>
            <Link
              href="/analysis"
              className="custom-btn inline-flex rounded-full px-8 py-3 text-base font-bold text-dark-blue"
            >
              Analyze a file
            </Link>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
            <Controller
              name="cycle"
              control={form.control}
              render={({ field }) => (
                <div role="radiogroup" aria-label="Billing cycle" className="grid grid-cols-2 gap-1 rounded-full border border-custom-primary/50 p-1">
                  {cycles.map(({ value, label }) => {
                    const active = field.value === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => field.onChange(value)}
                        className={cn(
                          "flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-custom-primary",
                          active ? "custom-btn text-dark-blue" : "text-custom-primary hover:bg-custom-primary/10"
                        )}
                      >
                        {label}
                        {value === "yearly" && (
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[0.65rem] font-bold",
                              active ? "bg-dark-blue/20 text-dark-blue" : "bg-custom-primary/15 text-custom-primary"
                            )}
                          >
                            -{yearly.savingsPercent}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            />

            <div className="space-y-1" aria-live="polite">
              <p className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">{formatUsd(pricing.total)}</span>
                <span className="text-sm text-gray-400">/ {pricing.unit}</span>
              </p>
              <p className="min-h-5 text-sm text-gray-300">
                {cycle === "yearly" ? (
                  <>
                    That&apos;s {formatUsd(Math.round(pricing.perMonth * 100) / 100)} a month. You save{" "}
                    <span className="font-bold text-custom-primary">{formatUsd(pricing.savings)}</span>.
                  </>
                ) : (
                  <>Billed every month. Switch to yearly to save {yearly.savingsPercent}%.</>
                )}
              </p>
            </div>

            <dl className="divide-y divide-custom-primary/15 rounded-xl border border-custom-primary/30 text-sm">
              <div className="flex justify-between gap-4 px-4 py-2.5">
                <dt className="text-gray-400">Plan</dt>
                <dd className="font-bold text-white">{plan.name}</dd>
              </div>
              <div className="flex justify-between gap-4 px-4 py-2.5">
                <dt className="text-gray-400">Billing</dt>
                <dd className="font-bold capitalize text-white">{cycle}</dd>
              </div>
              <div className="flex justify-between gap-4 px-4 py-2.5">
                <dt className="text-gray-400">Due at confirmation</dt>
                <dd className="font-mono font-bold text-custom-primary">{formatUsd(pricing.total)}</dd>
              </div>
            </dl>

            <FieldGroup className="gap-4">
              <TextField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
              />

              <Controller
                name="terms"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="subscribe-terms"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                        onBlur={field.onBlur}
                        aria-invalid={fieldState.invalid}
                        className="mt-0.5 size-5 rounded-md border-custom-primary/70 data-[state=checked]:border-custom-primary data-[state=checked]:bg-custom-primary data-[state=checked]:text-dark-blue dark:bg-transparent"
                      />
                      <label htmlFor="subscribe-terms" className="cursor-pointer text-sm leading-relaxed text-gray-300">
                        I agree to the{" "}
                        <Link href="/terms" target="_blank" rel="noopener noreferrer" className="font-bold text-custom-primary underline-offset-4 hover:underline">
                          Terms &amp; Conditions
                        </Link>
                        .
                      </label>
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className={errorClass} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="space-y-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="custom-btn h-12 w-full rounded-full border-none text-base font-bold text-dark-blue"
              >
                {isSubmitting ? "Subscribing..." : `Subscribe to ${plan.name}`}
              </Button>
              <p className="text-center text-xs text-gray-400">
                Cancel any time. You will confirm payment on the next step.
              </p>
              <p role="alert" className="min-h-5 text-center text-sm text-red-400">
                {submitError}
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
