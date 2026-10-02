import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Banner from "@/features/shared/components/banner";
import PageHeader from "@/features/shared/components/page-header";
import { getServiceBySlug, getServices } from "@/features/services/services/get-services";
import ServiceHero from "@/features/services/components/service-hero";
import ProcessSteps from "@/features/services/components/process-steps";
import CapabilitiesGrid from "@/features/services/components/capabilities-grid";
import OtherServices from "@/features/services/components/other-services";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return { title: `${service.title} | Anonymous`, description: service.overview };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const [service, services] = await Promise.all([getServiceBySlug(slug), getServices()]);
  if (!service) notFound();

  return (
    <main className="overflow-hidden">
      <PageHeader breadcrumbs={[{ label: "Services", href: "/services" }, { label: service.title }]} />

      <ServiceHero service={service} />
      <ProcessSteps steps={service.steps} />
      <CapabilitiesGrid capabilities={service.capabilities} />
      <OtherServices services={services.filter((s) => s.slug !== service.slug)} />
      <Banner />
    </main>
  );
}
