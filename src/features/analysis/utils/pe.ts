import { shannonEntropy } from "./entropy";
import type { SectionEntropy } from "../types";

export interface PeInfo {
  is64: boolean;
  isDll: boolean;
  subsystem: "console" | "GUI" | "native";
  machine: string;
  architecture: string;
  sectionCount: number;
  sections: SectionEntropy[];
}

const MACHINES: Record<number, { machine: string; architecture: string }> = {
  0x8664: { machine: "x86-64", architecture: "64-bit" },
  0x14c: { machine: "Intel 80386", architecture: "32-bit" },
  0xaa64: { machine: "ARM64", architecture: "ARM 64-bit" },
  0x1c0: { machine: "ARM", architecture: "ARM 32-bit" },
};

const ascii = (bytes: Uint8Array, start: number, length: number) =>
  String.fromCharCode(...Array.from(bytes.subarray(start, start + length)).filter((b) => b !== 0));

/** Reads the PE headers (Windows executables and DLLs). Returns null if the file is not a PE file. */
export function parsePe(bytes: Uint8Array): PeInfo | null {
  if (bytes.length < 0x40 || bytes[0] !== 0x4d || bytes[1] !== 0x5a) return null;

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const peOffset = view.getUint32(0x3c, true);
  if (peOffset + 0x78 > bytes.length) return null;
  if (view.getUint32(peOffset, true) !== 0x00004550) return null; // "PE\0\0"

  const machineCode = view.getUint16(peOffset + 4, true);
  const sectionCount = view.getUint16(peOffset + 6, true);
  const optionalSize = view.getUint16(peOffset + 20, true);
  const characteristics = view.getUint16(peOffset + 22, true);
  const optionalOffset = peOffset + 24;
  const is64 = view.getUint16(optionalOffset, true) === 0x20b;
  const subsystemCode = view.getUint16(optionalOffset + 68, true);

  const sections: SectionEntropy[] = [];
  const tableStart = optionalOffset + optionalSize;
  for (let i = 0; i < Math.min(sectionCount, 96); i++) {
    const offset = tableStart + i * 40;
    if (offset + 40 > bytes.length) break;
    const rawSize = view.getUint32(offset + 16, true);
    const rawPointer = view.getUint32(offset + 20, true);
    if (rawSize === 0 || rawPointer >= bytes.length) {
      sections.push({ name: ascii(bytes, offset, 8) || `section ${i + 1}`, size: rawSize, entropy: 0 });
      continue;
    }
    const data = bytes.subarray(rawPointer, Math.min(rawPointer + rawSize, bytes.length));
    sections.push({
      name: ascii(bytes, offset, 8) || `section ${i + 1}`,
      size: rawSize,
      entropy: Number(shannonEntropy(data).toFixed(2)),
    });
  }

  const known = MACHINES[machineCode] ?? { machine: `machine 0x${machineCode.toString(16)}`, architecture: "Unknown" };

  return {
    is64,
    isDll: (characteristics & 0x2000) !== 0,
    subsystem: subsystemCode === 3 ? "console" : subsystemCode === 2 ? "GUI" : "native",
    machine: known.machine,
    architecture: known.architecture,
    sectionCount,
    sections,
  };
}

export function describePe(pe: PeInfo): string {
  const kind = pe.is64 ? "PE32+" : "PE32";
  const role = pe.isDll ? "executable (DLL)" : "executable";
  return `${kind} ${role} (${pe.subsystem}) ${pe.machine}, for MS Windows, ${pe.sectionCount} sections`;
}
