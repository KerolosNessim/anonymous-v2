const EXTENSION_TYPES: Record<string, string> = {
  ".zip": "Zip archive",
  ".rar": "RAR archive",
  ".7z": "7-zip archive",
  ".tar": "POSIX tar archive",
  ".gz": "gzip compressed data",
  ".pdf": "PDF document",
  ".doc": "Microsoft Word document",
  ".docx": "Microsoft Word document (OOXML)",
  ".xls": "Microsoft Excel spreadsheet",
  ".xlsx": "Microsoft Excel spreadsheet (OOXML)",
  ".js": "JavaScript source",
  ".ps1": "PowerShell script",
  ".bat": "Windows batch file",
  ".vbs": "VBScript source",
  ".sh": "Shell script",
  ".apk": "Android package",
  ".jar": "Java archive",
};

const startsWith = (bytes: Uint8Array, signature: number[]) => signature.every((byte, i) => bytes[i] === byte);

/** Best-effort file type from the first bytes, falling back to the extension. PE files are described in pe.ts. */
export function detectFileType(bytes: Uint8Array, fileName: string, mime: string): string {
  if (startsWith(bytes, [0x7f, 0x45, 0x4c, 0x46])) return "ELF executable";
  if (startsWith(bytes, [0x25, 0x50, 0x44, 0x46])) return "PDF document";
  if (startsWith(bytes, [0x50, 0x4b, 0x03, 0x04])) return "Zip archive data";
  if (startsWith(bytes, [0x52, 0x61, 0x72, 0x21])) return "RAR archive";
  if (startsWith(bytes, [0x37, 0x7a, 0xbc, 0xaf])) return "7-zip archive";
  if (startsWith(bytes, [0x1f, 0x8b])) return "gzip compressed data";
  if (startsWith(bytes, [0xd0, 0xcf, 0x11, 0xe0])) return "Microsoft OLE2 compound document";

  const dot = fileName.lastIndexOf(".");
  const extension = dot >= 0 ? fileName.slice(dot).toLowerCase() : "";
  return EXTENSION_TYPES[extension] ?? (mime || "data");
}
