import type { SubscribeResult, SubscribeValues } from "../types";

// Mock subscription. Replace the body with a real request (API route or server action) that creates the
// subscription and returns a payment link; the panel only depends on the SubscribeResult shape.
export async function subscribeToPlan(planSlug: string, values: SubscribeValues): Promise<SubscribeResult> {
  void planSlug;
  void values;
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true };
}
