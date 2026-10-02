import type { Metadata } from "next";
import ServicesSection from "@/features/shared/components/services-section";
import Banner from "@/features/shared/components/banner";
import PageHeader from "@/features/shared/components/page-header";

export const metadata: Metadata = {
  title: "Services | Anonymous",
  description:
    "AI-powered malware detection, family classification, and TTP mapping with MITRE ATT&CK.",
};

export default function ServicesPage() {
  return (
    <main className="overflow-hidden">
      <PageHeader
        breadcrumbs={[{ label: "Services" }]}
        title="Services"
        description="Detection, classification and threat intelligence, all from a single scan."
      />
      <ServicesSection />
      <Banner />
    </main>
  );
}
