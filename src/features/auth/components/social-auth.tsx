"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signInWithProvider } from "../services/auth-service";
import type { SocialProvider } from "../types";

const providers: { id: SocialProvider; label: string; Icon: typeof FaGithub }[] = [
  { id: "github", label: "Continue with GitHub", Icon: FaGithub },
  { id: "google", label: "Continue with Google", Icon: FaGoogle },
];

export default function SocialAuth() {
  const router = useRouter();
  const [pending, setPending] = useState<SocialProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleClick(provider: SocialProvider) {
    setError(null);
    setPending(provider);
    try {
      const result = await signInWithProvider(provider);
      if (!result.ok) throw new Error(result.message);
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("We couldn't sign you in with that provider. Try again or use your email.");
      setPending(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-sm text-gray-400" role="separator" aria-label="or">
        <span aria-hidden className="h-px flex-1 bg-custom-primary/40" />
        or
        <span aria-hidden className="h-px flex-1 bg-custom-primary/40" />
      </div>

      <div className="space-y-3">
        {providers.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            disabled={pending !== null}
            onClick={() => handleClick(id)}
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-custom-primary/70 text-sm font-bold text-custom-primary transition-colors duration-300 hover:bg-custom-primary hover:text-dark-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Icon aria-hidden className="size-5" />
            {pending === id ? "Connecting..." : label}
          </button>
        ))}
      </div>

      <p role="alert" className="min-h-5 text-center text-sm text-red-400">
        {error}
      </p>
    </div>
  );
}
