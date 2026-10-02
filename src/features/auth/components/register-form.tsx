"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { register } from "../services/auth-service";
import { registerSchema, type RegisterValues } from "../types";
import { errorClass } from "@/features/shared/constants/form-styles";
import ExperienceField from "./experience-field";
import PhoneField from "./phone-field";
import SocialAuth from "./social-auth";
import TextField from "@/features/shared/components/text-field";

const defaultValues: Partial<RegisterValues> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  experience: undefined,
  password: "",
  terms: false,
};

export default function RegisterForm() {
  const router = useRouter();
  const termsId = useId();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  async function onSubmit(values: RegisterValues) {
    setSubmitError(null);
    try {
      const result = await register(values);
      if (!result.ok) {
        setSubmitError(result.message);
        return;
      }
      router.push("/login?registered=1");
    } catch {
      setSubmitError("We couldn't create your account. Check your connection and try again.");
    }
  }


  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
        <FieldGroup className="gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField control={form.control} name="firstName" label="First name" autoComplete="given-name" placeholder="Enter your first name" />
            <TextField control={form.control} name="lastName" label="Last name" autoComplete="family-name" placeholder="Enter your last name" />
          </div>
          <TextField control={form.control} name="email" label="Email" type="email" autoComplete="email" placeholder="Enter your email" />
          <PhoneField control={form.control} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField control={form.control} name="company" label="Company" autoComplete="organization" placeholder="Enter your company" />
            <TextField control={form.control} name="jobTitle" label="Job title" autoComplete="organization-title" placeholder="Enter your job title" />
          </div>
          <ExperienceField control={form.control} />
          <TextField
            control={form.control}
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            description="At least 8 characters, with upper and lower case letters and a number."
          />

          <Controller
            name="terms"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={termsId}
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                    onBlur={field.onBlur}
                    aria-invalid={fieldState.invalid}
                    className="mt-0.5 size-5 rounded-md border-custom-primary/70 data-[state=checked]:border-custom-primary data-[state=checked]:bg-custom-primary data-[state=checked]:text-dark-blue dark:bg-transparent"
                  />
                  <label htmlFor={termsId} className="cursor-pointer text-sm leading-relaxed text-gray-300">
                    I agree to the{" "}
                    <Link href="/terms" target="_blank" rel="noopener noreferrer" className="font-bold text-custom-primary underline-offset-4 hover:underline">
                      Terms &amp; Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="font-bold text-custom-primary underline-offset-4 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} className={errorClass} />}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="space-y-3">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="custom-btn h-12 w-full rounded-full border-none text-base font-bold text-dark-blue"
          >
            {form.formState.isSubmitting ? "Creating account..." : "Create new account"}
          </Button>
          <p role="alert" className="min-h-5 text-center text-sm text-red-400">
            {submitError}
          </p>
        </div>
      </form>

      <SocialAuth />

      <p className="text-center text-sm text-gray-300">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-custom-primary underline-offset-4 hover:underline">
          Log in
        </Link>
      </p>
    </>
  );
}
