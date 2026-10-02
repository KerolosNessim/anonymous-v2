import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";
import type { ReportTone, ServiceReport } from "../types";

const valueTone: Record<ReportTone, string> = {
  default: "text-custom-primary",
  ok: "text-emerald-400",
  warning: "text-amber-300",
  danger: "text-red-400",
};

const barTone: Record<ReportTone, string> = {
  default: "bg-custom-primary",
  ok: "bg-emerald-400",
  warning: "bg-amber-300",
  danger: "bg-red-400",
};

export default function ReportPanel({ report }: { report: ServiceReport }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-custom-primary/80 bg-[#061a32]/80 shadow-lg shadow-custom-primary/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,224,0.18),transparent_55%)]" />

      <div className="relative flex items-center justify-between gap-4 border-b border-custom-primary/30 px-5 py-4">
        <span className="text-sm font-bold text-custom-primary">{report.title}</span>
        <span className="truncate font-mono text-xs text-gray-400">{report.subject}</span>
      </div>

      <dl className="relative divide-y divide-custom-primary/15">
        {report.rows.map((row, index) => {
          const tone = row.tone ?? "default";
          return (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
              className="space-y-2 px-5 py-3.5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-gray-300">{row.label}</dt>
                <dd className={cn("text-right font-mono text-sm font-bold", valueTone[tone])}>
                  {row.value}
                </dd>
              </div>
              {row.percent !== undefined && (
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3 + index * 0.08, ease: "easeOut" }}
                    className={cn("h-full rounded-full", barTone[tone])}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </dl>

      <p className="relative border-t border-custom-primary/30 px-5 py-3 text-xs text-gray-500">
        Sample output with mock data.
      </p>
    </div>
  );
}
