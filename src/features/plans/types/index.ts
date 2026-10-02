import { z } from "zod";
import type { PlanCardData } from "@/features/shared/types";

export type BillingCycle = "monthly" | "yearly";
export type PlanAudience = "Individual" | "Team";

export interface PlanLimit {
  label: string;
  value: string;
}

export interface PlanDetail {
  slug: string;
  audience: PlanAudience;
  tagline: string;
  overview: string;
  /** The first three limits are shown as highlights in the hero */
  limits: PlanLimit[];
}

export interface PlanFaq {
  question: string;
  answer: string;
}

export type PlanWithDetail = PlanCardData & PlanDetail;

export const subscribeSchema = z.object({
  email: z.email("Enter a valid email address."),
  cycle: z.enum(["monthly", "yearly"]),
  terms: z.boolean().refine((value) => value, "Accept the terms to subscribe."),
});

export type SubscribeValues = z.infer<typeof subscribeSchema>;

export type SubscribeResult = { ok: true } | { ok: false; message: string };
