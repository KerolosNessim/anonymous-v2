import { individualPlans, teamPlans } from "@/features/shared/constants/plans";
import { planDetails, planFaqs } from "../constants/plan-details";
import type { PlanFaq, PlanWithDetail } from "../types";

// Mock data access. Swap the bodies for fetches when an API exists; callers stay the same.
function merge(): PlanWithDetail[] {
  return [...individualPlans, ...teamPlans].flatMap((plan) => {
    const detail = planDetails.find((d) => d.slug === plan.slug);
    return detail ? [{ ...plan, ...detail }] : [];
  });
}

export async function getPlans(): Promise<PlanWithDetail[]> {
  return merge();
}

export async function getPlanBySlug(slug: string): Promise<PlanWithDetail | undefined> {
  return merge().find((plan) => plan.slug === slug);
}

/** The other plans for the same audience, in their original order */
export async function getOtherPlans(slug: string): Promise<PlanWithDetail[]> {
  const plans = merge();
  const current = plans.find((plan) => plan.slug === slug);
  return plans.filter((plan) => plan.slug !== slug && plan.audience === current?.audience);
}

export async function getPlanFaqs(): Promise<PlanFaq[]> {
  return planFaqs;
}
