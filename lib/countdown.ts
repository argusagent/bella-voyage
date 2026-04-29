// Countdown helpers — derive the trip status from "today" against the
// trip's start/end dates.  All math in local time so the rendered string
// matches the user's wall clock, not UTC.
//
// Three states:
//   • before  → "in 35 days" (or "tomorrow", "today")
//   • live    → "Day 4 of 9"
//   • after   → "welcome home"

import { trip } from "./trip-data";
import { parseDateOnly } from "./format";

export type CountdownState =
  | { phase: "before"; daysUntil: number }
  | { phase: "live"; dayIndex: number; totalDays: number }
  | { phase: "after"; daysSince: number };

export function getCountdownState(now: Date = new Date()): CountdownState {
  const today = startOfLocalDay(now);
  const start = parseDateOnly(trip.startDate);
  const end = parseDateOnly(trip.endDate);

  const totalDays = daysBetween(start, end) + 1;

  if (today.getTime() < start.getTime()) {
    return { phase: "before", daysUntil: daysBetween(today, start) };
  }
  if (today.getTime() > end.getTime()) {
    return { phase: "after", daysSince: daysBetween(end, today) };
  }
  return {
    phase: "live",
    dayIndex: daysBetween(start, today) + 1,
    totalDays,
  };
}

export function formatCountdownShort(s: CountdownState): string {
  if (s.phase === "before") {
    if (s.daysUntil === 0) return "today";
    if (s.daysUntil === 1) return "tomorrow";
    return `${s.daysUntil} days`;
  }
  if (s.phase === "live") {
    return `Day ${s.dayIndex} of ${s.totalDays}`;
  }
  return "home";
}

export function formatCountdownLong(s: CountdownState): string {
  if (s.phase === "before") {
    if (s.daysUntil === 0) return "Wheels up today";
    if (s.daysUntil === 1) return "Wheels up tomorrow";
    return `${s.daysUntil} days until departure`;
  }
  if (s.phase === "live") {
    return `Day ${s.dayIndex} of ${s.totalDays} — live now`;
  }
  if (s.daysSince === 1) return "Home, since yesterday";
  return `Home, ${s.daysSince} days back`;
}

function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}
