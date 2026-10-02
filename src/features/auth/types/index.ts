import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { experienceOptions } from "@/features/shared/constants/experience";

export const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export const registerSchema = z.object({
  firstName: z.string().trim().min(2, "Enter your first name."),
  lastName: z.string().trim().min(2, "Enter your last name."),
  email: z.email("Enter a valid email address."),
  phone: z
    .string()
    .min(1, "Enter your phone number.")
    .refine((value) => isValidPhoneNumber(value), "Enter a valid phone number for the selected country."),
  company: z.string().trim().min(2, "Enter your company name."),
  jobTitle: z.string().trim().min(2, "Enter your job title."),
  experience: z.enum(experienceOptions, "Select your years of experience."),
  password: z
    .string()
    .min(8, "Use at least 8 characters.")
    .regex(/[a-z]/, "Add a lowercase letter.")
    .regex(/[A-Z]/, "Add an uppercase letter.")
    .regex(/[0-9]/, "Add a number."),
  terms: z.boolean().refine((value) => value, "Accept the terms to create an account."),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type SocialProvider = "github" | "google";

export type AuthResult = { ok: true } | { ok: false; message: string };
