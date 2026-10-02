import * as motion from "motion/react-client";
import SectionHeader from "@/features/shared/components/section-header";
import type { ServiceStep } from "../types";

export default function ProcessSteps({ steps }: { steps: ServiceStep[] }) {
  return (
    <section className="container space-y-12 py-12 md:py-20">
      <SectionHeader
        label="How it works"
        title="From upload to answer in four steps"
        description="Each step runs automatically. You only provide the file."
      />

      <ol className="mx-auto max-w-3xl">
        {steps.map((step, index) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="relative flex gap-5 pb-10 last:pb-0 md:gap-8"
          >
            {index < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute left-5.5 top-12 bottom-0 w-px bg-linear-to-b from-custom-primary/70 to-custom-primary/10 md:left-6.5"
              />
            )}
            <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-custom-primary bg-dark-blue font-bold text-custom-primary md:size-13">
              {index + 1}
            </span>
            <div className="space-y-2 pt-1.5">
              <h3 className="text-lg font-bold text-white md:text-xl">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-300 md:text-base md:leading-loose">
                {step.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
