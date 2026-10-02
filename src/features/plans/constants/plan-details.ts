import type { PlanDetail, PlanFaq } from "../types";

// Mock plan details. Replace with API data later.
export const planDetails: PlanDetail[] = [
  {
    slug: "starter",
    audience: "Individual",
    tagline: "Start scanning files with AI, without the setup.",
    overview:
      "Starter is the easiest way to see what Anonymous can do. Upload a file, get a verdict, and read a basic report. It is built for students and anyone checking the occasional suspicious file.",
    limits: [
      { label: "Scans per month", value: "50" },
      { label: "Max file size", value: "25 MB" },
      { label: "Seats", value: "1" },
      { label: "Report history", value: "30 days" },
      { label: "Report export", value: "PDF" },
      { label: "Support", value: "Community" },
      { label: "API access", value: "Not included" },
    ],
  },
  {
    slug: "pro",
    audience: "Individual",
    tagline: "Everything an independent analyst needs in one plan.",
    overview:
      "Pro adds family classification, ATT&CK mapping and full reports to every scan, with an API for your own tools. It is built for analysts who work with samples every day.",
    limits: [
      { label: "Scans per month", value: "500" },
      { label: "Max file size", value: "100 MB" },
      { label: "Seats", value: "1" },
      { label: "Report history", value: "1 year" },
      { label: "Report export", value: "PDF and JSON" },
      { label: "Support", value: "Email, 24 hour reply" },
      { label: "API access", value: "Included" },
    ],
  },
  {
    slug: "plus",
    audience: "Individual",
    tagline: "More scans and family detail for freelancers.",
    overview:
      "Plus sits between Starter and Pro. You get family classification and standard reports for client work, with room for a steady number of scans each month.",
    limits: [
      { label: "Scans per month", value: "200" },
      { label: "Max file size", value: "50 MB" },
      { label: "Seats", value: "1" },
      { label: "Report history", value: "90 days" },
      { label: "Report export", value: "PDF" },
      { label: "Support", value: "Email" },
      { label: "API access", value: "Not included" },
    ],
  },
  {
    slug: "team",
    audience: "Team",
    tagline: "Share scans and reports across a small security team.",
    overview:
      "Team gives a few analysts one workspace. Reports are shared, detections are prioritized, and everyone sees the same results without passing files around.",
    limits: [
      { label: "Scans per month", value: "1,000" },
      { label: "Max file size", value: "100 MB" },
      { label: "Seats", value: "5" },
      { label: "Report history", value: "1 year" },
      { label: "Report export", value: "PDF and JSON" },
      { label: "Support", value: "Email, 24 hour reply" },
      { label: "API access", value: "Included" },
    ],
  },
  {
    slug: "soc",
    audience: "Team",
    tagline: "Built for the volume and pace of a security operations center.",
    overview:
      "SOC is made for teams that triage all day. It handles large volumes, keeps reports for two years, and exports threat intelligence your tools can ingest.",
    limits: [
      { label: "Scans per month", value: "10,000" },
      { label: "Max file size", value: "250 MB" },
      { label: "Seats", value: "25" },
      { label: "Report history", value: "2 years" },
      { label: "Report export", value: "PDF, JSON and STIX" },
      { label: "Support", value: "Priority chat" },
      { label: "API access", value: "Included" },
    ],
  },
  {
    slug: "enterprise",
    audience: "Team",
    tagline: "Custom scale, retention and support for large organizations.",
    overview:
      "Enterprise is tailored to your environment. Limits, retention and single sign-on are set with you, and a dedicated contact is on hand when something needs attention.",
    limits: [
      { label: "Scans per month", value: "Unlimited, fair use" },
      { label: "Max file size", value: "500 MB" },
      { label: "Seats", value: "Unlimited" },
      { label: "Report history", value: "Custom" },
      { label: "Report export", value: "PDF, JSON and STIX" },
      { label: "Support", value: "Dedicated contact" },
      { label: "API access", value: "Included, with SSO" },
    ],
  },
];

export const planFaqs: PlanFaq[] = [
  {
    question: "Can I cancel at any time?",
    answer:
      "Yes. You can cancel from your account whenever you like. You keep access until the end of the period you have paid for, and your plan then stops renewing.",
  },
  {
    question: "What is the difference between monthly and yearly billing?",
    answer:
      "Monthly billing renews every month. Yearly billing is charged once a year at the price of 10 months, so you save about 17% compared with paying monthly.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. You can move up or down at any time. When you upgrade, the new limits apply right away. When you downgrade, the change starts at your next renewal.",
  },
  {
    question: "What happens if I go over my scan limit?",
    answer:
      "We will tell you before you reach it. Once the limit is used, new scans pause until your next period starts, or you can upgrade to keep scanning without waiting.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "Major credit and debit cards. Team and Enterprise plans can also be invoiced. You confirm payment on a secure page after you subscribe.",
  },
];
