import type { ContactFormValues } from "../types";

// Mock submit. Replace the body with a real request (API route or server action) when the backend exists.
export async function sendContactMessage(values: ContactFormValues): Promise<{ ok: boolean }> {
  void values;
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true };
}
