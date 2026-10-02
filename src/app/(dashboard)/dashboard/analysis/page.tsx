import AnalysisFlow from "@/features/analysis/components/analysis-flow";

export default function DashboardAnalysisPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold md:text-3xl">New analysis</h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Upload a file or a compressed archive. Files are analyzed statically, so nothing is ever run.
        </p>
      </div>
      <AnalysisFlow embedded />
    </div>
  );
}
