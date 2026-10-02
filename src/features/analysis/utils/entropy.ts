import type { EntropyBlock, EntropyLevel } from "../types";

const TARGET_BLOCKS = 400;
const MIN_BLOCK_SIZE = 256;

function entropyFromCounts(counts: Uint32Array, total: number): number {
  if (total === 0) return 0;
  let entropy = 0;
  for (let i = 0; i < 256; i++) {
    const count = counts[i];
    if (count === 0) continue;
    const p = count / total;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}

/** Shannon entropy in bits per byte (0 to 8) */
export function shannonEntropy(bytes: Uint8Array): number {
  const counts = new Uint32Array(256);
  for (let i = 0; i < bytes.length; i++) counts[bytes[i]]++;
  return entropyFromCounts(counts, bytes.length);
}

/** Whole-file entropy plus the entropy of consecutive blocks, for the entropy plot. */
export function analyzeEntropy(bytes: Uint8Array): { value: number; blockSize: number; blocks: EntropyBlock[] } {
  const blockSize = Math.max(MIN_BLOCK_SIZE, Math.ceil(bytes.length / TARGET_BLOCKS));
  const total = new Uint32Array(256);
  const blocks: EntropyBlock[] = [];

  for (let start = 0, block = 0; start < bytes.length; start += blockSize, block++) {
    const end = Math.min(start + blockSize, bytes.length);
    const counts = new Uint32Array(256);
    for (let i = start; i < end; i++) {
      counts[bytes[i]]++;
      total[bytes[i]]++;
    }
    blocks.push({ block, entropy: Number(entropyFromCounts(counts, end - start).toFixed(3)) });
  }

  return { value: Number(entropyFromCounts(total, bytes.length).toFixed(2)), blockSize, blocks };
}

export function describeEntropy(value: number): { level: EntropyLevel; remark: string } {
  if (value < 5) return { level: "low", remark: "Normal / Low" };
  if (value < 7) return { level: "moderate", remark: "Moderate" };
  return { level: "high", remark: "High. The file may be packed or encrypted." };
}
