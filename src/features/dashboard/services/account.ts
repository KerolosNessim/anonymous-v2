import { mockInvoices, mockNotifications, mockSubscription } from "../constants/mock-account";
import type { AppNotification, BillingCycle, Invoice, Subscription } from "../types";

// Mock data access. Replace each body with a request to the API; callers stay the same.
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function listNotifications(): Promise<AppNotification[]> {
  return mockNotifications;
}

export async function getSubscription(): Promise<Subscription> {
  return mockSubscription;
}

export async function listInvoices(): Promise<Invoice[]> {
  return mockInvoices;
}

export async function cancelSubscription(): Promise<void> {
  await wait(800);
}

export async function resumeSubscription(): Promise<void> {
  await wait(800);
}

export async function changeBillingCycle(cycle: BillingCycle): Promise<void> {
  void cycle;
  await wait(800);
}
