export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 100 ? 0 : 2)} ${units[unit]}`;
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["day", 86_400_000],
  ["hour", 3_600_000],
  ["minute", 60_000],
];

const relative = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });

/** "2 hours ago", "yesterday". Falls back to a short date after a week. */
export function formatRelative(iso: string, now: number = Date.now()): string {
  const diff = new Date(iso).getTime() - now;
  if (Math.abs(diff) > 7 * 86_400_000) {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
  for (const [unit, ms] of RELATIVE_UNITS) {
    if (Math.abs(diff) >= ms) return relative.format(Math.round(diff / ms), unit);
  }
  return "just now";
}
