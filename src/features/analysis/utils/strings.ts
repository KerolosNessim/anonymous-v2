import type { StringsResult } from "../types";

const SCAN_LIMIT = 4 * 1024 * 1024;
const MIN_LENGTH = 5;
const MAX_LENGTH = 120;
const LIMITS = { highlighted: 60, unicode: 80, ascii: 120 };

const SUSPICIOUS =
  /\.(dll|exe|sys)$|https?:\/\/|\b(CreateRemoteThread|CreateThread|CreateProcess[AW]?|VirtualAlloc(Ex)?|WriteProcessMemory|LoadLibrary[AW]?|GetProcAddress|RegSetValue(Ex)?[AW]?|ShellExecute[AW]?|URLDownloadToFile[AW]?|InternetOpen[AW]?|IsDebuggerPresent)\b|cmd\.exe|powershell/i;

const printable = (byte: number) => byte >= 0x20 && byte <= 0x7e;

function collectAscii(bytes: Uint8Array): string[] {
  const found = new Set<string>();
  let start = -1;
  for (let i = 0; i <= bytes.length; i++) {
    const ok = i < bytes.length && printable(bytes[i]);
    if (ok && start === -1) start = i;
    if (!ok && start !== -1) {
      if (i - start >= MIN_LENGTH) found.add(String.fromCharCode(...bytes.subarray(start, Math.min(i, start + MAX_LENGTH))));
      start = -1;
    }
  }
  return [...found];
}

function collectUnicode(bytes: Uint8Array): string[] {
  const found = new Set<string>();
  let chars: number[] = [];
  for (let i = 0; i + 1 < bytes.length; i += 1) {
    if (printable(bytes[i]) && bytes[i + 1] === 0) {
      chars.push(bytes[i]);
      i += 1;
    } else {
      if (chars.length >= MIN_LENGTH) found.add(String.fromCharCode(...chars.slice(0, MAX_LENGTH)));
      chars = [];
    }
  }
  if (chars.length >= MIN_LENGTH) found.add(String.fromCharCode(...chars.slice(0, MAX_LENGTH)));
  return [...found];
}

/** Printable ASCII and UTF-16 strings from the start of the file, with suspicious ones set apart. */
export function extractStrings(bytes: Uint8Array): StringsResult {
  const scanned = bytes.subarray(0, SCAN_LIMIT);
  const ascii = collectAscii(scanned);
  const highlighted = ascii.filter((value) => SUSPICIOUS.test(value));

  return {
    highlighted: highlighted.slice(0, LIMITS.highlighted).map((value) => `(ASCII) ${value}`),
    unicode: collectUnicode(scanned).slice(0, LIMITS.unicode),
    ascii: ascii.filter((value) => !SUSPICIOUS.test(value)).slice(0, LIMITS.ascii),
    scannedBytes: scanned.length,
    truncated: bytes.length > SCAN_LIMIT,
  };
}
