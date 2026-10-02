import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { experienceOptions } from "@/features/shared/constants/experience";

export const profileSchema = z.object({
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
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password."),
    newPassword: z
      .string()
      .min(8, "Use at least 8 characters.")
      .regex(/[a-z]/, "Add a lowercase letter.")
      .regex(/[A-Z]/, "Add an uppercase letter.")
      .regex(/[0-9]/, "Add a number."),
    confirmPassword: z.string().min(1, "Repeat your new password."),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "The passwords do not match.",
  })
  .refine((values) => values.newPassword !== values.currentPassword, {
    path: ["newPassword"],
    message: "Choose a password you have not used here before.",
  });

export type ProfileValues = z.infer<typeof profileSchema>;
export type PasswordValues = z.infer<typeof passwordSchema>;
