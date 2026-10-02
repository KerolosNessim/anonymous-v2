import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import SectionHeader from "@/features/shared/components/section-header";
import type { ServiceWithDetail } from "../types";

export default function OtherServices({ services }: { services: ServiceWithDetail[] }) {
  if (services.length === 0) return null;

  return (
    <section className="container space-y-12 py-12 md:py-20">
      <SectionHeader
        label="More services"
        title="Explore the rest of the platform"
        description="Each service builds on the same scan."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {services.map((service, index) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
          >
            <Link
              href={`/services/${service.slug}`}
              className="group relative flex h-full gap-5 overflow-hidden rounded-xl border border-custom-primary/80 p-6 transition-[border-color,box-shadow] duration-300 hover:border-custom-primary hover:shadow-lg hover:shadow-custom-primary/20"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,255,0.14),transparent_50%)]" />
              <Image src={service.image} alt="" width={64} height={64} className="relative size-14 shrink-0 md:size-16" />
              <div className="relative space-y-2">
                <h3 className="text-lg font-bold text-custom-primary md:text-xl">{service.title}</h3>
                <p className="text-sm leading-relaxed text-gray-300">{service.tagline}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-custom-primary transition-transform duration-300 group-hover:translate-x-1">
                  View service
                  <span aria-hidden>{">>"}</span>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
