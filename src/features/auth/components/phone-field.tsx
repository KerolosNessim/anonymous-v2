"use client";

import { useId } from "react";
import { Controller, type Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { errorClass, fieldClass, labelClass } from "@/features/shared/constants/form-styles";
import type { RegisterValues } from "../types";
import CountrySelect from "./country-select";

function PhoneNumberInput({ className, ...props }: React.ComponentProps<"input">) {
  return <Input {...props} className={cn(fieldClass, "min-w-0 flex-1", className)} />;
}

export default function PhoneField({ control }: { control: Control<RegisterValues> }) {
  const id = useId();

  return (
    <Controller
      name="phone"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id} className={labelClass}>
            Phone number
          </FieldLabel>
          <PhoneInput
            id={id}
            international
            countryCallingCodeEditable={false}
            addInternationalOption={false}
            defaultCountry="EG"
            labels={en}
            value={field.value || undefined}
            onChange={(value) => field.onChange(value ?? "")}
            onBlur={field.onBlur}
            countrySelectComponent={CountrySelect}
            inputComponent={PhoneNumberInput}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Enter your phone number"
            aria-invalid={fieldState.invalid}
            className="flex w-full items-stretch gap-2"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} className={errorClass} />}
        </Field>
      )}
    />
  );
}
