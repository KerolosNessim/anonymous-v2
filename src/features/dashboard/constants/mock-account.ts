import type { AppNotification, Invoice, Subscription } from "../types";

// Mock account data. Replace with the signed-in user's data from the API.
const utc = (month: number, day: number, hour = 12, minute = 0) =>
  new Date(Date.UTC(2026, month, day, hour, minute)).toISOString();

export const mockNotifications: AppNotification[] = [
  {
    id: "n1",
    type: "threat",
    title: "Malware found in vmprox.dll",
    body: "Your analysis finished and matched the RedLine family with 78% confidence.",
    createdAt: utc(9, 2, 19, 32),
    read: false,
    href: "/dashboard",
  },
  {
    id: "n2",
    type: "analysis",
    title: "Analysis complete",
    body: "SecurityHealthSsoUdk.dll is benign. No malicious behavior was found.",
    createdAt: utc(9, 2, 19, 31),
    read: false,
    href: "/dashboard",
  },
  {
    id: "n3",
    type: "billing",
    title: "Your plan renews on November 2",
    body: "We will charge $79.00 to your Visa ending in 4242. You can change or cancel before then.",
    createdAt: utc(9, 2, 9, 0),
    read: false,
    href: "/dashboard/subscription",
  },
  {
    id: "n4",
    type: "billing",
    title: "Payment received",
    body: "Thank you. Invoice INV-2026-010 for $79.00 is paid.",
    createdAt: utc(9, 2, 8, 5),
    read: true,
    href: "/dashboard/subscription",
  },
  {
    id: "n5",
    type: "system",
    title: "Compressed file analysis is here",
    body: "You can now upload ZIP, RAR, 7z, TAR and GZ archives from the analysis page.",
    createdAt: utc(8, 29, 10, 0),
    read: true,
    href: "/dashboard/analysis",
  },
  {
    id: "n6",
    type: "tip",
    title: "Tip: check the entropy plot",
    body: "A high entropy value often means a file is packed or encrypted, which is common in malware.",
    createdAt: utc(8, 24, 14, 0),
    read: true,
  },
];

export const mockSubscription: Subscription = {
  planSlug: "pro",
  status: "active",
  cycle: "monthly",
  startedAt: utc(2, 14).slice(0, 10),
  renewsAt: utc(10, 2).slice(0, 10),
  paymentMethod: { brand: "Visa", last4: "4242", expires: "08/28" },
  usage: [
    { label: "Scans this month", used: 412, limit: 500 },
    { label: "API calls", used: 4210, limit: 10000 },
    { label: "Seats", used: 1, limit: 1 },
  ],
};

export const mockInvoices: Invoice[] = [
  { id: "INV-2026-010", date: utc(9, 2).slice(0, 10), description: "Pro plan, monthly", amount: 79, status: "paid" },
  { id: "INV-2026-009", date: utc(8, 2).slice(0, 10), description: "Pro plan, monthly", amount: 79, status: "paid" },
  { id: "INV-2026-008", date: utc(7, 2).slice(0, 10), description: "Pro plan, monthly", amount: 79, status: "paid" },
  { id: "INV-2026-007", date: utc(6, 2).slice(0, 10), description: "Pro plan, monthly", amount: 79, status: "paid" },
  { id: "INV-2026-006", date: utc(5, 2).slice(0, 10), description: "Pro plan, monthly", amount: 79, status: "failed" },
  { id: "INV-2026-005", date: utc(4, 2).slice(0, 10), description: "Pro plan, monthly", amount: 79, status: "paid" },
];
