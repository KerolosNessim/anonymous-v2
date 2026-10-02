import * as motion from "motion/react-client";
import SubscribePanel from "./subscribe-panel";
import type { PlanWithDetail } from "../types";

export default function PlanHero({ plan }: { plan: PlanWithDetail }) {
  const highlights = plan.limits.slice(0, 3);

  return (
    <section className="container grid items-start gap-10 py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-custom-primary">
          <span>{plan.name} plan</span>
          <span aria-hidden className="text-gray-600">/</span>
          <span>{plan.audience}</span>
          <span aria-hidden className="text-gray-600">/</span>
          <span>{plan.subtitle}</span>
        </p>
        <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{plan.tagline}</h1>
        <p className="max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base sm:leading-loose">
          {plan.overview}
        </p>

        <dl className="grid max-w-xl grid-cols-3 gap-3">
          {highlights.map((limit) => (
            <div key={limit.label} className="flex flex-col rounded-xl border border-custom-primary/40 px-3 py-3 sm:px-4">
              <dt className="order-2 text-xs text-gray-400">{limit.label}</dt>
              <dd className="text-xl font-bold text-custom-primary sm:text-2xl">{limit.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="lg:sticky lg:top-32"
      >
        <SubscribePanel plan={plan} />
      </motion.div>
    </section>
  );
}
