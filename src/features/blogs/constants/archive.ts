import type { BlogCardData } from "@/features/shared/types";

// Mock archive, newest first. Replace with API data later.
export const archivePosts: BlogCardData[] = [
  {
    title: "Packed, Wrapped, Disguised: Unmasking Obfuscated Malware",
    description:
      "Attackers rarely ship their payload in the open. Learn how packers and crypters hide malicious code, and how static analysis can see through them without running a single instruction.",
    image: "/images/blog-2.png",
    slug: "unmasking-obfuscated-malware",
    href: "/blogs/unmasking-obfuscated-malware",
  },
  {
    title: "From Bytes to Pixels: Why Images Can Reveal Malware",
    description:
      "Turning a binary into an image sounds odd until you see the patterns. Here is how visual structure helps a model tell families of malware apart.",
    image: "/images/blog-3.png",
    slug: "bytes-to-pixels",
    href: "/blogs/bytes-to-pixels",
  },
  {
    title: "Reading ATT&CK Like a Map, Not a Checklist",
    description:
      "The MITRE ATT&CK framework is more useful as a map of attacker behavior than a list to tick off. A practical way to read tactics and techniques during triage.",
    image: "/images/blog-4.png",
    slug: "reading-attack-like-a-map",
    href: "/blogs/reading-attack-like-a-map",
  },
  {
    title: "Ransomware Families: What Their Code Gives Away",
    description:
      "Different ransomware families leave different fingerprints in how they encrypt, spread and communicate. Knowing the family changes the response.",
    image: "/images/blog-1.png",
    slug: "ransomware-families",
    href: "/blogs/ransomware-families",
  },
  {
    title: "Zero-Days Without the Panic: Judging Threats You Have Never Seen",
    description:
      "When there is no signature, behavior and structure are all you have. How AI models make a call on a file nobody has analyzed before.",
    image: "/images/blog-2.png",
    slug: "zero-days-without-panic",
    href: "/blogs/zero-days-without-panic",
  },
  {
    title: "Static vs Dynamic Analysis: Choosing the Right Tool",
    description:
      "Running malware in a sandbox reveals behavior but costs time and risk. Static analysis is fast and safe. When each one earns its place.",
    image: "/images/blog-3.png",
    slug: "static-vs-dynamic-analysis",
    href: "/blogs/static-vs-dynamic-analysis",
  },
  {
    title: "How Accurate Is Accurate? Reading Detection Metrics Honestly",
    description:
      "A 99% score can still hide a lot of missed threats. What precision, recall and false positives really tell you about a detection engine.",
    image: "/images/blog-4.png",
    slug: "reading-detection-metrics",
    href: "/blogs/reading-detection-metrics",
  },
  {
    title: "Spyware in Plain Sight: Quiet Threats That Stay for Months",
    description:
      "Spyware is built to be forgotten. The small signals that give it away long before anyone notices data leaving the network.",
    image: "/images/blog-1.png",
    slug: "spyware-in-plain-sight",
    href: "/blogs/spyware-in-plain-sight",
  },
  {
    title: "Building a Triage Playbook Around Malware Families",
    description:
      "Once you know the family, you know what to check first. A simple structure for turning classification results into response steps.",
    image: "/images/blog-2.png",
    slug: "triage-playbook-by-family",
    href: "/blogs/triage-playbook-by-family",
  },
  {
    title: "Why Explainable Verdicts Matter to Security Teams",
    description:
      "An analyst will not act on a score they cannot explain. Showing the evidence behind a verdict builds trust and speeds up decisions.",
    image: "/images/blog-3.png",
    slug: "explainable-verdicts",
    href: "/blogs/explainable-verdicts",
  },
  {
    title: "Malware Language Models: Teaching AI to Read Assembly",
    description:
      "Language models are good at context. Applied to disassembled code, they start to recognize malicious intent the way they recognize meaning in text.",
    image: "/images/blog-4.png",
    slug: "malware-language-models",
    href: "/blogs/malware-language-models",
  },
  {
    title: "Sharing Threat Intelligence Without Sharing the Risk",
    description:
      "Good reports travel further than samples do. How to package findings so partners can act on them without handling the malware itself.",
    image: "/images/blog-1.png",
    slug: "sharing-threat-intelligence",
    href: "/blogs/sharing-threat-intelligence",
  },
];
