export type AnalysisKind = "file" | "archive";
export type Verdict = "malicious" | "benign";
export type EntropyLevel = "low" | "moderate" | "high";

export interface FileHashes {
  sha256: string;
  sha1: string;
}

export interface Identification {
  fileName: string;
  size: number;
  type: string;
  architecture: string;
  hashes: FileHashes;
}

export interface StringsResult {
  /** Suspicious ASCII strings (imports, URLs, command names) */
  highlighted: string[];
  unicode: string[];
  ascii: string[];
  /** Only the first part of a large file is scanned for strings */
  scannedBytes: number;
  truncated: boolean;
}

export interface EntropyBlock {
  block: number;
  entropy: number;
}

export interface SectionEntropy {
  name: string;
  size: number;
  entropy: number;
}

export interface EntropyResult {
  value: number;
  level: EntropyLevel;
  remark: string;
  blockSize: number;
  blocks: EntropyBlock[];
  /** Empty when the file is not a PE executable */
  sections: SectionEntropy[];
}

export interface AnalysisResult {
  id: string;
  /** ISO date-time */
  analyzedAt: string;
  verdict: Verdict;
  /** 0-100 */
  confidence: number;
  family: string | null;
  note: string;
  identification: Identification;
  strings: StringsResult;
  entropy: EntropyResult;
}

export interface AnalysisStep {
  id: string;
  label: string;
}

export type AnalysisPhase = "idle" | "analyzing" | "done" | "error";
