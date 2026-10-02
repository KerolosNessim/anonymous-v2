import type { ChatReply } from "../types";

// Mock support bot: keyword rules and a short delay. Replace the body with a request to your chat backend
// or live-chat provider; the hook only depends on the ChatReply shape.
const rules: { keywords: string[]; reply: ChatReply }[] = [
  {
    keywords: ["price", "pricing", "cost", "plan", "subscribe", "billing", "pay"],
    reply: {
      text: "Individual plans start at $19 a month and team plans at $49. Yearly billing saves about 17%. You can compare every plan and subscribe from its page.",
      link: { label: "See the plans", href: "/#plans" },
    },
  },
  {
    keywords: ["scan", "upload", "file", "analy", "malware", "detect"],
    reply: {
      text: "Upload a file on the analysis page and you get a verdict, the malware family and an ATT&CK mapping in seconds. Files are analyzed statically, so nothing is run.",
      link: { label: "Analyze a file", href: "/analysis" },
    },
  },
  {
    keywords: ["account", "login", "log in", "password", "sign up", "register"],
    reply: {
      text: "You can create an account or log in at any time. If you can't get in, use the contact form and we will help you recover your account.",
      link: { label: "Go to login", href: "/login" },
    },
  },
  {
    keywords: ["person", "human", "agent", "contact", "email", "talk", "call"],
    reply: {
      text: "Of course. Send us a message and a team member will reply by email as soon as possible.",
      link: { label: "Contact the team", href: "/contact" },
    },
  },
];

const fallback: ChatReply = {
  text: "I'm not sure about that one. Try one of the topics above, or send a message to the team and we will answer by email.",
  link: { label: "Contact the team", href: "/contact" },
};

export async function getSupportReply(message: string): Promise<ChatReply> {
  await new Promise((resolve) => setTimeout(resolve, 700 + Math.random() * 600));
  const text = message.toLowerCase();
  return rules.find((rule) => rule.keywords.some((keyword) => text.includes(keyword)))?.reply ?? fallback;
}
