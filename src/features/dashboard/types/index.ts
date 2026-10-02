export type Verdict = "malicious" | "benign";
export type VerdictFilter = "all" | Verdict;

export interface AnalysisRecord {
  id: string;
  fileName: string;
  /** Bytes */
  size: number;
  /** ISO date-time */
  analyzedAt: string;
  verdict: Verdict;
  /** 0-100 */
  confidence: number;
  family: string | null;
  note: string;
  sha256: string;
  kind: "file" | "archive";
}

export interface DashboardUser {
  name: string;
  email: string;
  plan: string;
}

export type NotificationType = "analysis" | "threat" | "billing" | "system" | "tip";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  /** ISO date-time */
  createdAt: string;
  read: boolean;
  href?: string;
}

export type BillingCycle = "monthly" | "yearly";
export type SubscriptionStatus = "active" | "canceling";

export interface UsageMeter {
  label: string;
  used: number;
  limit: number;
}

export interface Subscription {
  planSlug: string;
  status: SubscriptionStatus;
  cycle: BillingCycle;
  /** ISO date */
  startedAt: string;
  /** ISO date. When the status is "canceling", this is the day access ends. */
  renewsAt: string;
  paymentMethod: { brand: string; last4: string; expires: string };
  usage: UsageMeter[];
}

export interface Invoice {
  id: string;
  /** ISO date */
  date: string;
  description: string;
  /** USD */
  amount: number;
  status: "paid" | "pending" | "failed";
}

export interface NotificationPreferences {
  analysis: boolean;
  threats: boolean;
  billing: boolean;
}

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  /** International format, such as +201012345678 */
  phone: string;
  company: string;
  jobTitle: string;
  experience: string;
  plan: string;
  /** ISO date */
  memberSince: string;
  preferences: NotificationPreferences;
}
