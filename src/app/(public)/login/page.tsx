import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import AuthCard from "@/features/auth/components/auth-card";
import LoginForm from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Log in | Anonymous",
  description: "Log in to your Anonymous account to analyze files and review your reports.",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { registered } = await searchParams;

  return (
    <main className="overflow-hidden">
      <AuthCard
        title="Login Now"
        description="Welcome back. Log in to continue analyzing files and reviewing your reports."
      >
        {registered && (
          <p
            role="status"
            className="flex items-center gap-2 rounded-xl border border-custom-primary/50 bg-custom-primary/10 px-4 py-3 text-sm text-custom-primary"
          >
            <CheckCircle2 aria-hidden className="size-4 shrink-0" />
            Account created. Log in to continue.
          </p>
        )}
        <LoginForm />
      </AuthCard>
    </main>
  );
}
