import type { BillingCycle } from "../types";

// Yearly billing is priced at 10 months, so it saves two months (about 17%).
const YEARLY_MONTHS_CHARGED = 10;

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatUsd = (amount: number) => usd.format(amount);

/** "$79" -> 79 */
export const monthlyAmount = (price: string) => Number(price.replace(/[^0-9.]/g, ""));

export function getPricing(price: string, cycle: BillingCycle) {
  const monthly = monthlyAmount(price);
  const total = cycle === "yearly" ? monthly * YEARLY_MONTHS_CHARGED : monthly;
  const savings = cycle === "yearly" ? monthly * 12 - total : 0;
  const perMonth = cycle === "yearly" ? total / 12 : monthly;

  return {
    total,
    savings,
    perMonth,
    unit: cycle === "yearly" ? "year" : "month",
    savingsPercent: Math.round(((monthly * 12 - monthly * YEARLY_MONTHS_CHARGED) / (monthly * 12)) * 100),
  };
}
