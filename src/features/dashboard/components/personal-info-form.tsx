"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import ExperienceField from "@/features/shared/components/experience-field";
import PhoneField from "@/features/shared/components/phone-field";
import TextField from "@/features/shared/components/text-field";
import { saveProfile } from "../services/profile";
import { profileSchema, type ProfileValues } from "../types/profile-schema";
import { useUser } from "./user-provider";

export default function PersonalInfoForm() {
  const { profile, updateProfile } = useUser();
  const [error, setError] = useState<string | null>(null);

  const initial = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
    company: profile.company,
    jobTitle: profile.jobTitle,
    experience: profile.experience as ProfileValues["experience"],
  };

  const form = useForm<ProfileValues>({ resolver: zodResolver(profileSchema), defaultValues: initial });
  const { isDirty, isSubmitting } = form.formState;

  async function onSubmit(values: ProfileValues) {
    setError(null);
    try {
      await saveProfile(values);
      updateProfile(values);
      form.reset(values);
      toast.success("Your profile is updated.");
    } catch {
      setError("We could not save your changes. Check your connection and try again.");
    }
  }

  return (
    <Card className="border border-border ring-0">
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
          <CardDescription>This is how you appear in your account. Changes are saved when you press Save changes.</CardDescription>
        </CardHeader>

        <CardContent className="mt-4">
          <FieldGroup className="gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField control={form.control} name="firstName" label="First name" autoComplete="given-name" />
              <TextField control={form.control} name="lastName" label="Last name" autoComplete="family-name" />
            </div>
            <TextField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              description="If you change your email, we will ask you to confirm the new address."
            />
            <PhoneField control={form.control} name="phone" />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField control={form.control} name="company" label="Company" autoComplete="organization" />
              <TextField control={form.control} name="jobTitle" label="Job title" autoComplete="organization-title" />
            </div>
            <ExperienceField control={form.control} name="experience" />
          </FieldGroup>
        </CardContent>

        <CardFooter className="mt-6 flex-col items-stretch gap-3 border-t-0 bg-transparent sm:flex-row sm:items-center sm:justify-end">
          <p role="alert" className="min-h-5 text-sm text-red-400 sm:mr-auto">
            {error}
          </p>
          <Button
            type="button"
            variant="ghost"
            disabled={!isDirty || isSubmitting}
            onClick={() => form.reset()}
            className="h-11 rounded-full px-6 font-bold"
          >
            Discard changes
          </Button>
          <Button type="submit" disabled={!isDirty || isSubmitting} className="custom-btn h-11 rounded-full border-none px-8 font-bold text-dark-blue">
            {isSubmitting && <Spinner data-icon="inline-start" />}
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
