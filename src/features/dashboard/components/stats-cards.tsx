"use client";

import { motion } from "motion/react";
import { ClockIcon, FilesIcon, ShieldAlertIcon, ShieldCheckIcon } from "lucide-react";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRelative } from "@/features/shared/utils/format";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  stats: { total: number; malicious: number; benign: number; latest: string | null };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const items = [
    { label: "Total analyses", value: String(stats.total), Icon: FilesIcon, tone: "text-primary" },
    { label: "Malicious found", value: String(stats.malicious), Icon: ShieldAlertIcon, tone: "text-red-400" },
    { label: "Benign files", value: String(stats.benign), Icon: ShieldCheckIcon, tone: "text-emerald-400" },
    { label: "Last analysis", value: stats.latest ? formatRelative(stats.latest) : "None yet", Icon: ClockIcon, tone: "text-primary", text: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {items.map(({ label, value, Icon, tone, text }, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
        >
          <Card className="h-full gap-1 border border-border py-4 ring-0 transition-colors duration-300 hover:border-primary/70">
            <CardHeader className="gap-1 px-4">
              <CardDescription className="text-xs sm:text-sm">{label}</CardDescription>
              <CardTitle suppressHydrationWarning className={cn("font-bold", text ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl")}>
                {value}
              </CardTitle>
              <CardAction>
                <Icon aria-hidden className={cn("size-5 sm:size-6", tone)} />
              </CardAction>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
