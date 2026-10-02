import SectionHeader from "@/features/shared/components/section-header";
import Link from "next/link";
import * as motion from "motion/react-client";
import { whyChooseUsCards } from "@/features/shared/constants/why-choose-us";


export default function WhyChooseUsSection() {
  return (
    <section className="container py-12 md:py-20 space-y-12">
      <div className="flex flex-col gap-8 lg:items-center justify-between lg:flex-row lg:gap-12 w-full lg:flex-1 ">
        <SectionHeader
          label="Why Choose Anonymous?"
          title="Born from Academia, Built for the Real World."
          description="Redefining malware defense through speed and intelligence. AI that sees beyond signatures. Thinks. Adapts. Protects."
          align="start"
        />

        <motion.div
        initial={{ opacity: 0, }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className=" "
        >
          <Link
            href="/about"
            className="block w-fit custom-btn text-dark-blue py-3 px-8 text-base font-bold rounded-full border-none text-nowrap"
          >
            Read More
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {whyChooseUsCards.map(({ title, description, Icon }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
            className="rounded-xl border border-custom-primary/70 nth-[1]:bg-linear-to-br nth-[2]:bg-linear-to-bl nth-[3]:bg-linear-to-tr nth-[4]:bg-linear-to-tl from-transparent via-transparent to-custom-primary/10  p-6 md:p-7 transition-[border-color,box-shadow] duration-300 hover:border-custom-primary hover:shadow-lg hover:shadow-custom-primary/20"
          >
            <div className="flex items-start gap-4 md:gap-6">
              <Icon className="size-10 md:size-12 shrink-0 text-custom-primary" />
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
                <p className="text-base text-gray-300 leading-7 md:leading-8 md:max-w-[80%]">{description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
