import { CreditCardIcon, InfoIcon, LightbulbIcon, ScanSearchIcon, ShieldAlertIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NotificationType } from "../types";

const config: Record<NotificationType, { Icon: LucideIcon; tone: string }> = {
  threat: { Icon: ShieldAlertIcon, tone: "bg-red-400/15 text-red-300" },
  analysis: { Icon: ScanSearchIcon, tone: "bg-primary/15 text-primary" },
  billing: { Icon: CreditCardIcon, tone: "bg-amber-300/15 text-amber-200" },
  system: { Icon: InfoIcon, tone: "bg-sky-300/15 text-sky-200" },
  tip: { Icon: LightbulbIcon, tone: "bg-emerald-400/15 text-emerald-300" },
};

export default function NotificationIcon({ type, className }: { type: NotificationType; className?: string }) {
  const { Icon, tone } = config[type];
  return (
    <span aria-hidden className={cn("flex size-9 shrink-0 items-center justify-center rounded-full", tone, className)}>
      <Icon className="size-4.5" />
    </span>
  );
}
