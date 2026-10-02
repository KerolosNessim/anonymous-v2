import type { FileHashes } from "../types";

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");

/** SHA-256 and SHA-1 of the file, computed in the browser. Needs a secure context (https or localhost). */
export async function computeHashes(buffer: ArrayBuffer): Promise<FileHashes> {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    return { sha256: "Unavailable without https", sha1: "Unavailable without https" };
  }
  const [sha256, sha1] = await Promise.all([
    crypto.subtle.digest("SHA-256", buffer),
    crypto.subtle.digest("SHA-1", buffer),
  ]);
  return { sha256: toHex(sha256), sha1: toHex(sha1) };
}
