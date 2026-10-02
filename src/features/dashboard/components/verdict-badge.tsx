import { ShieldAlertIcon, ShieldCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Verdict } from "../types";

export const verdictStyles = {
  malicious: {
    label: "Malicious",
    Icon: ShieldAlertIcon,
    badge: "border-red-400/50 bg-red-400/10 text-red-300",
    tint: "bg-red-400/15 text-red-300",
    bar: "bg-red-400",
    text: "text-red-400",
  },
  benign: {
    label: "Benign",
    Icon: ShieldCheckIcon,
    badge: "border-emerald-400/50 bg-emerald-400/10 text-emerald-300",
    tint: "bg-emerald-400/15 text-emerald-300",
    bar: "bg-emerald-400",
    text: "text-emerald-400",
  },
} as const;

export default function VerdictBadge({ verdict, className }: { verdict: Verdict; className?: string }) {
  const style = verdictStyles[verdict];
  return (
    <Badge variant="outline" className={cn("h-auto gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold", style.badge, className)}>
      <style.Icon />
      {style.label}
    </Badge>
  );
}
