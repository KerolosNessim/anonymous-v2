import { mockFamilies } from "../constants/analysis-config";
import type { AnalysisKind, Verdict } from "../types";

/**
 * MOCK scoring. The hashes, strings, entropy and PE data around it are measured from the real file, but the
 * verdict, confidence and family come from the AI models on the backend. Until that exists, this derives a stable
 * result for demos: files uploaded on the "File" tab are benign and files on the "Compressed file" tab are
 * malicious, with a confidence and family taken from the file's hash so the same file gets the same answer.
 */
export function mockVerdict(sha256: string, fileName: string, kind: AnalysisKind) {
  const seed = Number.parseInt(sha256.slice(0, 8), 16) || fileName.length;
  const verdict: Verdict = kind === "archive" ? "malicious" : "benign";

  if (verdict === "benign") {
    return { verdict, confidence: 82 + (seed % 17), family: null, note: "No malicious behavior was found." };
  }

  const family = mockFamilies[seed % mockFamilies.length];
  const similar = [1, 2].map((offset) => mockFamilies[(seed + offset) % mockFamilies.length]);
  return {
    verdict,
    confidence: 62 + (seed % 35),
    family,
    note: `Possibly a fork of ${similar[0]}. Highly matches ${family} and ${similar[1]} family names.`,
  };
}
