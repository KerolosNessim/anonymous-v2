import { mockAnalyses } from "../constants/mock-analyses";
import type { AnalysisRecord } from "../types";

// Mock data access. Replace each body with a request to the API; callers stay the same.
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function listAnalyses(): Promise<AnalysisRecord[]> {
  return mockAnalyses;
}

export async function deleteAnalysis(id: string): Promise<void> {
  void id;
  await wait(600);
}

/** Runs the analysis again and returns the record with a fresh analysis time. */
export async function reanalyze(record: AnalysisRecord): Promise<AnalysisRecord> {
  await wait(1400);
  return { ...record, analyzedAt: new Date().toISOString() };
}

export async function logout(): Promise<void> {
  await wait(300);
}
