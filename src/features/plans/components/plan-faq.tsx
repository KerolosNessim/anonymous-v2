import SectionHeader from "@/features/shared/components/section-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { PlanFaq as PlanFaqItem } from "../types";

export default function PlanFaq({ faqs }: { faqs: PlanFaqItem[] }) {
  return (
    <section className="container space-y-12 py-12 md:py-20">
      <SectionHeader
        label="BILLING QUESTIONS"
        title="Before you subscribe"
        description="Short answers about billing, changes and limits."
      />

      <Accordion type="single" collapsible className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.question}
            value={faq.question}
            className="rounded-xl border border-custom-primary/50 px-5 not-last:border-b transition-colors duration-300 data-open:border-custom-primary data-[state=open]:border-custom-primary"
          >
            <AccordionTrigger className="py-4 text-left text-base font-bold text-white hover:text-custom-primary hover:no-underline [&_svg]:text-custom-primary">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-gray-300 md:text-base md:leading-8">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
