// Render-side date / time formatters.  All dates in trip-data.ts are stored
// as ISO strings; component code never reaches into Date math directly —
// it goes through here so the language stays consistent.

export function formatLongDate(iso: string): string {
  // "2026-06-04" → "Thursday, June 4"
  const d = parseDateOnly(iso);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function formatShortDate(iso: string): string {
  // "2026-06-04" → "Jun 4"
  const d = parseDateOnly(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatWeekday(iso: string): string {
  const d = parseDateOnly(iso);
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

export function formatDayNumber(iso: string): string {
  const d = parseDateOnly(iso);
  return String(d.getDate());
}

export function formatRangeShort(startIso: string, endIso: string): string {
  // "Jun 4 – 7"
  const a = parseDateOnly(startIso);
  const b = parseDateOnly(endIso);
  const sameMonth = a.getMonth() === b.getMonth();
  const monthA = a.toLocaleDateString("en-US", { month: "short" });
  if (sameMonth) {
    return `${monthA} ${a.getDate()} – ${b.getDate()}`;
  }
  const monthB = b.toLocaleDateString("en-US", { month: "short" });
  return `${monthA} ${a.getDate()} – ${monthB} ${b.getDate()}`;
}

export function nightsBetween(startIso: string, endIso: string): number {
  const a = parseDateOnly(startIso).getTime();
  const b = parseDateOnly(endIso).getTime();
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

export function formatTime24(iso: string): string {
  // "2026-06-03T19:30:00-04:00" → "19:30"
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatTimeLocal(iso: string, timeZone: string): string {
  // Time as it would read at the airport on the wall — destination-local.
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  });
}

export function formatFlightDuration(departIso: string, arriveIso: string): string {
  const ms = new Date(arriveIso).getTime() - new Date(departIso).getTime();
  const total = Math.round(ms / 60000);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

// Tailwind classnames merge.  Tiny — no dependency.
export function cn(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(" ");
}

// "2026-06-04" → Date at local midnight (avoids the off-by-one
// from `new Date("2026-06-04")` parsing as UTC midnight in -ve TZ).
export function parseDateOnly(iso: string): Date {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d);
}
