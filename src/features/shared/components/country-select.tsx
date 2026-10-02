"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getCountryCallingCode, type Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { dropdownClass, dropdownItemClass, fieldClass } from "../constants/form-styles";

interface CountryOption {
  value?: Country;
  label: string;
  divider?: boolean;
}

interface CountrySelectProps {
  value?: Country;
  onChange: (country?: Country) => void;
  options: CountryOption[];
  disabled?: boolean;
  readOnly?: boolean;
}

function Flag({ country, label, className }: { country: Country; label: string; className?: string }) {
  const Icon = flags[country];
  return Icon ? (
    <span className={cn("inline-flex h-4 w-6 shrink-0 overflow-hidden rounded-[2px] [&>svg]:size-full", className)}>
      <Icon title={label} />
    </span>
  ) : null;
}

/** Searchable country dropdown for react-phone-number-input (Popover + Command, app-themed). */
export default function CountrySelect({ value, onChange, options, disabled, readOnly }: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const countries = options.filter((option): option is CountryOption & { value: Country } => !!option.value);
  const selected = countries.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled || readOnly}
          aria-label={selected ? `Country: ${selected.label}` : "Select country"}
          className={cn(
            fieldClass,
            "flex w-24 shrink-0 cursor-pointer items-center justify-between gap-2 border px-3 outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          {value ? <Flag country={value} label={selected?.label ?? value} /> : <span className="text-gray-500">--</span>}
          <ChevronDown aria-hidden className={cn("size-4 text-custom-primary transition-transform", open && "rotate-180")} />
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className={cn("w-80 p-0", dropdownClass)}>
        <Command className="bg-transparent text-white">
          <CommandInput placeholder="Search country or code" className="text-white placeholder:text-gray-400" />
          <CommandList className="max-h-64">
            <CommandEmpty className="text-gray-400">No country found.</CommandEmpty>
            {countries.map(({ value: country, label }) => {
              const code = getCountryCallingCode(country);
              return (
                <CommandItem
                  key={country}
                  // cmdk filters on this string, so a country is found by name, ISO code or calling code
                  value={`${label} ${country} +${code}`}
                  data-checked={country === value}
                  onSelect={() => {
                    onChange(country);
                    setOpen(false);
                  }}
                  className={dropdownItemClass}
                >
                  <Flag country={country} label={label} />
                  <span className="truncate">{label}</span>
                  <span className="ml-auto pr-6 font-mono text-xs text-gray-400">+{code}</span>
                </CommandItem>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
