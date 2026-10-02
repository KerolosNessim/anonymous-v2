import Link from "next/link";
import * as motion from "motion/react-client";
import SectionHeader from "@/features/shared/components/section-header";
import { contactLinks } from "@/features/shared/constants/contact";

const order = ["Phone Number", "Email Address", "Website"];

const cards = order.flatMap((title) => contactLinks.filter((link) => link.title === title));

export default function ContactInfoSection() {
  return (
    <section className="container space-y-12 py-12 md:py-20">
      <SectionHeader
        label="CONTACT US"
        title="Get In Touch"
        description="Have questions, feedback, or a partnership inquiry? We would love to hear from you."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map(({ title, label, href, Icon }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
          >
            <Link
              href={href}
              className="group flex h-full flex-col items-center gap-4 rounded-xl border border-custom-primary/80 px-4 py-8 text-center transition-[border-color,box-shadow] duration-300 hover:border-custom-primary hover:shadow-lg hover:shadow-custom-primary/20"
            >
              <span className="flex size-16 items-center justify-center rounded-full border border-custom-primary/80 text-custom-primary transition-colors duration-300 group-hover:bg-custom-primary/10">
                <Icon className="size-8" />
              </span>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="max-w-full break-all text-sm text-gray-300">{label}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
