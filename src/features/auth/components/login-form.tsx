"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { login } from "../services/auth-service";
import { loginSchema, type LoginValues } from "../types";
import SocialAuth from "./social-auth";
import TextField from "@/features/shared/components/text-field";

export default function LoginForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    setSubmitError(null);
    try {
      const result = await login(values);
      if (!result.ok) {
        setSubmitError(result.message);
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setSubmitError("We couldn't log you in. Check your connection and try again.");
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
        <FieldGroup className="gap-4">
          <TextField control={form.control} name="email" label="Email" type="email" autoComplete="email" placeholder="Enter your email" />
          <TextField
            control={form.control}
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
          />
        </FieldGroup>

        <div className="space-y-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="custom-btn h-12 w-full rounded-full border-none text-base font-bold text-dark-blue"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>
          <p role="alert" className="min-h-5 text-center text-sm text-red-400">
            {submitError}
          </p>
        </div>
      </form>

      <SocialAuth />

      <p className="text-center text-sm text-gray-300">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-bold text-custom-primary underline-offset-4 hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
}
