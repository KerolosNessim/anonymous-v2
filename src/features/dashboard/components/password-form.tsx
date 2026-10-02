"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import TextField from "@/features/shared/components/text-field";
import { changePassword } from "../services/profile";
import { passwordSchema, type PasswordValues } from "../types/profile-schema";

export default function PasswordForm() {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });
  const { isDirty, isSubmitting } = form.formState;

  async function onSubmit(values: PasswordValues) {
    setError(null);
    try {
      await changePassword(values);
      form.reset();
      toast.success("Your password is updated.");
    } catch {
      setError("We could not update your password. Check your current password and try again.");
    }
  }

  return (
    <Card className="border border-border ring-0">
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Use a strong password that you do not use anywhere else.</CardDescription>
        </CardHeader>

        <CardContent className="mt-4">
          <FieldGroup className="gap-4">
            <TextField control={form.control} name="currentPassword" label="Current password" type="password" autoComplete="current-password" />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                control={form.control}
                name="newPassword"
                label="New password"
                type="password"
                autoComplete="new-password"
                description="At least 8 characters, with upper and lower case letters and a number."
              />
              <TextField control={form.control} name="confirmPassword" label="Repeat new password" type="password" autoComplete="new-password" />
            </div>
          </FieldGroup>
        </CardContent>

        <CardFooter className="mt-6 flex-col items-stretch gap-3 border-t-0 bg-transparent sm:flex-row sm:items-center sm:justify-end">
          <p role="alert" className="min-h-5 text-sm text-red-400 sm:mr-auto">
            {error}
          </p>
          <Button type="submit" disabled={!isDirty || isSubmitting} className="custom-btn h-11 rounded-full border-none px-8 font-bold text-dark-blue">
            {isSubmitting && <Spinner data-icon="inline-start" />}
            {isSubmitting ? "Updating..." : "Update password"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
