import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export interface BreadcrumbEntry {
  label: string;
  href?: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface ContactLink {
  title: string;
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
}

export interface SocialLink {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
  className: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  image: string;
  index: string;
}

export interface BlogCardData {
  slug: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface PlanCardData {
  slug: string;
  name: string;
  price: string;
  period: string;
  subtitle: string;
  features: string[];
  highlighted?: boolean;
}
