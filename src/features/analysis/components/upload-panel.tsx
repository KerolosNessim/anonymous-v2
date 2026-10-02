"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { MAX_FILE_SIZE, primaryActionClass, uploadTabs } from "../constants/analysis-config";
import type { AnalysisKind } from "../types";
import { formatBytes } from "../utils/format";
import Dropzone from "./dropzone";
import PillTabs from "./pill-tabs";

function validate(file: File, kind: AnalysisKind): string | null {
  if (file.size === 0) return "This file is empty. Choose a file that has content.";
  if (file.size > MAX_FILE_SIZE) return `This file is ${formatBytes(file.size)}. The limit is ${formatBytes(MAX_FILE_SIZE)}.`;
  const extensions = uploadTabs.find((tab) => tab.kind === kind)?.extensions;
  if (extensions && !extensions.some((extension) => file.name.toLowerCase().endsWith(extension))) {
    return `Choose a compressed file (${extensions.join(", ")}).`;
  }
  return null;
}

export default function UploadPanel({ onStart }: { onStart: (file: File, kind: AnalysisKind) => void }) {
  const [kind, setKind] = useState<AnalysisKind>("file");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  function select(next: File | null, forKind: AnalysisKind = kind) {
    if (!next) {
      setFile(null);
      setError(null);
      return;
    }
    const problem = validate(next, forKind);
    setError(problem);
    setFile(problem ? null : next);
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-custom-primary/80 bg-[#061a32]/70 p-5 shadow-lg shadow-custom-primary/10 sm:p-8">
      <Tabs
        value={kind}
        onValueChange={(value) => {
          setKind(value as AnalysisKind);
          // a file picked on the other tab may not fit this one
          if (file) select(file, value as AnalysisKind);
          else setError(null);
        }}
        className="gap-6"
      >
        <PillTabs
          tabs={uploadTabs.map((tab) => ({ value: tab.kind, label: tab.label }))}
          value={kind}
          layoutId="upload-tab"
        />

        {uploadTabs.map((tab) => (
          <TabsContent key={tab.kind} value={tab.kind} asChild>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Dropzone accept={tab.accept} hint={tab.hint} file={file} error={error} onFile={(next) => select(next, tab.kind)} />
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-2 flex flex-col items-center gap-5">
        <Button
          type="button"
          disabled={!file}
          onClick={() => file && onStart(file, kind)}
          className={`${primaryActionClass} sm:w-full sm:max-w-sm`}
        >
          Upload and analyze
        </Button>
        <p className="max-w-2xl text-center text-xs leading-relaxed text-gray-400">
          By submitting a file, you agree to our{" "}
          <Link href="/terms" className="font-bold text-custom-primary underline-offset-4 hover:underline">
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-bold text-custom-primary underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          . Please do not submit personal information. We are not responsible for the contents of your submission.
        </p>
      </div>
    </div>
  );
}
