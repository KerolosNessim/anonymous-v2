import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name (at least 2 characters)."),
  email: z.email("Enter a valid email address."),
  subject: z.string().trim().min(3, "Enter a subject (at least 3 characters)."),
  message: z
    .string()
    .trim()
    .min(10, "Write at least 10 characters so we can help.")
    .max(1000, "Keep your message under 1000 characters."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
