import type { Identification } from "../types";
import { formatBytes } from "@/features/shared/utils/format";
import CopyButton from "@/features/shared/components/copy-button";

export default function IdentificationTab({ identification }: { identification: Identification }) {
  const rows: { label: string; value: string; mono?: boolean; copy?: boolean }[] = [
    { label: "File name", value: identification.fileName },
    { label: "File size", value: formatBytes(identification.size) },
    { label: "File type", value: identification.type },
    { label: "Architecture", value: identification.architecture },
    { label: "SHA-256", value: identification.hashes.sha256, mono: true, copy: true },
    { label: "SHA-1", value: identification.hashes.sha1, mono: true, copy: true },
  ];

  return (
    <dl className="divide-y divide-custom-primary/15">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-sm font-bold text-custom-primary">{row.label}</dt>
          <dd className="flex min-w-0 items-start gap-2 text-sm text-gray-200 md:text-base">
            <span className={row.mono ? "min-w-0 break-all font-mono text-xs text-gray-300 sm:text-sm" : "min-w-0 break-words"}>
              {row.value}
            </span>
            {row.copy && <CopyButton value={row.value} label={row.label} />}
          </dd>
        </div>
      ))}
    </dl>
  );
}
