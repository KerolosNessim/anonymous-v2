"use client";

import { useId } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { errorClass, fieldClass, labelClass } from "../constants/form-styles";
import CountrySelect from "./country-select";

function PhoneNumberInput({ className, ...props }: React.ComponentProps<"input">) {
  return <Input {...props} className={cn(fieldClass, "min-w-0 flex-1", className)} />;
}

interface PhoneFieldProps<T extends FieldValues> {
  control: Control<T>;
  /** A field whose value is a phone number string in international format, such as +201012345678 */
  name: Path<T>;
  label?: string;
}

/** Phone number with a searchable country picker, wired to react-hook-form. */
export default function PhoneField<T extends FieldValues>({ control, name, label = "Phone number" }: PhoneFieldProps<T>) {
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id} className={labelClass}>
            {label}
          </FieldLabel>
          <PhoneInput
            id={id}
            international
            countryCallingCodeEditable={false}
            addInternationalOption={false}
            defaultCountry="EG"
            labels={en}
            value={(field.value as string) || undefined}
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
