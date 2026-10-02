import type { Metadata } from "next";
import AboutSection from "@/features/shared/components/about-section";
import WhyChooseUsSection from "@/features/shared/components/why-choose-us-section";
import Banner from "@/features/shared/components/banner";
import PageHeader from "@/features/shared/components/page-header";

export const metadata: Metadata = {
  title: "About Us | Anonymous",
  description:
    "Learn how Anonymous uses AI to redefine malware defense through speed and intelligence.",
};

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <PageHeader
        breadcrumbs={[{ label: "About Us" }]}
        title="About Us"
        description="Who we are, what we believe, and why we built AI-driven malware defense."
      />
      <AboutSection />
      <WhyChooseUsSection />
      <Banner />
    </main>
  );
}
