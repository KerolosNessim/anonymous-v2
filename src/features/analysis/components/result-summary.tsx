"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { ShieldAlertIcon, ShieldCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AnalysisResult } from "../types";
import { formatDateTime } from "../utils/format";

const RADIUS = 64;

const styles = {
  malicious: {
    label: "Malicious",
    Icon: ShieldAlertIcon,
    text: "text-red-400",
    stroke: "stroke-red-400",
    border: "border-red-400/60",
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(248,113,113,0.18),transparent_55%)]",
  },
  benign: {
    label: "Benign",
    Icon: ShieldCheckIcon,
    text: "text-emerald-400",
    stroke: "stroke-emerald-400",
    border: "border-emerald-400/60",
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.18),transparent_55%)]",
  },
} as const;

function ConfidenceRing({ value, stroke, text }: { value: number; stroke: string; text: string }) {
  const reduced = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: reduced ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [count, value, reduced]);

  return (
    <div
      role="img"
      aria-label={`Confidence ${value} percent`}
      className="relative flex size-40 shrink-0 items-center justify-center sm:size-44"
    >
      <svg viewBox="0 0 160 160" className="absolute inset-0 size-full -rotate-90">
        <circle cx="80" cy="80" r={RADIUS} fill="none" strokeWidth="12" className="stroke-white/10" />
        <motion.circle
          cx="80"
          cy="80"
          r={RADIUS}
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          className={stroke}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: value / 100 }}
          transition={{ duration: reduced ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="relative flex items-baseline">
        <motion.span className={cn("text-4xl font-bold", text)}>{rounded}</motion.span>
        <span className={cn("text-xl font-bold", text)}>%</span>
      </div>
    </div>
  );
}

export default function ResultSummary({ result }: { result: AnalysisResult }) {
  const style = styles[result.verdict];

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "File ID", value: <span className="font-mono text-xs break-all sm:text-sm">{result.id}</span> },
    { label: "Analysis time", value: formatDateTime(result.analyzedAt) },
    {
      label: "Family",
      value: result.family ? (
        <Badge className="rounded-full bg-custom-primary px-3 text-dark-blue">{result.family}</Badge>
      ) : (
        <span className="text-amber-300">No family found</span>
      ),
    },
    { label: "Note", value: <span className="text-amber-300">{result.note}</span> },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Analysis summary"
      className={cn("relative overflow-hidden rounded-2xl border p-6 md:p-8", style.border)}
    >
      <div className={cn("pointer-events-none absolute inset-0", style.glow)} />

      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
        <ConfidenceRing value={result.confidence} stroke={style.stroke} text={style.text} />

        <div className="w-full min-w-0 flex-1 space-y-5 text-center sm:w-auto sm:space-y-4 sm:text-left">
          <h2 className={cn("flex items-center justify-center gap-3 text-3xl font-bold sm:justify-start md:text-4xl", style.text)}>
            <style.Icon aria-hidden className="size-8 md:size-9" />
            {style.label}
          </h2>

          <dl className="grid divide-y divide-white/10 rounded-xl border border-white/10 bg-dark-blue/40 px-4 text-left text-sm sm:grid-cols-[auto_1fr] sm:gap-x-8 sm:gap-y-2 sm:divide-y-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 md:text-base">
            {rows.map((row, index) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="grid gap-0.5 py-3 sm:col-span-2 sm:grid-cols-subgrid sm:items-baseline sm:gap-x-8 sm:py-0"
              >
                <dt className="text-xs font-bold tracking-wide text-custom-primary uppercase sm:text-base sm:tracking-normal sm:normal-case">{row.label}</dt>
                <dd className="min-w-0 text-gray-200">{row.value}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </motion.section>
  );
}
