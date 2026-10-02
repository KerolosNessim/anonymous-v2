import type { Metadata } from "next";
import AnalysisFlow from "@/features/analysis/components/analysis-flow";

export const metadata: Metadata = {
  title: "Analyze a file | Anonymous",
  description: "Upload a file and get a malware verdict, family, hashes, strings and entropy in seconds.",
};

export default function AnalysisPage() {
  return (
    <main className="overflow-hidden">
      <h1 className="sr-only">Analyze a file</h1>
      <AnalysisFlow />
    </main>
  );
}
