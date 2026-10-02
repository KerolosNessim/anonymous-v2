import SubscriptionOverview from "@/features/dashboard/components/subscription-overview";
import { getSubscription, listInvoices } from "@/features/dashboard/services/account";

export default async function SubscriptionPage() {
  const [subscription, invoices] = await Promise.all([getSubscription(), listInvoices()]);
  return <SubscriptionOverview initial={subscription} invoices={invoices} />;
}
