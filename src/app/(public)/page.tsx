import AboutSection from "@/features/shared/components/about-section";
import HeroSection from "@/features/home/components/hero";
import PlansSection from "@/features/home/components/plans-section";
import ServicesSection from "@/features/shared/components/services-section";
import WhyChooseUsSection from "@/features/shared/components/why-choose-us-section";
import BlogsSection from "@/features/shared/components/blogs-section";
import Banner from "@/features/shared/components/banner";
export default function Home() {
  return (
    <main className="overflow-hidden" >
      <HeroSection />
      <AboutSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <PlansSection />
      <BlogsSection />
      <Banner />
      {/* add comment to test git and node js  */}
    </main>
  );
}
