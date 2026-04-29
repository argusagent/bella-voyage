// ─────────────────────────────────────────────────────────────────────────────
//  ALL trip content lives here.  Editing this file is how the site changes:
//  add a restaurant → push → Vercel auto-deploys.  No component edits needed
//  for content changes.
//
//  Empty-array sections (restaurants, activities, wineTours) auto-render only
//  when they have entries — until then they don't appear at all on the site.
// ─────────────────────────────────────────────────────────────────────────────

export type City = "paris" | "beaune" | "lausanne";

export type Flight = {
  id: string;
  airline: string;
  flightNumber: string;     // "DL 84"
  origin: { code: string; name: string };
  destination: { code: string; name: string };
  departISO: string;        // "2026-06-03T17:35:00-04:00"
  arriveISO: string;
  confirmation?: string;
  notes?: string;
};

export type Stay = {
  id: string;
  city: City;
  name: string;             // "Hôtel ..."
  checkInISO: string;       // "2026-06-04"
  checkOutISO: string;      // "2026-06-07"
  address?: string;
  confirmation?: string;
  bookingUrl?: string;
  blurb?: string;           // 1-2 sentences shown on the stay card
  images: { src: string; alt: string; width: number; height: number }[];
};

export type TimelineEntry = {
  date: string;             // "2026-06-04" — render-side formatting only
  city: City;
  title: string;            // "Arrive in Paris"
  description: string;      // 1-2 sentences
};

export type Restaurant = {
  id: string;
  city: City;
  name: string;
  date?: string;            // "2026-06-05"
  time?: string;            // "20:00"
  partySize?: number;
  reservationCode?: string;
  url?: string;
  notes?: string;
};

export type Activity = {
  id: string;
  city: City;
  date?: string;
  time?: string;
  title: string;
  description?: string;
  url?: string;
  bookingCode?: string;
};

export type WineTour = {
  id: string;
  city: City;
  date?: string;
  time?: string;
  domain: string;           // "Domaine X"
  description?: string;
  meetingPoint?: string;
  url?: string;
  bookingCode?: string;
};

// ─── Trip-level metadata ────────────────────────────────────────────────────

export const trip = {
  startDate: "2026-06-03",
  endDate: "2026-06-11",
  nights: 8,
  cities: ["paris", "beaune", "lausanne"] as City[],
  hero: {
    eyebrow: "An eight-night journey",
    title: { lines: ["Paris,", "Beaune &", "Lausanne"], italicWord: "&" },
    sub: "Three cities, in early June.",
  },
} as const;

// ─── Booked-and-locked content (Phase 2 will fill these from the source HTML)

export const flights: Flight[] = [];
export const stays: Stay[] = [];
export const timeline: TimelineEntry[] = [];

// ─── Auto-appearing sections — populate when bookings exist ─────────────────

export const restaurants: Restaurant[] = [];
export const activities: Activity[] = [];
export const wineTours: WineTour[] = [];
