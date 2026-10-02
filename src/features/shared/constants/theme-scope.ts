// The shadcn components use semantic tokens, which are light in this app. Put this class on a container to
// re-point them to the app's navy and cyan for everything inside it (charts, tooltips, chat, popovers).
export const appThemeScope = [
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
