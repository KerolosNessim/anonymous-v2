import {
  Binary,
  BrainCircuit,
  FileSearch,
  FileText,
  Fingerprint,
  GitBranch,
  Layers,
  Network,
  ShieldOff,
  Tags,
  Target,
  Workflow,
} from "lucide-react";
import type { ServiceDetail } from "../types";

// Mock content. Replace with real data once the backend exists.
export const serviceDetails: ServiceDetail[] = [
  {
    slug: "malware-detection",
    tagline: "Upload a file. Get a verdict in seconds.",
    overview:
      "Anonymous reads a file two ways at once: as an image built from its raw bytes, and as language built from its code. When either view looks wrong, the file is flagged, even if it has never been seen before and every signature misses it.",
    metrics: [
      { value: "99%", label: "Detection accuracy" },
      { value: "< 30s", label: "Typical scan time" },
      { value: "2", label: "Models per file" },
    ],
    steps: [
      {
        title: "Upload the file",
        description:
          "Drop in an executable, archive or document. Files are analyzed statically and never run on your machine.",
      },
      {
        title: "Unpack and extract",
        description:
          "Packers and wrappers are unwrapped so the model sees the real payload instead of the disguise.",
      },
      {
        title: "Read it twice",
        description:
          "One model studies the binary as an image. A second reads the code as language. Their scores are combined.",
      },
      {
        title: "Get the verdict",
        description:
          "You receive a clear malicious or benign result with the evidence behind it, ready to share with your team.",
      },
    ],
    capabilities: [
      {
        title: "Built for obfuscation",
        description: "Finds malware that has been packed, encrypted or reshaped to dodge signatures.",
        Icon: ShieldOff,
      },
      {
        title: "Static analysis only",
        description: "Nothing is executed, so a bad file can't do damage while you inspect it.",
        Icon: FileSearch,
      },
      {
        title: "Binary-to-image model",
        description: "Turns raw bytes into an image so visual patterns in the structure stand out.",
        Icon: Binary,
      },
      {
        title: "Code-as-language model",
        description: "Reads instructions the way a language model reads text, including intent and context.",
        Icon: BrainCircuit,
      },
      {
        title: "Zero-day coverage",
        description: "Judges behavior and structure, so a brand-new threat looks suspicious on first sight.",
        Icon: Fingerprint,
      },
      {
        title: "Shareable reports",
        description: "Every scan produces a report you can export for analysts and incident tickets.",
        Icon: FileText,
      },
    ],
    report: {
      title: "Scan result",
      subject: "invoice_2291.exe",
      rows: [
        { label: "Verdict", value: "Malicious", tone: "danger" },
        { label: "Confidence", value: "99.2%", percent: 99, tone: "danger" },
        { label: "Binary-image model", value: "98.7%", percent: 98 },
        { label: "Code-language model", value: "99.4%", percent: 99 },
        { label: "Packer", value: "UPX 3.96", tone: "warning" },
        { label: "Entropy", value: "7.81 / 8", percent: 97, tone: "warning" },
      ],
    },
  },
  {
    slug: "family-classification",
    tagline: "Know what you caught, not just that you caught it.",
    overview:
      "A detection tells you something is wrong. Classification tells you what it is. Anonymous assigns each sample to a malware family so your team knows how it behaves and which playbook to open first.",
    metrics: [
      { value: "87%", label: "Family accuracy" },
      { value: "12+", label: "Families recognized" },
      { value: "Top 3", label: "Ranked matches" },
    ],
    steps: [
      {
        title: "Start from a detection",
        description: "Any file flagged as malicious moves on to family analysis automatically.",
      },
      {
        title: "Compare against known families",
        description: "Structure and code features are matched against families such as ransomware, trojans and spyware.",
      },
      {
        title: "Rank the matches",
        description: "You see the three most likely families with a probability for each, not a single guess.",
      },
      {
        title: "Act with context",
        description: "Each family links to the behavior to expect, so triage starts from knowledge instead of a blank page.",
      },
    ],
    capabilities: [
      {
        title: "Ransomware, trojans, spyware",
        description: "Covers the families analysts meet most often, plus worms and backdoors.",
        Icon: Tags,
      },
      {
        title: "Probability for every match",
        description: "See how sure the model is and how close the runner-up was.",
        Icon: Layers,
      },
      {
        title: "Variant awareness",
        description: "Related samples group together even when their hashes are completely different.",
        Icon: GitBranch,
      },
      {
        title: "Faster triage",
        description: "Route a sample to the right responder the moment the family is known.",
        Icon: Workflow,
      },
      {
        title: "Built on detection",
        description: "Runs from the same scan, so there is no second upload and no second wait.",
        Icon: FileSearch,
      },
      {
        title: "Exportable results",
        description: "Attach the family, score and evidence to a ticket in one step.",
        Icon: FileText,
      },
    ],
    report: {
      title: "Family ranking",
      subject: "invoice_2291.exe",
      rows: [
        { label: "Ransomware", value: "71%", percent: 71, tone: "danger" },
        { label: "Trojan", value: "18%", percent: 18, tone: "warning" },
        { label: "Spyware", value: "7%", percent: 7 },
        { label: "Other", value: "4%", percent: 4 },
        { label: "Closest known sample", value: "LockStrain.B" },
      ],
    },
  },
  {
    slug: "ttp-mapping",
    tagline: "See how the threat moves, in the language defenders share.",
    overview:
      "Anonymous maps what a sample can do to the MITRE ATT&CK framework. Instead of a list of strings, you get tactics and techniques you can hunt for, detect and report on.",
    metrics: [
      { value: "ATT&CK", label: "Framework aligned" },
      { value: "14", label: "Tactics covered" },
      { value: "1 click", label: "Report export" },
    ],
    steps: [
      {
        title: "Extract capabilities",
        description: "Imports, strings and code behavior are read to find what the sample is able to do.",
      },
      {
        title: "Map to techniques",
        description: "Each capability is matched to an ATT&CK technique with its ID, such as T1027.",
      },
      {
        title: "Group by tactic",
        description: "Techniques are arranged by tactic, from initial access to impact, so the attack path is easy to follow.",
      },
      {
        title: "Hand off to defenders",
        description: "Export the mapping and feed it straight into detection rules and threat hunts.",
      },
    ],
    capabilities: [
      {
        title: "Technique-level detail",
        description: "Every finding carries its ATT&CK ID and a plain-language description.",
        Icon: Target,
      },
      {
        title: "Attack path view",
        description: "Follow the likely order of tactics instead of reading a flat list.",
        Icon: Network,
      },
      {
        title: "Hunt-ready output",
        description: "Turn techniques into queries and detection rules your SOC already uses.",
        Icon: FileSearch,
      },
      {
        title: "Shared vocabulary",
        description: "Analysts, managers and partners all read the same framework.",
        Icon: Tags,
      },
      {
        title: "Built on analysis",
        description: "Comes from the same static scan, with no extra tooling to run.",
        Icon: Layers,
      },
      {
        title: "Exportable reports",
        description: "Download the mapping for incident reviews and threat intelligence sharing.",
        Icon: FileText,
      },
    ],
    report: {
      title: "ATT&CK mapping",
      subject: "invoice_2291.exe",
      rows: [
        { label: "Defense Evasion", value: "T1027 Obfuscated Files", tone: "danger" },
        { label: "Persistence", value: "T1547 Boot Autostart", tone: "warning" },
        { label: "Discovery", value: "T1082 System Info", tone: "default" },
        { label: "Command and Control", value: "T1071 Web Protocols", tone: "warning" },
        { label: "Impact", value: "T1486 Data Encrypted", tone: "danger" },
      ],
    },
  },
];
