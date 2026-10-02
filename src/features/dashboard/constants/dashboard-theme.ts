// The shadcn tokens in this app are light, and portals (dropdowns, dialogs, the mobile sidebar sheet, toasts) render
// outside any wrapper element, so scoping the variables to a container would miss them. The dashboard layout renders
// this as a <style> element instead, which re-points the tokens to the app's navy and cyan for as long as it is mounted.
export const dashboardThemeCss = `
:root {
  --background: #0B1A2A;
  --foreground: #ffffff;
  --card: #0e2238;
  --card-foreground: #ffffff;
  --popover: #0e2238;
  --popover-foreground: #ffffff;
  --primary: #00ffe0;
  --primary-foreground: #0B1A2A;
  --secondary: #16304a;
  --secondary-foreground: #ffffff;
  --muted: #102338;
  --muted-foreground: #9ca3af;
  --accent: #16304a;
  --accent-foreground: #ffffff;
  --destructive: #f87171;
  --border: rgb(0 255 224 / 0.3);
  --input: rgb(0 255 224 / 0.35);
  --ring: rgb(0 255 224 / 0.5);
  --sidebar: #08182a;
  --sidebar-foreground: #e5e7eb;
  --sidebar-primary: #00ffe0;
  --sidebar-primary-foreground: #0B1A2A;
  --sidebar-accent: rgb(0 255 224 / 0.12);
  --sidebar-accent-foreground: #ffffff;
  --sidebar-border: rgb(0 255 224 / 0.25);
  --sidebar-ring: rgb(0 255 224 / 0.5);
}
`;
