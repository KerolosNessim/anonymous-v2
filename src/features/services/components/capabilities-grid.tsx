import * as motion from "motion/react-client";
import SectionHeader from "@/features/shared/components/section-header";
import type { ServiceCapability } from "../types";

export default function CapabilitiesGrid({ capabilities }: { capabilities: ServiceCapability[] }) {
  return (
    <section className="container space-y-12 py-12 md:py-20">
      <SectionHeader
        label="What you get"
        title="Built to be used, not just admired"
        description="The details that matter when you are triaging a real file."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map(({ title, description, Icon }, index) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
            className="relative overflow-hidden rounded-xl border border-custom-primary/70 p-6 transition-[border-color,box-shadow] duration-300 hover:border-custom-primary hover:shadow-lg hover:shadow-custom-primary/20"
          >
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-transparent via-transparent to-custom-primary/10" />
            <div className="relative space-y-4">
              <Icon className="size-10 text-custom-primary" />
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-300 md:text-base md:leading-7">
                {description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
