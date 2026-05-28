import SectionHeader from '@/features/shared/components/section-header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlanCard, { type PlanCardData } from './plan-card';

const individualPlans: PlanCardData[] = [
  {
    name: "Monthly",
    price: "$19",
    period: "mo",
    subtitle: "Best For Beginner",
    features: [
      "AI-powered malware scanning",
      "Basic threat detection",
      "Limited malware reports",
      "Community support",
    ],
  },
  {
    name: "Monthly",
    price: "$79",
    period: "mo",
    subtitle: "Best For Advanced",
    highlighted: true,
    features: [
      "AI-powered malware scanning",
      "Basic threat detection",
      "Limited malware reports",
      "Community support",
      "Enterprise-scale monitoring",
      "Advanced reporting",
    ],
  },
  {
    name: "Monthly",
    price: "$19",
    period: "mo",
    subtitle: "Best For Beginner",
    features: [
      "AI-powered malware scanning",
      "Basic threat detection",
      "Limited malware reports",
      "Community support",
    ],
  },
];

const teamPlans: PlanCardData[] = [
  {
    name: "Monthly",
    price: "$49",
    period: "mo",
    subtitle: "Small Security Teams",
    features: [
      "AI-powered malware scanning",
      "Priority threat detection",
      "Shared malware reports",
      "Team collaboration",
    ],
  },
  {
    name: "Monthly",
    price: "$129",
    period: "mo",
    subtitle: "Best For SOC Teams",
    highlighted: true,
    features: [
      "AI-powered malware scanning",
      "Priority threat detection",
      "Unlimited malware reports",
      "Team collaboration",
      "Enterprise-scale monitoring",
      "Threat intelligence export",
    ],
  },
  {
    name: "Monthly",
    price: "$219",
    period: "mo",
    subtitle: "Best For Enterprises",
    features: [
      "AI-powered malware scanning",
      "Full threat intelligence suite",
      "Unlimited malware reports",
      "Dedicated support",
    ],
  },
];

const PlansSection = () => {
  return (
    <section className="container py-20 space-y-12">
      <SectionHeader
        label="Why Choose Our Plans?"
        title="Built for Scale, Designed for Security."
        description="From real-time threat detection to advanced malware intelligence, every plan is designed to help teams stay ahead of evolving cyber attacks with speed, accuracy, and automation."
        descriptionClassName="max-w-3xl"
      />
      <Tabs
        defaultValue="individual"
        className="w-full items-center space-y-16"
      >
        <TabsList className="bg-transparent border-custom-primary border-2 p-2 rounded-full h-fit! gap-2 ">
          <TabsTrigger
            value="individual"
            className="border-none py-3! px-6! hover:text-white! text-custom-primary font-bold rounded-full data-[state=active]:custom-btn data-[state=active]:text-dark-blue"
          >
            Individual
          </TabsTrigger>
          <TabsTrigger
            value="team"
            className="border-none py-3! px-6! hover:text-white! text-custom-primary font-bold rounded-full data-[state=active]:custom-btn data-[state=active]:text-dark-blue"
          >
            Team
          </TabsTrigger>
        </TabsList>
        <TabsContent value="individual">
          <div className="grid grid-cols-1  max-lg:gap-6 lg:grid-cols-3 lg:items-center">
            {individualPlans.map((plan, index) => (
              <PlanCard
                key={`individual-${index}-${plan.price}`}
                plan={plan}
                index={index}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="team">
          <div className="grid grid-cols-1  max-lg:gap-6 lg:grid-cols-3 lg:items-center">
            {teamPlans.map((plan, index) => (
              <PlanCard
                key={`team-${index}-${plan.price}`}
                plan={plan}
                index={index}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default PlansSection