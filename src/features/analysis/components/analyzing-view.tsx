"use client";

import { motion } from "motion/react";
import { CheckIcon, FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { analysisSteps, secondaryActionClass } from "../constants/analysis-config";
import { formatBytes } from "../utils/format";

interface AnalyzingViewProps {
  file: File;
  step: number;
  onCancel: () => void;
}

export default function AnalyzingView({ file, step, onCancel }: AnalyzingViewProps) {
  const percent = Math.round((step / analysisSteps.length) * 100);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-custom-primary/80 bg-[#061a32]/70 p-5 shadow-lg shadow-custom-primary/10 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,224,0.14),transparent_55%)]" />

      <div className="relative space-y-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="relative flex size-24 items-center justify-center overflow-hidden rounded-2xl border border-custom-primary/70 bg-dark-blue text-custom-primary">
            <FileIcon aria-hidden className="size-11" strokeWidth={1.5} />
            {/* a scan line sweeping over the file */}
            <motion.span
              aria-hidden
              animate={{ top: ["-10%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-0.5 bg-custom-primary shadow-[0_0_14px_3px_rgba(0,255,224,0.7)]"
            />
          </span>
          <div className="min-w-0 max-w-full space-y-1">
            <h2 className="text-xl font-bold text-white md:text-2xl">Analyzing your file</h2>
            <p className="truncate text-sm text-gray-400" title={file.name}>
              {file.name} · {formatBytes(file.size)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-gray-300">Progress</span>
            <span className="font-mono font-bold text-custom-primary">{percent}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Analysis progress"
            className="h-2 overflow-hidden rounded-full bg-white/10"
          >
            <motion.div
              initial={false}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full rounded-full bg-linear-to-r from-custom-primary/60 to-custom-primary"
            />
          </div>
        </div>

        <ol className="space-y-2" aria-live="polite">
          {analysisSteps.map((item, index) => {
            const done = index < step;
            const active = index === step;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: done || active ? 1 : 0.45, x: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors duration-300 md:text-base",
                  active ? "border-custom-primary/70 bg-custom-primary/10 text-white" : "border-transparent text-gray-300"
                )}
              >
                <span className="flex size-6 shrink-0 items-center justify-center">
                  {done ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="flex size-6 items-center justify-center rounded-full bg-custom-primary text-dark-blue"
                    >
                      <CheckIcon aria-hidden className="size-4" strokeWidth={3} />
                    </motion.span>
                  ) : active ? (
                    <Spinner className="size-5 text-custom-primary" />
                  ) : (
                    <span aria-hidden className="size-2.5 rounded-full border border-gray-500" />
                  )}
                </span>
                <span>{item.label}</span>
                <span className="sr-only">{done ? "(done)" : active ? "(in progress)" : "(waiting)"}</span>
              </motion.li>
            );
          })}
        </ol>

        <div className="flex justify-center">
          <Button type="button" variant="outline" onClick={onCancel} className={`${secondaryActionClass} sm:w-auto`}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
