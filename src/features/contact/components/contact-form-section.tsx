import SectionHeader from "@/features/shared/components/section-header";
import ContactForm from "./contact-form";

export default function ContactFormSection() {
  return (
    <section className="container space-y-12 py-12 md:py-20">
      <SectionHeader
        label="CONTACT US"
        title="You Have a Question?"
        description="Send us a message and we will get back to you."
      />
      <ContactForm />
    </section>
  );
}
