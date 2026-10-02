import SectionHeader from "@/features/shared/components/section-header";
import PlanCard from "@/features/shared/components/plan-card";
import type { PlanWithDetail } from "../types";

export default function OtherPlans({ plans }: { plans: PlanWithDetail[] }) {
  if (plans.length === 0) return null;

  return (
    <section className="container space-y-16 py-12 md:py-20">
      <SectionHeader
        label="COMPARE"
        title="Not sure yet? See the other plans"
        description="Switch at any time. Your reports and history carry over."
      />

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-4 gap-y-16 pt-8 md:grid-cols-2">
        {plans.map((plan, index) => (
          <PlanCard key={plan.slug} plan={plan} index={index} />
        ))}
      </div>
    </section>
  );
}
