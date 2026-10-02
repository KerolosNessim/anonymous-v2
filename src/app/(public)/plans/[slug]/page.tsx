import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Banner from "@/features/shared/components/banner";
import PageHeader from "@/features/shared/components/page-header";
import { getOtherPlans, getPlanBySlug, getPlanFaqs, getPlans } from "@/features/plans/services/get-plans";
import PlanHero from "@/features/plans/components/plan-hero";
import PlanDetails from "@/features/plans/components/plan-details";
import PlanFaq from "@/features/plans/components/plan-faq";
import OtherPlans from "@/features/plans/components/other-plans";

export async function generateStaticParams() {
  const plans = await getPlans();
  return plans.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/plans/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const plan = await getPlanBySlug(slug);
  if (!plan) return {};
  return { title: `${plan.name} plan | Anonymous`, description: plan.overview };
}

export default async function PlanPage({ params }: PageProps<"/plans/[slug]">) {
  const { slug } = await params;
  const plan = await getPlanBySlug(slug);
  if (!plan) notFound();

  const [others, faqs] = await Promise.all([getOtherPlans(slug), getPlanFaqs()]);

  return (
    <main className="overflow-hidden">
      <PageHeader breadcrumbs={[{ label: "Plans", href: "/#plans" }, { label: `${plan.name} plan` }]} />
      <PlanHero plan={plan} />
      <PlanDetails plan={plan} />
      <PlanFaq faqs={faqs} />
      <OtherPlans plans={others} />
      <Banner />
    </main>
  );
}
