import type { LucideIcon } from "lucide-react";
import type { ServiceItem } from "@/features/shared/types";

export type ReportTone = "default" | "ok" | "warning" | "danger";

export interface ReportRow {
  label: string;
  value: string;
  /** 0-100, renders a bar under the row */
  percent?: number;
  tone?: ReportTone;
}

export interface ServiceReport {
  title: string;
  subject: string;
  rows: ReportRow[];
}

export interface ServiceMetric {
  value: string;
  label: string;
}

export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServiceCapability {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export interface ServiceDetail {
  slug: string;
  tagline: string;
  overview: string;
  metrics: ServiceMetric[];
  steps: ServiceStep[];
  capabilities: ServiceCapability[];
  report: ServiceReport;
}

export type ServiceWithDetail = ServiceItem & ServiceDetail;
