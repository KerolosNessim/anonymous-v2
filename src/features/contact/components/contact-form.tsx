"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage } from "../services/send-contact-message";
import { contactSchema, type ContactFormValues } from "../types";

const fieldClass =
  "rounded-xl border-custom-primary/70 bg-transparent px-4 text-sm placeholder:text-gray-500 focus-visible:border-custom-primary focus-visible:ring-custom-primary/30 dark:bg-transparent";

const defaultValues: ContactFormValues = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitError(null);
    try {
      const { ok } = await sendContactMessage(values);
      if (!ok) throw new Error("rejected");
      form.reset(defaultValues);
      setSent(true);
    } catch {
      setSent(false);
      setSubmitError("We couldn't send your message. Check your connection and try again.");
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      onChange={() => sent && setSent(false)}
      noValidate
      className="mx-auto w-full max-w-xl space-y-6"
    >
      <FieldGroup className="gap-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-name" className="sr-only">Your name</FieldLabel>
              <Input
                {...field}
                id="contact-name"
                autoComplete="name"
                placeholder="Your Name"
                aria-invalid={fieldState.invalid}
                className={`h-12 ${fieldClass}`}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-email" className="sr-only">Your email</FieldLabel>
              <Input
                {...field}
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder="Your Email"
                aria-invalid={fieldState.invalid}
                className={`h-12 ${fieldClass}`}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-subject" className="sr-only">Subject</FieldLabel>
              <Input
                {...field}
                id="contact-subject"
                placeholder="Your Subject"
                aria-invalid={fieldState.invalid}
                className={`h-12 ${fieldClass}`}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-message" className="sr-only">Your message</FieldLabel>
              <Textarea
                {...field}
                id="contact-message"
                placeholder="Your Message"
                aria-invalid={fieldState.invalid}
                className={`min-h-40 resize-none py-3 ${fieldClass}`}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex flex-col items-center gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="custom-btn h-11 min-w-48 rounded-full border-none px-8 font-bold text-dark-blue"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </Button>

        <div role="status" aria-live="polite" className="min-h-6 text-center text-sm">
          {sent && (
            <p className="inline-flex items-center gap-2 text-custom-primary">
              <CheckCircle2 aria-hidden className="size-4" />
              Message sent. We will reply to your email soon.
            </p>
          )}
          {submitError && <p className="text-red-400">{submitError}</p>}
        </div>
      </div>
    </form>
  );
}
