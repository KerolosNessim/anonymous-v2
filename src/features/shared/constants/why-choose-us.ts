import { Brain, Globe, Radar, Workflow } from "lucide-react";
import type { WhyChooseUsItem } from "../types";

export const whyChooseUsCards: WhyChooseUsItem[] = [
  {
    title: "Predictive Accuracy",
    description:
      "Trained on real-world data, our AI sees threats for what they are - not what they've done with 99% accuracy.",
    Icon: Radar,
  },
  {
    title: "Deep Insights",
    description:
      "We don't just flag threats - we profile them. Classifying malware families and mapping TTPs for deeper, actionable insight.",
    Icon: Brain,
  },
  {
    title: "Efficiency and Automation",
    description:
      "Anonymous handles the grunt work of malware analysis - so analysts can focus on what truly matters.",
    Icon: Workflow,
  },
  {
    title: "Accessibility",
    description:
      "Strong security, simple design. Our intuitive interface brings advanced analysis to any team, anywhere - no expertise required.",
    Icon: Globe,
  },
];
