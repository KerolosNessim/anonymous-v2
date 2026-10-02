"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { appThemeScope } from "@/features/shared/constants/theme-scope";
import { cn } from "@/lib/utils";
import type { EntropyResult } from "../types";

const overallConfig = { entropy: { label: "Entropy (bits)", color: "var(--color-custom-primary)" } } satisfies ChartConfig;
const sectionConfig = { entropy: { label: "Entropy (bits)", color: "#7dd3fc" } } satisfies ChartConfig;

export default function PlotsTab({ entropy, fileName }: { entropy: EntropyResult; fileName: string }) {
  const sections = [...entropy.sections].sort((a, b) => b.entropy - a.entropy);

  return (
    <div className={cn("space-y-8", appThemeScope)}>
      <figure className="space-y-3">
        <figcaption className="text-center text-sm text-gray-300">
          <span className="font-bold text-white">Overall file entropy</span>
          <span className="block text-xs text-gray-400">
            {fileName} · block size {entropy.blockSize} bytes
          </span>
        </figcaption>
        <ChartContainer config={overallConfig} className="aspect-auto h-64 w-full">
          <AreaChart data={entropy.blocks} margin={{ left: 0, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="entropy-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-entropy)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="var(--color-entropy)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.25} />
            <XAxis dataKey="block" tickLine={false} axisLine={false} minTickGap={32} label={{ value: "Block number", position: "insideBottom", offset: -2, fill: "#9ca3af", fontSize: 11 }} height={36} />
            <YAxis domain={[0, 8]} ticks={[0, 2, 4, 6, 8]} tickLine={false} axisLine={false} width={28} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(_, items) => `Block ${items?.[0]?.payload?.block ?? ""}`} indicator="line" />} />
            <Area
              dataKey="entropy"
              type="monotone"
              stroke="var(--color-entropy)"
              strokeWidth={1.5}
              fill="url(#entropy-fill)"
              isAnimationActive
              animationDuration={1200}
            />
          </AreaChart>
        </ChartContainer>
      </figure>

      <figure className="space-y-3">
        <figcaption className="text-center text-sm text-gray-300">
          <span className="font-bold text-white">PE section entropy</span>
        </figcaption>
        {sections.length > 0 ? (
          <ChartContainer config={sectionConfig} className="aspect-auto w-full" style={{ height: Math.max(180, sections.length * 38 + 40) }}>
            <BarChart data={sections} layout="vertical" margin={{ left: 0, right: 36 }}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" strokeOpacity={0.25} />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={64} />
              <XAxis type="number" domain={[0, 8]} ticks={[0, 2, 4, 6, 8]} tickLine={false} axisLine={false} />
              <ChartTooltip cursor={{ fill: "rgba(0,255,224,0.06)" }} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="entropy" fill="var(--color-entropy)" radius={6} isAnimationActive animationDuration={1000}>
                <LabelList dataKey="entropy" position="right" fill="#9ca3af" fontSize={11} />
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : (
          <p className="rounded-xl border border-dashed border-custom-primary/40 px-4 py-10 text-center text-sm text-gray-400">
            This file is not a Windows executable, so it has no sections to plot.
          </p>
        )}
      </figure>
    </div>
  );
}
