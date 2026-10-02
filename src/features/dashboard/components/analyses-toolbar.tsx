"use client";

import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { VerdictFilter } from "../types";

interface AnalysesToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  filter: VerdictFilter;
  onFilterChange: (value: VerdictFilter) => void;
}

const filters: { value: VerdictFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "malicious", label: "Malicious" },
  { value: "benign", label: "Benign" },
];

export default function AnalysesToolbar({ query, onQueryChange, filter, onFilterChange }: AnalysesToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <InputGroup className="h-11 rounded-full sm:max-w-sm">
        <InputGroupInput
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by file name"
          aria-label="Search analyses by file name"
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      <ToggleGroup
        type="single"
        variant="outline"
        value={filter}
        onValueChange={(value) => value && onFilterChange(value as VerdictFilter)}
        aria-label="Filter by verdict"
        className="w-full sm:w-auto"
      >
        {filters.map((item) => (
          <ToggleGroupItem
            key={item.value}
            value={item.value}
            className="h-11 flex-1 px-4 font-bold data-[state=on]:bg-primary data-[state=on]:text-primary-foreground sm:flex-none"
          >
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
