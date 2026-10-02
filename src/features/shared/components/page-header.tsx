import { Fragment } from "react";
import Link from "next/link";
import * as motion from "motion/react-client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import type { BreadcrumbEntry } from "../types";

interface PageHeaderProps {
  /** Trail after "Home". The last entry is the current page and is not a link. */
  breadcrumbs: BreadcrumbEntry[];
  /** Omit title (and description) for a compact, breadcrumbs-only header, e.g. on detail pages that have their own h1. */
  title?: string;
  description?: string;
}

function Crumbs({ breadcrumbs, className }: { breadcrumbs: BreadcrumbEntry[]; className?: string }) {
  const trail: BreadcrumbEntry[] = [{ label: "Home", href: "/" }, ...breadcrumbs];

  return (
    <Breadcrumb
      className={cn(
        "inline-flex max-w-full rounded-full border border-custom-primary/40 bg-white/5 px-4 py-1.5 backdrop-blur-sm",
        className
      )}
    >
      <BreadcrumbList className="flex-nowrap gap-2 text-sm text-gray-400">
        {trail.map((entry, index) => {
          const last = index === trail.length - 1;
          return (
            <Fragment key={`${entry.label}-${index}`}>
            <BreadcrumbItem className="min-w-0">
              {last || !entry.href ? (
                <BreadcrumbPage
                  title={entry.label}
                  className="block max-w-48 truncate font-bold text-custom-primary sm:max-w-sm"
                >
                  {entry.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild className="hover:text-custom-primary">
                  <Link href={entry.href}>{entry.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!last && <BreadcrumbSeparator className="text-custom-primary/60 [&>svg]:size-3.5" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function PageHeader({ breadcrumbs, title, description }: PageHeaderProps) {
  if (!title) {
    return (
      <header className="container pt-28 lg:pt-36">
        <Crumbs breadcrumbs={breadcrumbs} />
      </header>
    );
  }

  return (
    <header className="relative overflow-hidden border-b border-custom-primary/15 pt-28 pb-12 lg:pt-36 lg:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_top,rgba(0,255,224,0.14),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-custom-primary/60 to-transparent"
      />

      <div className="container relative flex flex-col items-center gap-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-full"
        >
          <Crumbs breadcrumbs={breadcrumbs} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base sm:leading-loose"
          >
            {description}
          </motion.p>
        )}
      </div>
    </header>
  );
}
