import type { Metadata } from "next";
import ContactInfoSection from "@/features/contact/components/contact-info-section";
import ContactFormSection from "@/features/contact/components/contact-form-section";
import Banner from "@/features/shared/components/banner";
import PageHeader from "@/features/shared/components/page-header";

export const metadata: Metadata = {
  title: "Contact Us | Anonymous",
  description: "Questions, feedback or a partnership inquiry? Get in touch with the Anonymous team.",
};

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      <PageHeader
        breadcrumbs={[{ label: "Contact Us" }]}
        title="Contact Us"
        description="Questions, feedback or a partnership inquiry? Reach out and we will reply soon."
      />
      <ContactInfoSection />
      <ContactFormSection />
      <Banner />
    </main>
  );
}
