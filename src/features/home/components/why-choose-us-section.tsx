import SectionHeader from "@/features/shared/components/section-header";
import Link from "next/link";
import * as motion from "motion/react-client";
import { Brain, Globe, Radar, Workflow } from "lucide-react";

const whyChooseUsCards = [
  {
    title: "Predictive Accuracy",
    description:
      "Trained on real-world data, our AI sees threats for what they are - not what they've done with 99% accuracy.",
    Icon: Radar,
  },
  {
    title: "Deep Insights",
    description:
      "We don't just flag threats - we profile them. Classifying malware families and mapping TTPs for deeper, actionable insight.",
    Icon: Brain,
  },
  {
    title: "Efficiency and Automation",
    description:
      "Anonymous handles the grunt work of malware analysis - so analysts can focus on what truly matters.",
    Icon: Workflow,
  },
  {
    title: "Accessibility",
    description:
      "Strong security, simple design. Our intuitive interface brings advanced analysis to any team, anywhere - no expertise required.",
    Icon: Globe,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="container py-20 space-y-12">
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
        >
          <Link
            href="/about"
            className="w-fit custom-btn text-dark-blue py-3 px-8 text-base font-bold rounded-full border-none"
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
            className="rounded-xl border border-custom-primary/70 nth-[1]:bg-linear-to-br nth-[2]:bg-linear-to-bl nth-[3]:bg-linear-to-tr nth-[4]:bg-linear-to-tl from-transparent via-transparent to-custom-primary/10  p-6 md:p-7"
          >
            <div className="flex items-start gap-4 md:gap-6">
              <Icon className="size-12 shrink-0 text-custom-primary" />
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <p className="text-base text-gray-300 leading-8 max-w-[80%]">{description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
