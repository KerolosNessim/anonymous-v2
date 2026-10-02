"use client";

import { AnimatePresence, motion } from "motion/react";
import { TriangleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { primaryActionClass, secondaryActionClass } from "../constants/analysis-config";
import { useAnalysis } from "../hooks/use-analysis";
import AnalyzingView from "./analyzing-view";
import ResultsView from "./results-view";
import UploadPanel from "./upload-panel";

const stage = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -16, filter: "blur(6px)" },
  transition: { duration: 0.4, ease: "easeOut" },
} as const;

/** The whole analysis flow on one page: upload, analyzing, then the result. */
export default function AnalysisFlow() {
  const { phase, file, step, result, error, start, reset, reanalyze } = useAnalysis();

  return (
    <section aria-label="File analysis" className="container pt-32 pb-16 md:pb-24 lg:pt-40">
      <div className="mx-auto max-w-5xl">
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div key="idle" {...stage}>
              <UploadPanel onStart={start} />
            </motion.div>
          )}

          {phase === "analyzing" && file && (
            <motion.div key="analyzing" {...stage} className="mx-auto max-w-2xl">
              <AnalyzingView file={file} step={step} onCancel={reset} />
            </motion.div>
          )}

          {phase === "done" && result && (
            <motion.div key={`done-${result.analyzedAt}`} {...stage}>
              <ResultsView result={result} onReanalyze={reanalyze} onReset={reset} />
            </motion.div>
          )}

          {phase === "error" && (
            <motion.div key="error" {...stage} className="mx-auto max-w-2xl">
              <div role="alert" className="space-y-5 rounded-2xl border border-red-400/60 bg-red-400/5 p-8 text-center">
                <TriangleAlertIcon aria-hidden className="mx-auto size-12 text-red-400" />
                <h2 className="text-xl font-bold text-white">Analysis failed</h2>
                <p className="text-sm leading-relaxed text-gray-300">{error}</p>
                <div className="mx-auto flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
                  <Button type="button" onClick={reanalyze} className={primaryActionClass}>
                    Try again
                  </Button>
                  <Button type="button" variant="outline" onClick={reset} className={secondaryActionClass}>
                    Choose another file
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
