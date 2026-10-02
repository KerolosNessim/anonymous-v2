"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { EntropyLevel, EntropyResult } from "../types";

const levelStyle: Record<EntropyLevel, string> = {
  low: "border-emerald-400/50 bg-emerald-400/10 text-emerald-300",
  moderate: "border-amber-300/50 bg-amber-300/10 text-amber-200",
  high: "border-red-400/50 bg-red-400/10 text-red-300",
};

const explanation: Record<EntropyLevel, string> = {
  low: "The bytes are fairly regular, like ordinary code and data. Nothing here suggests the file is compressed or encrypted.",
  moderate: "The bytes are mixed. Parts of the file may be compressed, such as resources or embedded data.",
  high: "The bytes look close to random. Packed, compressed or encrypted content is common in malware that hides its payload.",
};

export default function EntropyTab({ entropy }: { entropy: EntropyResult }) {
  const position = Math.min(100, (entropy.value / 8) * 100);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-custom-primary">Value</p>
          <p className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-white">{entropy.value.toFixed(2)}</span>
            <span className="text-sm text-gray-400">of 8 bits per byte</span>
          </p>
        </div>
        <div className="space-y-1 sm:text-right">
          <p className="text-sm font-bold text-custom-primary">Remark</p>
          <Badge variant="outline" className={cn("h-auto rounded-full px-3 py-1 text-sm", levelStyle[entropy.level])}>
            {entropy.remark}
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative h-3 rounded-full bg-linear-to-r from-emerald-400 via-amber-300 to-red-400">
          <motion.span
            aria-hidden
            initial={{ left: "0%" }}
            animate={{ left: `${position}%` }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dark-blue bg-white shadow-lg"
          />
        </div>
        <div className="flex justify-between font-mono text-xs text-gray-400">
          <span>0 low</span>
          <span>4</span>
          <span>8 high</span>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-gray-300 md:text-base md:leading-8">{explanation[entropy.level]}</p>
    </div>
  );
}
