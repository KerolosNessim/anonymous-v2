import type { ServiceItem } from "../types";

export const services: ServiceItem[] = [
  {
    title: "AI-Powered Malware Detection",
    description:
      "At our core: an AI-powered engine built for precision. We turn binaries into images and code into language detecting even the most obfuscated malware.",
    image: "/images/service-1.svg",
    index: "01",
    slug: "malware-detection",
  },
  {
    title: "Malware Family Classification",
    description:
      "Detection is just the beginning. Anonymous classifies threats by family - Ransomware, Trojan, Spyware - with 87% accuracy, giving you the context to respond smarter.",
    image: "/images/service-2.svg",
    index: "02",
    slug: "family-classification",
  },
  {
    title: "TTP Mapping & Threat Intelligence",
    description:
      "Understanding a threat means knowing it moves. Anonymous maps malware capabilities to the MITRE ATT&CK framework - giving you a clear intelligence edge.",
    image: "/images/service-3.svg",
    index: "03",
    slug: "ttp-mapping",
  },
];
