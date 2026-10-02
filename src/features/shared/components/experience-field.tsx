"use client";

import { useId } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { experienceOptions } from "../constants/experience";
import { dropdownClass, dropdownItemClass, errorClass, fieldClass, labelClass } from "../constants/form-styles";

interface ExperienceFieldProps<T extends FieldValues> {
  control: Control<T>;
  /** A field whose value is one of experienceOptions */
  name: Path<T>;
}

export default function ExperienceField<T extends FieldValues>({ control, name }: ExperienceFieldProps<T>) {
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id} className={labelClass}>
            Years of experience
          </FieldLabel>
          <Select value={(field.value as string | undefined) ?? ""} onValueChange={field.onChange}>
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
