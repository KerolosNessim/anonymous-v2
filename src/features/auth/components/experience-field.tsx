"use client";

import { useId } from "react";
import { Controller, type Control } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { dropdownClass, dropdownItemClass, errorClass, fieldClass, labelClass } from "@/features/shared/constants/form-styles";
import { experienceOptions, type RegisterValues } from "../types";

export default function ExperienceField({ control }: { control: Control<RegisterValues> }) {
  const id = useId();

  return (
    <Controller
      name="experience"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id} className={labelClass}>
            Years of experience
          </FieldLabel>
          <Select value={field.value ?? ""} onValueChange={field.onChange}>
            <SelectTrigger
              id={id}
              aria-invalid={fieldState.invalid}
              onBlur={field.onBlur}
              className={cn(
                fieldClass,
                "w-full h-12! justify-between border data-placeholder:text-gray-500 [&_svg]:text-custom-primary [&_svg]:opacity-100"
              )}
            >
              <SelectValue placeholder="Select your experience" />
            </SelectTrigger>
            <SelectContent position="popper" className={dropdownClass}>
              {experienceOptions.map((option) => (
                <SelectItem key={option} value={option} className={dropdownItemClass}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} className={errorClass} />}
        </Field>
      )}
    />
  );
}
