import type { AuthResult, LoginValues, RegisterValues, SocialProvider } from "../types";

// Mock auth. Replace each body with a real request (API route or server action) when the backend exists;
// the forms only depend on the AuthResult shape.
const wait = (ms = 900) => new Promise((resolve) => setTimeout(resolve, ms));

export async function login(values: LoginValues): Promise<AuthResult> {
  void values;
  await wait();
  return { ok: true };
}

export async function register(values: RegisterValues): Promise<AuthResult> {
  void values;
  await wait();
  return { ok: true };
}

export async function signInWithProvider(provider: SocialProvider): Promise<AuthResult> {
  void provider;
  await wait(700);
  return { ok: true };
}
