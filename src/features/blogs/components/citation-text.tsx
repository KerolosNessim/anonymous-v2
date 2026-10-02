interface CitationTextProps {
  text: string;
  referenceCount: number;
}

/** Renders text, turning markers like [2] into links to #ref-2. Markers without a matching reference stay as text. */
export default function CitationText({ text, referenceCount }: CitationTextProps) {
  const parts = text.split(/(\[\d+\])/g);

  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\[(\d+)\]$/);
        const n = match ? Number(match[1]) : 0;
        if (!match || n < 1 || n > referenceCount) return <span key={index}>{part}</span>;
        return (
          <sup key={index} className="ml-0.5">
            <a
              href={`#ref-${n}`}
              aria-label={`Reference ${n}`}
              className="rounded px-0.5 font-mono text-xs font-bold text-custom-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-custom-primary"
            >
              [{n}]
            </a>
          </sup>
        );
      })}
    </>
  );
}
