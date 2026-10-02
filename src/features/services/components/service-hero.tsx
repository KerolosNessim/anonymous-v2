import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import ReportPanel from "./report-panel";
import type { ServiceWithDetail } from "../types";

export default function ServiceHero({ service }: { service: ServiceWithDetail }) {
  return (
    <section className="container grid items-center gap-10 py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <Image
          src={service.image}
          alt=""
          width={80}
          height={80}
          className="size-16 md:size-20"
        />
        <div className="space-y-3">
          <p className="text-sm font-bold text-custom-primary">{service.title}</p>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {service.tagline}
          </h1>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base sm:leading-loose">
          {service.overview}
        </p>

        <dl className="grid max-w-xl grid-cols-3 gap-3">
          {service.metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col rounded-xl border border-custom-primary/40 px-3 py-3 sm:px-4"
            >
              <dt className="order-2 text-xs text-gray-400">{metric.label}</dt>
              <dd className="text-xl font-bold text-custom-primary sm:text-2xl">{metric.value}</dd>
            </div>
          ))}
        </dl>

        <Link
          href="/analysis"
          className="custom-btn inline-flex rounded-full px-8 py-3 text-base font-bold text-dark-blue"
        >
          Analyze a file
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <ReportPanel report={service.report} />
      </motion.div>
    </section>
  );
}
