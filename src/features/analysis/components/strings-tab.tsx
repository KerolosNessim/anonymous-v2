"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { StringsResult } from "../types";
import { formatBytes } from "../utils/format";

function Group({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  if (items.length === 0) return null;
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-3">
      <h3 className="flex items-baseline gap-2 text-base font-bold text-custom-primary md:text-lg">
        {title}
        <span className="font-mono text-xs font-normal text-gray-400">{items.length}</span>
      </h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((value, index) => (
          <li key={`${value}-${index}`} className="max-w-full">
            <Badge
              variant="outline"
              className={
                accent
                  ? "h-auto max-w-full whitespace-normal break-all rounded-lg border-red-400/50 bg-red-400/10 px-2.5 py-1 font-mono text-xs text-red-200"
                  : "h-auto max-w-full whitespace-normal break-all rounded-lg border-custom-primary/30 bg-white/5 px-2.5 py-1 font-mono text-xs text-gray-200"
              }
            >
              {value}
            </Badge>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

export default function StringsTab({ strings }: { strings: StringsResult }) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    const match = (list: string[]) => (needle ? list.filter((value) => value.toLowerCase().includes(needle)) : list);
    return { highlighted: match(strings.highlighted), unicode: match(strings.unicode), ascii: match(strings.ascii) };
  }, [strings, needle]);

  const total = filtered.highlighted.length + filtered.unicode.length + filtered.ascii.length;

  return (
    <div className="space-y-4">
      <InputGroup className="h-11 rounded-full border-custom-primary/60 bg-transparent">
        <InputGroupInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search strings"
          aria-label="Search strings"
          className="text-white placeholder:text-gray-500"
        />
        <InputGroupAddon>
          <SearchIcon className="text-custom-primary" />
        </InputGroupAddon>
      </InputGroup>

      <ScrollArea className="h-[26rem] pr-3">
        <div className="space-y-6 pb-2">
          <Group title="Highlighted" items={filtered.highlighted} accent />
          <Group title="Unicode" items={filtered.unicode} />
          <Group title="ASCII" items={filtered.ascii} />
          {total === 0 && (
            <p className="py-10 text-center text-sm text-gray-400">
              {needle ? `No strings match "${query.trim()}".` : "No readable strings were found in this file."}
            </p>
          )}
        </div>
      </ScrollArea>

      {strings.truncated && (
        <p className="text-xs text-gray-400">Strings come from the first {formatBytes(strings.scannedBytes)} of the file.</p>
      )}
    </div>
  );
}
