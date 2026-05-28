import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import * as motion from "motion/react-client";

const bannerPoints = [
  "99% accurate AI-driven detection.",
  "MITRE ATT&CK threat mapping.",
  "Fully automated static analysis.",
];

export default function Banner() {
  return (
    <section className="container py-20 lg:py-28">
      <article className="relative rounded-2xl border border-custom-primary/85 px-5 py-6 lg:px-8 lg:py-7">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-transparent via-transparent to-custom-primary/20" />
        <div className="relative">
          <div className="space-y-4">
            <p className="text-xs font-bold text-custom-primary">Why Choose US ?</p>
            <h2 className="max-w-2xl text-2xl font-bold leading-relaxed text-white md:text-3xl">
              The End of an Era: Why Traditional Antivirus Can&apos;t Keep Up
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-gray-300 md:text-base md:leading-7 lg:text-lg lg:leading-8">
              Redefining malware defense through speed and intelligence. AI that
              sees beyond signatures. Thinks. Adapts. Protects..
            </p>

            <ul className="space-y-3 pt-1">
              {bannerPoints.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm text-gray-100 md:text-base ">
                  <CheckCircle2 className="size-4 shrink-0 text-custom-primary md:size-5 lg:size-6" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/analysis"
              className="custom-btn mt-1 inline-flex rounded-full px-6 py-2 text-base font-bold text-dark-blue md:px-7 md:py-2.5 md:text-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute top-[-40%] right-[-10%] hidden lg:block "
          >
            <Image
              src="/images/banner.png"
              alt="Cyber security shield"
              width={520}
              height={520}
              className="relative w-full size-150  object-contain"
              priority={false}
            />
          </motion.div>
      </article>
    </section>
  );
}
