import type { Metadata } from "next";
import PageHeader from "@/features/shared/components/page-header";
import LegalDocument from "@/features/legal/components/legal-document";
import { terms } from "@/features/legal/constants/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions | Anonymous",
  description: terms.description,
};

export default function TermsPage() {
  return (
    <main className="overflow-hidden">
      <PageHeader
        breadcrumbs={[{ label: terms.title }]}
        title={terms.title}
        description={terms.description}
      />
      <LegalDocument document={terms} related={{ label: "Privacy Policy", href: "/privacy" }} />
    </main>
  );
}
