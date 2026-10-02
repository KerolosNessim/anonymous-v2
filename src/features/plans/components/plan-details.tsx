import { CheckCircle2 } from "lucide-react";
import * as motion from "motion/react-client";
import SectionHeader from "@/features/shared/components/section-header";
import type { PlanWithDetail } from "../types";

export default function PlanDetails({ plan }: { plan: PlanWithDetail }) {
  return (
    <section className="container space-y-12 py-12 md:py-20">
      <SectionHeader
        label="PLAN DETAILS"
        title={`What's in ${plan.name}`}
        description="The features you get, and the limits that come with them."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-xl border border-custom-primary/70 p-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-transparent via-transparent to-custom-primary/10" />
          <h3 className="relative mb-5 text-xl font-bold text-custom-primary">Included features</h3>
          <ul className="relative space-y-4">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-base text-gray-200">
                <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-custom-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="relative overflow-hidden rounded-xl border border-custom-primary/70 p-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-linear-to-bl from-transparent via-transparent to-custom-primary/10" />
          <h3 className="relative mb-2 text-xl font-bold text-custom-primary">Limits</h3>
          <dl className="relative divide-y divide-custom-primary/15">
            {plan.limits.map((limit) => (
              <div key={limit.label} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-sm text-gray-400">{limit.label}</dt>
                <dd className="text-right font-mono text-sm font-bold text-white">{limit.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
