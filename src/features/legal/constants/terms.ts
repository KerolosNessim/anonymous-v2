import type { LegalDocument } from "../types";

// Template text. Have it reviewed by a lawyer before launch.
export const terms: LegalDocument = {
  title: "Terms & Conditions",
  description: "The rules for using Anonymous, in plain language. Please read them before you create an account.",
  updated: "2026-09-30",
  sections: [
    {
      id: "acceptance",
      title: "Accepting these terms",
      paragraphs: [
        "By creating an account or using Anonymous, you agree to these Terms & Conditions and to our Privacy Policy. If you use Anonymous for an organization, you confirm that you can accept these terms on its behalf.",
        "If you do not agree, please do not use the service.",
      ],
    },
    {
      id: "service",
      title: "What Anonymous provides",
      paragraphs: [
        "Anonymous is an AI-assisted service that analyzes files for malware. It detects malicious files, classifies them by family and maps their capabilities to the MITRE ATT&CK framework.",
        "We may add, change or remove features over time. When a change affects how you use the service in a significant way, we will tell you in advance where we can.",
      ],
    },
    {
      id: "accounts",
      title: "Your account",
      paragraphs: ["You are responsible for your account and for everything done with it."],
      list: [
        "Give accurate information when you sign up and keep it up to date.",
        "Keep your password private and tell us right away if you think someone else has used your account.",
        "You must be old enough to form a binding contract where you live, and at least 18 years old.",
      ],
    },
    {
      id: "files",
      title: "Files you upload",
      paragraphs: [
        "You may upload files, including suspected malware, for the purpose of analysis. You keep all rights to your files. You give us permission to process them only to run the analysis you asked for and to operate and secure the service.",
        "You confirm that you have the right to upload each file and that doing so does not break any law or anyone else's rights. Our analysis is static, so files are not executed on your devices, but you are responsible for handling any malicious file you hold safely.",
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      paragraphs: ["Use Anonymous only for lawful security purposes. You must not:"],
      list: [
        "Use the service to create, test or improve malware against detection.",
        "Upload files you are not allowed to share, such as other people's private data.",
        "Try to break, overload or gain unauthorized access to the service or other accounts.",
        "Resell the service or its results, or use automated tools to scrape it, without our written permission.",
      ],
      closing: "We may suspend access that breaks these rules.",
    },
    {
      id: "results",
      title: "Analysis results",
      paragraphs: [
        "Anonymous uses machine learning, and no detection system is perfect. Results can contain false positives and false negatives. They are meant to support, not replace, the judgment of a qualified analyst.",
        "You are responsible for the decisions you make based on our results.",
      ],
    },
    {
      id: "plans",
      title: "Plans and payments",
      paragraphs: [
        "Some features need a paid plan. Prices, billing periods and what each plan includes are shown on our plans page when you subscribe. Paid plans renew automatically until you cancel, and you can cancel at any time from your account. Unless the law requires otherwise, fees already paid are not refunded.",
      ],
    },
    {
      id: "ip",
      title: "Our intellectual property",
      paragraphs: [
        "The service, including its software, models, design and name, belongs to Anonymous and its licensors. These terms give you a limited, non-exclusive right to use the service. They do not transfer any ownership to you.",
      ],
    },
    {
      id: "termination",
      title: "Ending your account",
      paragraphs: [
        "You can stop using Anonymous and close your account at any time. We may suspend or end your access if you break these terms or if we must do so by law. When your account ends, the rules on retention in our Privacy Policy apply to your data.",
      ],
    },
    {
      id: "liability",
      title: "Disclaimers and liability",
      paragraphs: [
        "The service is provided as is and as available, without promises that it will always be uninterrupted, error-free or catch every threat.",
        "To the extent the law allows, Anonymous is not liable for indirect or consequential losses, or for loss of data, profits or business, arising from your use of the service. Our total liability for any claim is limited to the amount you paid us in the 12 months before the claim.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      paragraphs: [
        "We may update these terms from time to time. We will change the date at the top of this page and, for important changes, notify you by email or in the service. Continuing to use Anonymous after a change means you accept the updated terms.",
      ],
    },
  ],
};
