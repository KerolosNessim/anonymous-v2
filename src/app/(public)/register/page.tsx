import type { Metadata } from "next";
import AuthCard from "@/features/auth/components/auth-card";
import RegisterForm from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Sign up | Anonymous",
  description: "Create your Anonymous account and start analyzing malware in a few steps.",
};

export default function RegisterPage() {
  return (
    <main className="overflow-hidden">
      <AuthCard
        title="Sign Up Now"
        description="Join us today and start your journey. Create your account in just a few steps."
      >
        <RegisterForm />
      </AuthCard>
    </main>
  );
}
