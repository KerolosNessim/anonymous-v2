"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { PlusIcon, SearchXIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { downloadJson } from "@/features/shared/utils/download";
import { useAnalyses } from "../hooks/use-analyses";
import type { AnalysisRecord } from "../types";
import AnalysesToolbar from "./analyses-toolbar";
import AnalysisCard from "./analysis-card";
import AnalysisDetailsDialog from "./analysis-details-dialog";
import StatsCards from "./stats-cards";

export default function AnalysesDashboard({ initial }: { initial: AnalysisRecord[] }) {
  const analyses = useAnalyses(initial);
  const [viewing, setViewing] = useState<AnalysisRecord | null>(null);
  const [deleting, setDeleting] = useState<AnalysisRecord | null>(null);

  const download = (record: AnalysisRecord) => downloadJson(`anonymous-report-${record.id}.json`, record);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold md:text-3xl">My analyses</h1>
          <p className="text-sm text-muted-foreground md:text-base">Every file you have analyzed, newest first.</p>
        </div>
        <Button asChild className="custom-btn h-11 rounded-full border-none px-6 font-bold text-dark-blue">
          <Link href="/dashboard/analysis">
            <PlusIcon data-icon="inline-start" />
            New analysis
          </Link>
        </Button>
      </div>

      <StatsCards stats={analyses.stats} />

      <AnalysesToolbar
        query={analyses.query}
        onQueryChange={analyses.setQuery}
        filter={analyses.filter}
        onFilterChange={analyses.setFilter}
      />

      {analyses.records.length > 0 ? (
        <>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Showing {analyses.records.length} of {analyses.totalMatches} {analyses.totalMatches === 1 ? "analysis" : "analyses"}
          </p>
          <ul className="space-y-3">
            <AnimatePresence initial={false} mode="popLayout">
              {analyses.records.map((record) => (
                <motion.li
                  key={record.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, x: -24 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnalysisCard
                    record={record}
                    busy={analyses.busy.has(record.id)}
                    onView={setViewing}
                    onReanalyze={analyses.rerun}
                    onDownload={download}
                    onDelete={setDeleting}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {analyses.hasMore && (
            <div className="flex justify-center pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={analyses.showMore}
                className="h-11 rounded-full border-2 border-primary bg-transparent px-8 font-bold text-primary hover:bg-primary! hover:text-primary-foreground"
              >
                Show more
              </Button>
            </div>
          )}
        </>
      ) : (
        <Empty className="rounded-2xl border border-dashed border-border py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchXIcon />
            </EmptyMedia>
            <EmptyTitle>{analyses.isFiltered ? "No analyses match" : "No analyses yet"}</EmptyTitle>
            <EmptyDescription>
              {analyses.isFiltered
                ? "Try a different file name, or clear the filters to see everything."
                : "Upload a file and your results will appear here."}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            {analyses.isFiltered ? (
              <Button type="button" onClick={analyses.clearFilters} className="rounded-full">
                Clear filters
              </Button>
            ) : (
              <Button asChild className="rounded-full">
                <Link href="/dashboard/analysis">Analyze a file</Link>
              </Button>
            )}
          </EmptyContent>
        </Empty>
      )}

      <AnalysisDetailsDialog
        record={viewing}
        onClose={() => setViewing(null)}
        onReanalyze={analyses.rerun}
        onDownload={download}
      />

      <AlertDialog open={deleting !== null} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent className="border border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this analysis?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleting ? `The report for ${deleting.fileName} will be removed from your history.` : ""} This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (deleting) void analyses.remove(deleting);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
