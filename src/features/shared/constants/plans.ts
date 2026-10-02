import type { PlanCardData } from "../types";

export const individualPlans: PlanCardData[] = [
  {
    slug: "starter",
    name: "Starter",
    price: "$19",
    period: "mo",
    subtitle: "Best For Beginner",
    features: [
      "AI-powered malware scanning",
      "Basic threat detection",
      "Limited malware reports",
      "Community support",
    ],
  },
  {
    slug: "pro",
    name: "Pro",
    price: "$79",
    period: "mo",
    subtitle: "Best For Advanced",
    highlighted: true,
    features: [
      "AI-powered malware scanning",
      "Malware family classification",
      "MITRE ATT&CK mapping",
      "Unlimited malware reports",
      "API access",
      "Email support",
    ],
  },
  {
    slug: "plus",
    name: "Plus",
    price: "$39",
    period: "mo",
    subtitle: "Best For Freelancers",
    features: [
      "AI-powered malware scanning",
      "Malware family classification",
      "Standard malware reports",
      "Email support",
    ],
  },
];

export const teamPlans: PlanCardData[] = [
  {
    slug: "team",
    name: "Team",
    price: "$49",
    period: "mo",
    subtitle: "Small Security Teams",
    features: [
      "AI-powered malware scanning",
      "Priority threat detection",
      "Shared malware reports",
      "Team collaboration",
    ],
  },
  {
    slug: "soc",
    name: "SOC",
    price: "$129",
    period: "mo",
    subtitle: "Best For SOC Teams",
    highlighted: true,
    features: [
      "AI-powered malware scanning",
      "Priority threat detection",
      "Unlimited malware reports",
      "Team collaboration",
      "Enterprise-scale monitoring",
      "Threat intelligence export",
    ],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    price: "$219",
    period: "mo",
    subtitle: "Best For Enterprises",
    features: [
      "AI-powered malware scanning",
      "Full threat intelligence suite",
      "Unlimited malware reports",
      "Dedicated support",
    ],
  },
];
