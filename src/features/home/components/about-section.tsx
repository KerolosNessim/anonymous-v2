import SectionHeader from "@/features/shared/components/section-header";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";

const features = [
  "99% accurate AI-driven detection.",
  "Fully automated static analysis.",
  "MITRE ATTACK threat mapping.",
];


export default function AboutSection() {
  return (
    <section className="container flex flex-col lg:flex-row items-center gap-10 lg:gap-16 py-20 ">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="hidden lg:flex lg:w-1/2 items-center justify-center shrink-0"
      >
        <Image
          src="/images/about.png"
          alt="about"
          width={500}
          height={500}
          className="object-contain"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-8 lg:gap-12 w-full lg:flex-1 ">
        <SectionHeader
          label="Welcome to Anonymous"
          title="The future of malware defence"
          description="Redefining malware defense through speed and intelligence. AI that sees beyond signatures. Thinks. Adapts. Protects."
          align="start"
          withAnimation={false}
        />

        <ul
          className="flex flex-col gap-4 md:gap-6"
        >
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-3 md:gap-4"
            >
              <ShieldCheck className="size-6 md:size-8 shrink-0 text-custom-primary" />
              <span className="text-base md:text-lg lg:text-xl text-gray-200">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div
        >
          <Link
            href="/analysis"
            className="w-fit custom-btn text-dark-blue py-3 px-8 text-base font-bold rounded-full border-none"
          >
            Get Started
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
