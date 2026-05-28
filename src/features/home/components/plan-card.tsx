import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";

export interface PlanCardData {
  name: string;
  price: string;
  period: string;
  subtitle: string;
  features: string[];
  highlighted?: boolean;
}

interface PlanCardProps {
  plan: PlanCardData;
  index: number;
}

export default function PlanCard({ plan, index }: PlanCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={cn(
        "relative rounded-xl border border-custom-primary/85  p-6",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-xl ",
          plan.highlighted && "bg-[radial-gradient(circle_at_bottom,rgba(0,255,224,0.26),transparent_62%)]"
        )}
      />

      <div className="relative flex flex-col gap-6">
        <div className="mx-auto -mt-14 size-18 rounded-full border border-custom-primary/85 bg-dark-blue shadow-lg shadow-custom-primary/20 p-3">
          <Image
            src="/images/logo-green.png"
            alt="Plan logo"
            width={40}
            height={40}
            className="size-full object-contain"
          />
        </div>

        <div className="space-y-6 text-center">
          <span className="inline-flex rounded-full border border-custom-primary/80 px-4 py-1 text-sm font-semibold text-white">
            {plan.name}
          </span>
          <div className="flex items-start justify-center">
            <span className="text-5xl font-bold text-custom-primary">{plan.price}</span>
            <span className="mt-2 text-xs font-medium uppercase ">
              /{plan.period}
            </span>
          </div>
          <p className="text-sm ">{plan.subtitle}</p>
        </div>

        <div className="h-px w-full bg-custom-primary/20" />

        <ul className="space-y-4">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-lg text-gray-200">
              <CheckCircle2 className="size-5 shrink-0 text-custom-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button className="custom-btn mx-auto mt-2 h-11 min-w-40 rounded-full border-none px-8 font-bold text-dark-blue">
          Read More
        </Button>
      </div>
    </motion.article>
  );
}
