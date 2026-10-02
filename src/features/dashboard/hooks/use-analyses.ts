"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { deleteAnalysis, reanalyze } from "../services/analyses";
import type { AnalysisRecord, VerdictFilter } from "../types";

const PAGE_SIZE = 6;

export function useAnalyses(initial: AnalysisRecord[]) {
  const [records, setRecords] = useState(initial);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<VerdictFilter>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [busy, setBusy] = useState<ReadonlySet<string>>(new Set());

  const setBusyFor = (id: string, on: boolean) =>
    setBusy((current) => {
      const next = new Set(current);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return records
      .filter((record) => filter === "all" || record.verdict === filter)
      .filter((record) => !needle || record.fileName.toLowerCase().includes(needle))
      .sort((a, b) => b.analyzedAt.localeCompare(a.analyzedAt));
  }, [records, query, filter]);

  const stats = useMemo(() => {
    const malicious = records.filter((record) => record.verdict === "malicious").length;
    const latest = [...records].sort((a, b) => b.analyzedAt.localeCompare(a.analyzedAt))[0];
    return { total: records.length, malicious, benign: records.length - malicious, latest: latest?.analyzedAt ?? null };
  }, [records]);

  const remove = useCallback(async (record: AnalysisRecord) => {
    setBusyFor(record.id, true);
    try {
      await deleteAnalysis(record.id);
      setRecords((current) => current.filter((item) => item.id !== record.id));
      toast.success(`Deleted ${record.fileName}`);
    } catch {
      toast.error(`We could not delete ${record.fileName}. Try again.`);
    } finally {
      setBusyFor(record.id, false);
    }
  }, []);

  const rerun = useCallback(async (record: AnalysisRecord) => {
    setBusyFor(record.id, true);
    const loading = toast.loading(`Reanalyzing ${record.fileName}`);
    try {
      const updated = await reanalyze(record);
      setRecords((current) => current.map((item) => (item.id === record.id ? updated : item)));
      toast.success(`Reanalysis of ${record.fileName} is done`, { id: loading });
    } catch {
      toast.error(`We could not reanalyze ${record.fileName}. Try again.`, { id: loading });
    } finally {
      setBusyFor(record.id, false);
    }
  }, []);

  return {
    records: filtered.slice(0, visible),
    totalMatches: filtered.length,
    hasMore: filtered.length > visible,
    showMore: () => setVisible((count) => count + PAGE_SIZE),
    query,
    setQuery: (value: string) => {
      setQuery(value);
      setVisible(PAGE_SIZE);
    },
    filter,
    setFilter: (value: VerdictFilter) => {
      setFilter(value);
      setVisible(PAGE_SIZE);
    },
    clearFilters: () => {
      setQuery("");
      setFilter("all");
      setVisible(PAGE_SIZE);
    },
    isFiltered: query.trim() !== "" || filter !== "all",
    stats,
    busy,
    remove,
    rerun,
  };
}
