import { ExternalLink } from "lucide-react";
import type { BlogReference } from "../types";

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function ReferencesPanel({ references }: { references: BlogReference[] }) {
  if (references.length === 0) return null;

  return (
    <section
      id="references"
      aria-labelledby="references-title"
      className="relative scroll-mt-28 overflow-hidden rounded-2xl border border-custom-primary/80 bg-[#061a32]/80"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,224,0.14),transparent_55%)]" />

      <div className="relative flex items-baseline justify-between gap-4 border-b border-custom-primary/30 px-5 py-4 md:px-6">
        <h2 id="references-title" className="text-lg font-bold text-custom-primary md:text-xl">
          References
        </h2>
        <span className="font-mono text-xs text-gray-400">
          {references.length} {references.length === 1 ? "source" : "sources"}
        </span>
      </div>

      <ol className="relative divide-y divide-custom-primary/15">
        {references.map((reference, index) => (
          <li
            key={reference.url}
            id={`ref-${index + 1}`}
            className="scroll-mt-28 border-l-2 border-transparent px-5 py-4 transition-colors duration-300 target:border-custom-primary target:bg-custom-primary/10 md:px-6"
          >
            <div className="flex gap-4">
              <span className="pt-0.5 font-mono text-sm font-bold text-custom-primary">[{index + 1}]</span>
              <div className="min-w-0 space-y-1">
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 font-semibold text-white transition-colors hover:text-custom-primary"
                >
                  <span>{reference.title}</span>
                  <ExternalLink aria-hidden className="mt-1 size-3.5 shrink-0" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <p className="break-all text-sm text-gray-400">
                  {reference.source} · <span className="font-mono text-xs">{hostname(reference.url)}</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
