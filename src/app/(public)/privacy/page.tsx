import type { Metadata } from "next";
import PageHeader from "@/features/shared/components/page-header";
import LegalDocument from "@/features/legal/components/legal-document";
import { privacy } from "@/features/legal/constants/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy | Anonymous",
  description: privacy.description,
};

export default function PrivacyPage() {
  return (
    <main className="overflow-hidden">
      <PageHeader
        breadcrumbs={[{ label: privacy.title }]}
        title={privacy.title}
        description={privacy.description}
      />
      <LegalDocument document={privacy} related={{ label: "Terms & Conditions", href: "/terms" }} />
    </main>
  );
}
