import type { AnalysisKind, AnalysisStep } from "../types";

export const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const uploadTabs: {
  kind: AnalysisKind;
  label: string;
  accept: string | undefined;
  hint: string;
  extensions: string[] | null;
}[] = [
  {
    kind: "file",
    label: "File",
    accept: undefined,
    hint: "Executables, documents, scripts and any other file, up to 50 MB.",
    extensions: null,
  },
  {
    kind: "archive",
    label: "Compressed file",
    accept: ".zip,.rar,.7z,.tar,.gz",
    hint: "ZIP, RAR, 7z, TAR or GZ archives, up to 50 MB.",
    extensions: [".zip", ".rar", ".7z", ".tar", ".gz"],
  },
];

export const analysisSteps: AnalysisStep[] = [
  { id: "read", label: "Reading the file" },
  { id: "hash", label: "Computing file hashes" },
  { id: "structure", label: "Identifying file type and structure" },
  { id: "strings", label: "Extracting strings" },
  { id: "entropy", label: "Measuring entropy" },
  { id: "score", label: "Scoring with the AI models" },
];

// Mock scoring only. Replace with the verdict returned by the backend.
export const mockFamilies = ["RedLine", "NetWire", "AsyncRAT", "Agent Tesla", "Emotet", "LockBit", "Formbook"];

// Buttons in the app theme. The shadcn outline variant is white in this app, so the secondary style sets its own colors.
export const primaryActionClass =
  "custom-btn h-12 w-full rounded-full border-none px-7 text-base font-bold text-dark-blue sm:w-auto";
export const secondaryActionClass =
  "h-12 w-full rounded-full border-2 border-custom-primary bg-transparent px-7 text-base font-bold text-custom-primary transition-colors duration-300 hover:bg-custom-primary! hover:text-dark-blue dark:border-custom-primary dark:bg-transparent sm:w-auto";
