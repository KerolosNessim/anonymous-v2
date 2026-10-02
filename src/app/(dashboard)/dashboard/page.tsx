import AnalysesDashboard from "@/features/dashboard/components/analyses-dashboard";
import { listAnalyses } from "@/features/dashboard/services/analyses";

export default async function DashboardPage() {
  const analyses = await listAnalyses();
  return <AnalysesDashboard initial={analyses} />;
}
