"use client";

import { motion } from "motion/react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface PillTabsProps {
  tabs: { value: string; label: string }[];
  /** The selected tab. The parent <Tabs> must be controlled with the same value. */
  value: string;
  /** Unique per tab group, so each group slides its own highlight */
  layoutId: string;
  className?: string;
}

/** Pill-shaped tabs in the app theme. A highlight slides to the selected tab, and the row scrolls if it can't fit. */
export default function PillTabs({ tabs, value, layoutId, className }: PillTabsProps) {
  return (
    <TabsList
      className={cn(
        "scrollbar-hide flex h-auto! w-full justify-start gap-1 overflow-x-auto rounded-full border-2 border-custom-primary bg-transparent p-1.5",
        className
      )}
    >
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.value}
          value={tab.value}
          className="relative z-0 h-auto! min-h-11 min-w-fit flex-1 rounded-full border-none px-3 py-2.5 text-sm font-bold text-custom-primary transition-colors duration-300 hover:text-white data-[state=active]:text-dark-blue data-[state=active]:hover:text-dark-blue sm:px-6 sm:text-base"
        >
          {tab.value === value && (
            <motion.span
              layoutId={layoutId}
              aria-hidden
              transition={{ type: "spring", stiffness: 420, damping: 36 }}
              className="absolute inset-0 -z-10 rounded-full bg-custom-primary shadow-lg shadow-custom-primary/30"
            />
          )}
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
