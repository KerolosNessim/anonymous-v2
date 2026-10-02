"use client";

import { DownloadIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CopyButton from "@/features/shared/components/copy-button";
import { formatBytes, formatDateTime } from "@/features/shared/utils/format";
import { cn } from "@/lib/utils";
import type { AnalysisRecord } from "../types";
import VerdictBadge, { verdictStyles } from "./verdict-badge";

interface AnalysisDetailsDialogProps {
  record: AnalysisRecord | null;
  onClose: () => void;
  onReanalyze: (record: AnalysisRecord) => void;
  onDownload: (record: AnalysisRecord) => void;
}

export default function AnalysisDetailsDialog({ record, onClose, onReanalyze, onDownload }: AnalysisDetailsDialogProps) {
  const rows = record
    ? [
        { label: "Verdict", value: <VerdictBadge verdict={record.verdict} /> },
        { label: "Confidence", value: <span className={cn("font-mono font-bold", verdictStyles[record.verdict].text)}>{record.confidence}%</span> },
        { label: "Family", value: record.family ?? "No family found" },
        { label: "Analyzed", value: formatDateTime(record.analyzedAt) },
        { label: "Size", value: formatBytes(record.size) },
        { label: "Upload type", value: record.kind === "archive" ? "Compressed file" : "File" },
        { label: "File ID", value: <span className="font-mono text-xs break-all">{record.id}</span> },
        {
          label: "SHA-256",
          value: (
            <span className="flex items-start gap-1">
              <span className="min-w-0 font-mono text-xs break-all">{record.sha256}</span>
              <CopyButton value={record.sha256} label="SHA-256" />
            </span>
          ),
        },
      ]
    : [];

  return (
    <Dialog open={record !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto border border-border sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="break-all pr-6">{record?.fileName ?? "Analysis details"}</DialogTitle>
          <DialogDescription>Details of this analysis.</DialogDescription>
        </DialogHeader>

        {record && (
          <>
            <dl className="divide-y divide-border text-sm">
              {rows.map((row) => (
                <div key={row.label} className="grid gap-1 py-2.5 sm:grid-cols-[7rem_1fr] sm:gap-4">
                  <dt className="font-bold text-primary">{row.label}</dt>
                  <dd className="min-w-0 text-foreground">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="rounded-lg border border-amber-300/30 bg-amber-300/5 px-3 py-2 text-sm leading-relaxed text-amber-300">{record.note}</p>

            <DialogFooter className="gap-2 sm:gap-2">
              <Button type="button" variant="outline" onClick={() => onDownload(record)} className="rounded-full">
                <DownloadIcon data-icon="inline-start" />
                Download report
              </Button>
              <Button
                type="button"
                onClick={() => {
                  onReanalyze(record);
                  onClose();
                }}
                className="rounded-full"
              >
                <RefreshCwIcon data-icon="inline-start" />
                Reanalyze
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
