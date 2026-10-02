"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { DownloadIcon, InfoIcon, RefreshCwIcon, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { downloadJson } from "@/features/shared/utils/download";
import { primaryActionClass, secondaryActionClass } from "../constants/analysis-config";
import type { AnalysisResult } from "../types";
import EntropyTab from "./entropy-tab";
import IdentificationTab from "./identification-tab";
import PillTabs from "./pill-tabs";
import PlotsTab from "./plots-tab";
import ResultSummary from "./result-summary";
import StringsTab from "./strings-tab";

interface ResultsViewProps {
  result: AnalysisResult;
  onReanalyze: () => void;
  onReset: () => void;
}

const tabs = [
  { value: "identification", label: "Identification" },
  { value: "strings", label: "Strings" },
  { value: "entropy", label: "Entropy" },
  { value: "plots", label: "Plots" },
] as const;

const downloadReport = (result: AnalysisResult) => downloadJson(`anonymous-report-${result.id}.json`, result);

const fade = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 } };

export default function ResultsView({ result, onReanalyze, onReset }: ResultsViewProps) {
  const [tab, setTab] = useState<string>("identification");

  return (
    <div className="space-y-6">
      <ResultSummary result={result} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
        <Tabs value={tab} onValueChange={setTab} className="gap-6">
          <PillTabs tabs={[...tabs]} value={tab} layoutId="result-tab" />

          <div className="rounded-2xl border border-custom-primary/70 bg-[#061a32]/70 p-5 sm:p-7">
            <TabsContent value="identification" asChild>
              <motion.div {...fade}>
                <IdentificationTab identification={result.identification} />
              </motion.div>
            </TabsContent>
            <TabsContent value="strings" asChild>
              <motion.div {...fade}>
                <StringsTab strings={result.strings} />
              </motion.div>
            </TabsContent>
            <TabsContent value="entropy" asChild>
              <motion.div {...fade}>
                <EntropyTab entropy={result.entropy} />
              </motion.div>
            </TabsContent>
            <TabsContent value="plots" asChild>
              <motion.div {...fade}>
                <PlotsTab entropy={result.entropy} fileName={result.identification.fileName} />
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="mx-auto flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
      >
        <Button type="button" onClick={onReanalyze} className={primaryActionClass}>
          <RefreshCwIcon data-icon="inline-start" />
          Reanalyze
        </Button>
        <Button type="button" variant="outline" onClick={() => downloadReport(result)} className={secondaryActionClass}>
          <DownloadIcon data-icon="inline-start" />
          Download report
        </Button>
        <Button type="button" variant="outline" onClick={onReset} className={secondaryActionClass}>
          <UploadIcon data-icon="inline-start" />
          Analyze another file
        </Button>
      </motion.div>

      <p className="flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-gray-400">
        <InfoIcon aria-hidden className="mt-0.5 size-3.5 shrink-0" />
        Hashes, strings, entropy and file structure are measured from your file in this browser. The verdict, confidence and family are a demo
        until the AI models are connected.
      </p>
    </div>
  );
}
