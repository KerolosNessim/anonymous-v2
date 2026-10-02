import SectionHeader from "@/features/shared/components/section-header";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { services } from "@/features/shared/constants/services";

export default function ServicesSection() {

  return (
    <section className="container py-12 md:py-20 space-y-12">
      <SectionHeader
        label="Our Services"
        title="Our Advanced Security Services"
        description="A Multi-Layered Approach to Malware Analysis."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {services.map((service, i) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="relative rounded-xl border border-custom-primary/80  p-6 py-10 overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-custom-primary hover:shadow-lg hover:shadow-custom-primary/20"
          >
            <div className="pointer-events-none absolute inset-0 -top-20 rounded-xl bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.18),transparent_45%)]" />

            <div className="relative  space-y-6">
              <div className="flex items-start justify-between">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={44}
                  height={44}
                  className="size-20"
                />
                <span className="text-5xl font-bold leading-none text-white/25">
                  {service.index}
                </span>
              </div>

              <div className="space-y-8">
                <h3 className="max-w-56 text-2xl font-bold leading-relaxed text-custom-primary">
                  {service.title}
                </h3>
                <p className=" leading-loose text-gray-300">
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-base font-semibold text-custom-primary transition-opacity hover:opacity-85"
                >
                  Learn More
                  <span aria-hidden>{">>"}</span>
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
