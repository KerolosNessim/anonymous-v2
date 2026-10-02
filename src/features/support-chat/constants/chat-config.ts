// The shadcn chat components use semantic tokens, which are light in this app.
// These variables re-point them to the app's navy and cyan, scoped to the chat panel only.
export const chatThemeClass = [
  "[--background:#0B1A2A]",
  "[--foreground:#ffffff]",
  "[--popover:#0B1A2A]",
  "[--popover-foreground:#ffffff]",
  "[--primary:#00ffe0]",
  "[--primary-foreground:#0B1A2A]",
  "[--secondary:#16304a]",
  "[--secondary-foreground:#ffffff]",
  "[--muted:#102338]",
  "[--muted-foreground:#9ca3af]",
  "[--accent:#16304a]",
  "[--accent-foreground:#ffffff]",
  "[--border:rgb(0_255_224/0.35)]",
  "[--input:rgb(0_255_224/0.35)]",
  "[--ring:rgb(0_255_224/0.5)]",
].join(" ");

export const welcomeMessage =
  "Hi, I'm the Anonymous assistant. Ask a question below or pick a topic to get started.";

export const quickReplies = [
  { label: "Pricing and plans", message: "How much do the plans cost?" },
  { label: "How do I scan a file?", message: "How do I scan a file?" },
  { label: "Account help", message: "I need help with my account" },
  { label: "Talk to a person", message: "I want to talk to a person" },
];
