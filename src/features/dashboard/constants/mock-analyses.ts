import type { AnalysisRecord, DashboardUser } from "../types";

// Mock data. Replace with the signed-in user's analyses from the API.
export const mockUser: DashboardUser = {
  name: "Karim Gomaa",
  email: "karim.gomaa@example.com",
  plan: "Pro",
};

// Deterministic fake SHA-256 so the data is stable between renders.
const fakeHash = (seed: number) => {
  let state = seed * 2654435761;
  let out = "";
  while (out.length < 64) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    out += state.toString(16).padStart(8, "0");
  }
  return out.slice(0, 64);
};

const utc = (month: number, day: number, hour: number, minute: number) =>
  new Date(Date.UTC(2026, month, day, hour, minute)).toISOString();

type Seed = Omit<AnalysisRecord, "id" | "sha256">;

const OK = "No malicious behavior was found.";

// Newest first. Months are zero-based: 9 is October, 8 is September.
const seeds: Seed[] = [
  { fileName: "vmprox.dll", size: 412_160, analyzedAt: utc(9, 2, 19, 31), verdict: "malicious", confidence: 78, family: "RedLine", note: "Possibly a fork of Azorult. Highly matches RedLine and RaccoonStealer family names.", kind: "file" },
  { fileName: "SecurityHealthSsoUdk.dll", size: 96_768, analyzedAt: utc(9, 2, 19, 30), verdict: "benign", confidence: 94, family: null, note: OK, kind: "file" },
  { fileName: "invoice_2291.zip", size: 1_843_200, analyzedAt: utc(9, 2, 17, 5), verdict: "malicious", confidence: 91, family: "AsyncRAT", note: "The archive contains a packed executable that matches AsyncRAT.", kind: "archive" },
  { fileName: "zipcontainer.dll", size: 58_880, analyzedAt: utc(9, 1, 19, 29), verdict: "benign", confidence: 88, family: null, note: OK, kind: "file" },
  { fileName: "x3daudio1_1.dll", size: 112_640, analyzedAt: utc(9, 1, 19, 28), verdict: "benign", confidence: 96, family: null, note: OK, kind: "file" },
  { fileName: "cracker.exe", size: 8_847_360, analyzedAt: utc(9, 1, 14, 12), verdict: "malicious", confidence: 73, family: "NetWire", note: "Possibly a fork of RedLine. Highly matches NetWire and AsyncRAT family names.", kind: "file" },
  { fileName: "report_q3.pdf", size: 523_776, analyzedAt: utc(9, 1, 9, 48), verdict: "benign", confidence: 99, family: null, note: OK, kind: "file" },
  { fileName: "setup_helper.exe", size: 2_201_600, analyzedAt: utc(8, 30, 21, 3), verdict: "malicious", confidence: 85, family: "Agent Tesla", note: "Credential-stealing behavior and a keylogger routine were found.", kind: "file" },
  { fileName: "vfwwdm32.dll", size: 94_208, analyzedAt: utc(8, 30, 12, 31), verdict: "benign", confidence: 92, family: null, note: OK, kind: "file" },
  { fileName: "payload_bundle.rar", size: 3_932_160, analyzedAt: utc(8, 30, 11, 20), verdict: "malicious", confidence: 67, family: "Emotet", note: "Highly matches Emotet. Review the extracted documents before opening them.", kind: "archive" },
  { fileName: "KERNEL32_patch.dll", size: 188_416, analyzedAt: utc(8, 29, 16, 45), verdict: "benign", confidence: 83, family: null, note: OK, kind: "file" },
  { fileName: "keygen_pro.exe", size: 1_126_400, analyzedAt: utc(8, 28, 13, 2), verdict: "malicious", confidence: 97, family: "Formbook", note: "Highly matches Formbook. The file injects code into other processes.", kind: "file" },
  { fileName: "notes_backup.zip", size: 734_208, analyzedAt: utc(8, 27, 8, 15), verdict: "benign", confidence: 90, family: null, note: OK, kind: "archive" },
  { fileName: "driver_update.sys", size: 276_480, analyzedAt: utc(8, 25, 18, 40), verdict: "benign", confidence: 86, family: null, note: OK, kind: "file" },
];

export const mockAnalyses: AnalysisRecord[] = seeds.map((seed, index) => ({
  ...seed,
  id: fakeHash(index + 11).slice(0, 24),
  sha256: fakeHash(index + 11),
}));
