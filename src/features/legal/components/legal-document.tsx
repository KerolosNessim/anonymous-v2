import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import * as motion from "motion/react-client";
import { contactLinks } from "@/features/shared/constants/contact";
import type { LegalDocument as LegalDocumentData } from "../types";

interface LegalDocumentProps {
  document: LegalDocumentData;
  /** The sibling document, e.g. Privacy Policy when reading the Terms */
  related: { label: string; href: string };
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

const pad = (n: number) => String(n).padStart(2, "0");

const email = contactLinks.find((link) => link.title === "Email Address");

export default function LegalDocument({ document, related }: LegalDocumentProps) {
  const { sections, updated } = document;

  return (
    <div className="container grid gap-10 py-12 md:py-16 lg:grid-cols-[16rem_1fr] lg:gap-16">
      <aside className="lg:order-first">
        <nav aria-label="Contents" className="sticky top-32 space-y-3">
          <p className="text-sm font-bold text-custom-primary">Contents</p>
          {/* two columns on tablets, one column in the sidebar on large screens */}
          <ol className="grid grid-cols-1 gap-x-6 border-l border-custom-primary/30 sm:grid-cols-2 lg:grid-cols-1">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-sm text-gray-300 transition-colors hover:border-custom-primary hover:text-custom-primary"
                >
                  <span className="font-mono text-xs text-custom-primary/70">{pad(index + 1)}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <div className="min-w-0 max-w-3xl space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-custom-primary/40 px-5 py-4 text-sm">
          <p className="text-gray-300">
            Last updated <time dateTime={updated} className="font-bold text-white">{formatDate(updated)}</time>
          </p>
          <Link
            href={related.href}
            className="inline-flex items-center gap-2 font-bold text-custom-primary transition-opacity hover:opacity-80"
          >
            Also read: {related.label}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45 }}
              className="scroll-mt-28 space-y-4 border-t border-custom-primary/20 pt-8"
            >
              <h2 id={`${section.id}-title`} className="flex items-baseline gap-4 text-xl font-bold text-white md:text-2xl">
                <span className="font-mono text-base text-custom-primary">{pad(index + 1)}</span>
                {section.title}
              </h2>

              <div className="space-y-4 text-base leading-8 text-gray-300 md:pl-12">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul className="space-y-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-custom-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.closing && <p>{section.closing}</p>}
              </div>
            </motion.section>
          ))}
        </div>

        <section
          aria-labelledby="legal-contact-title"
          className="relative overflow-hidden rounded-2xl border border-custom-primary/80 p-6 md:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-transparent via-transparent to-custom-primary/15" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h2 id="legal-contact-title" className="text-xl font-bold text-custom-primary">
                Questions about this page?
              </h2>
              <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                Write to us and we will answer in plain language.
              </p>
              {email && (
                <a
                  href={email.href}
                  className="inline-flex items-center gap-2 break-all text-sm font-semibold text-white transition-colors hover:text-custom-primary"
                >
                  <Mail aria-hidden className="size-4 shrink-0 text-custom-primary" />
                  {email.label}
                </a>
              )}
            </div>
            <Link
              href="/contact"
              className="custom-btn inline-flex w-fit shrink-0 rounded-full px-8 py-3 text-base font-bold text-dark-blue"
            >
              Contact us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
