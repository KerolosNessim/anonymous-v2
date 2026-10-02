import { analysisSteps } from "../constants/analysis-config";
import type { AnalysisKind, AnalysisResult } from "../types";
import { analyzeEntropy, describeEntropy } from "../utils/entropy";
import { detectFileType } from "../utils/file-type";
import { computeHashes } from "../utils/hash";
import { describePe, parsePe } from "../utils/pe";
import { extractStrings } from "../utils/strings";
import { mockVerdict } from "../utils/mock-verdict";

// Each step takes at least this long so the progress is readable, even for small files.
const MIN_STEP_MS = 650;

const wait = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Analysis cancelled", "AbortError"));
    });
  });

/**
 * Analyzes a file in the browser. Hashes, file type, PE structure, strings and entropy are measured from the
 * real bytes. The verdict is mocked (see mock-verdict.ts). To use a backend, upload the file here and return
 * its AnalysisResult; the UI only depends on that shape.
 */
export async function analyzeFile(
  file: File,
  kind: AnalysisKind,
  onStep: (index: number) => void,
  signal?: AbortSignal
): Promise<AnalysisResult> {
  const run = async <T,>(index: number, work: () => Promise<T> | T): Promise<T> => {
    signal?.throwIfAborted();
    onStep(index);
    // let the UI paint the new step before the (synchronous) work blocks the thread
    await wait(50, signal);
    const [value] = await Promise.all([Promise.resolve().then(work), wait(MIN_STEP_MS, signal)]);
    return value;
  };

  const buffer = await run(0, () => file.arrayBuffer());
  const bytes = new Uint8Array(buffer);
  const hashes = await run(1, () => computeHashes(buffer));
  const pe = await run(2, () => parsePe(bytes));
  const strings = await run(3, () => extractStrings(bytes));
  const entropyData = await run(4, () => analyzeEntropy(bytes));
  const scored = await run(5, () => mockVerdict(hashes.sha256, file.name, kind));

  const { level, remark } = describeEntropy(entropyData.value);

  return {
    id: hashes.sha256.slice(0, 24),
    analyzedAt: new Date().toISOString(),
    ...scored,
    identification: {
      fileName: file.name,
      size: file.size,
      type: pe ? describePe(pe) : detectFileType(bytes, file.name, file.type),
      architecture: pe?.architecture ?? "Not applicable",
      hashes,
    },
    strings,
    entropy: { ...entropyData, level, remark, sections: pe?.sections ?? [] },
  };
}

export const stepCount = analysisSteps.length;
