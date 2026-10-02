"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
        } catch {
          setCopied(false);
        }
      }}
      className="shrink-0 text-gray-400 hover:text-custom-primary"
    >
      {copied ? <CheckIcon className="text-custom-primary" /> : <CopyIcon />}
    </Button>
  );
}
