import type { LegalDocument } from "../types";

// Template text. Have it reviewed by a lawyer before launch.
export const privacy: LegalDocument = {
  title: "Privacy Policy",
  description: "What we collect, why we collect it, and the choices you have. We keep it short and specific.",
  updated: "2026-09-30",
  sections: [
    {
      id: "overview",
      title: "Overview",
      paragraphs: [
        "This policy explains how Anonymous collects, uses and protects your information when you use our website and malware analysis service. We collect only what we need to run the service, and we do not sell your personal information.",
      ],
    },
    {
      id: "collect",
      title: "Information we collect",
      paragraphs: ["We collect three kinds of information."],
      list: [
        "Account details: your name, email address, phone number, company, job title and years of experience, plus your password in hashed form.",
        "Files and results: the files you upload for analysis and the reports we produce from them.",
        "Usage data: pages visited, actions taken, device and browser type, and approximate location from your IP address.",
      ],
    },
    {
      id: "use",
      title: "How we use it",
      paragraphs: ["We use your information to:"],
      list: [
        "Create and manage your account, and sign you in.",
        "Analyze your files and show you the results.",
        "Provide support and reply to your messages.",
        "Keep the service secure, prevent abuse and fix problems.",
        "Understand how the product is used so we can improve it.",
      ],
    },
    {
      id: "files",
      title: "How we handle your files",
      paragraphs: [
        "Files are analyzed statically. They are not executed, and they are stored in access-controlled storage while they are processed. We use uploaded files only to produce your analysis and to keep the service working.",
        "We do not publish your files or share them with other customers. Unless you tell us otherwise, we do not use the contents of your files to train our models.",
      ],
    },
    {
      id: "sharing",
      title: "Who we share it with",
      paragraphs: [
        "We share information only with service providers that help us run Anonymous, such as hosting, email and payment providers. They may use it only to perform services for us. We may also share information when the law requires it, or to protect the rights and safety of our users and the public.",
      ],
    },
    {
      id: "security",
      title: "Security",
      paragraphs: [
        "We protect your information with encryption in transit, access controls and regular reviews. No system is completely secure, so we also ask you to use a strong, unique password and to tell us right away if you suspect misuse of your account.",
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      paragraphs: [
        "We keep account details while your account is open. Uploaded files and reports are kept for a limited period so you can review them, and you can delete them yourself at any time. After you close your account we delete or anonymize your information, except where the law requires us to keep it.",
      ],
    },
    {
      id: "rights",
      title: "Your choices and rights",
      paragraphs: ["Depending on where you live, you may have the right to:"],
      list: [
        "Access the personal information we hold about you.",
        "Correct information that is wrong or out of date.",
        "Delete your information or close your account.",
        "Object to or restrict some uses, and receive a copy of your data.",
      ],
      closing: "To use any of these rights, contact us using the details below.",
    },
    {
      id: "cookies",
      title: "Cookies",
      paragraphs: [
        "We use cookies and similar technology to keep you signed in, remember your preferences and measure how the site is used. You can block or delete cookies in your browser settings, but some parts of the service may then stop working.",
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "Anonymous is not meant for anyone under 18, and we do not knowingly collect information from children. If you believe a child has given us information, contact us and we will delete it.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "We may update this policy. We will change the date at the top of this page and, for important changes, tell you by email or in the service.",
      ],
    },
  ],
};
