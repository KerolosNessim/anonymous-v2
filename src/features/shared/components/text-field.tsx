"use client";

import { useId, useState } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { errorClass, fieldClass, labelClass } from "@/features/shared/constants/form-styles";

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  autoComplete?: string;
  description?: string;
}

/** Text input wired to react-hook-form. type="password" adds a show/hide toggle. */
export default function TextField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  description,
}: TextFieldProps<T>) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id} className={labelClass}>
            {label}
          </FieldLabel>
          <div className="relative">
            <Input
              {...field}
              id={id}
              type={isPassword && visible ? "text" : type}
              autoComplete={autoComplete}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              className={cn(fieldClass, isPassword && "pr-12")}
            />
            {isPassword && (
              <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                aria-label={visible ? "Hide password" : "Show password"}
                aria-pressed={visible}
                className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center rounded-r-xl text-gray-400 transition-colors hover:text-custom-primary focus-visible:text-custom-primary focus-visible:outline-2 focus-visible:outline-custom-primary"
              >
                {visible ? <EyeOff aria-hidden className="size-5" /> : <Eye aria-hidden className="size-5" />}
              </button>
            )}
          </div>
          {description && !fieldState.invalid && (
            <FieldDescription className="text-xs text-gray-400">{description}</FieldDescription>
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} className={errorClass} />}
        </Field>
      )}
    />
  );
}
