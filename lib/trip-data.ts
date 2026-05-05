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
  flightNumber: string; // "DL 84"
  origin: { code: string; name: string };
  destination: { code: string; name: string };
  departISO: string; // "2026-06-03T17:35:00-04:00"
  arriveISO: string;
  cabin?: string;
  confirmation?: string;
  notes?: string;
};

export type Stay = {
  id: string;
  city: City;
  name: string; // "Hôtel ..."
  checkInISO: string; // "2026-06-04"
  checkOutISO: string; // "2026-06-07"
  address?: string;
  confirmation?: string;
  bookingUrl?: string;
  blurb?: string; // 1-2 sentences shown on the stay card
  images: { src: string; alt: string; width: number; height: number }[];
};

export type TimelineEntry = {
  date: string; // "2026-06-04"
  city: City;
  title: string; // "Arrive in Paris"
  description: string; // 1-2 sentences
  highlights?: string[]; // optional bullet detail when expanded
};

export type Restaurant = {
  id: string;
  city: City;
  name: string;
  date?: string; // "2026-06-05"
  time?: string; // "20:00"
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
  domain: string; // "Domaine X"
  description?: string;
  meetingPoint?: string;
  url?: string;
  bookingCode?: string;
};

// ─── Trip-level metadata ────────────────────────────────────────────────────

export const trip = {
  startDate: "2026-06-03",
  endDate: "2026-06-11",
  nights: 7, // hotel nights (the overnight Atlantic flight is not counted)
  cities: ["paris", "beaune", "lausanne"] as City[],
  hero: {
    eyebrow: "Bella's Graduation Trip",
    title: { lines: ["Paris,", "Beaune &", "Lausanne"], italicWord: "&" },
    sub: "",
  },
} as const;

export const cityMeta: Record<
  City,
  {
    name: string;
    country: string;
    nights: number;
    blurb: string;
    accent: string; // CSS color for subtle accent
  }
> = {
  paris: {
    name: "Paris",
    country: "France",
    nights: 3,
    blurb:
      "The first three nights — a slow walk-in: morning bread on the rue, afternoons through gardens, and tables held until late.",
    accent: "var(--gold)",
  },
  beaune: {
    name: "Beaune",
    country: "Burgundy",
    nights: 2,
    blurb:
      "Two nights at the heart of the Côte d'Or — stone-walled cellars, vineyard light, lunches that drift past three.",
    accent: "var(--vintage)",
  },
  lausanne: {
    name: "Lausanne",
    country: "Switzerland",
    nights: 2,
    blurb:
      "Two final nights above Lake Geneva — terraces, cool air off the water, and the Alps catching the last sun across the lake.",
    accent: "var(--lake)",
  },
};

// ─── Flights ────────────────────────────────────────────────────────────────

export const flights: Flight[] = [
  {
    id: "out-ind-dtw",
    airline: "Delta",
    flightNumber: "DL 3994",
    origin: { code: "IND", name: "Indianapolis" },
    destination: { code: "DTW", name: "Detroit" },
    departISO: "2026-06-03T15:59:00-04:00",
    arriveISO: "2026-06-03T17:10:00-04:00",
  },
  {
    id: "out-dtw-cdg",
    airline: "Delta",
    flightNumber: "DL 228",
    origin: { code: "DTW", name: "Detroit" },
    destination: { code: "CDG", name: "Paris · Charles de Gaulle" },
    departISO: "2026-06-03T18:30:00-04:00",
    arriveISO: "2026-06-04T08:40:00+02:00",
  },
  {
    id: "rtn-gva-lhr",
    airline: "American Airlines",
    flightNumber: "AA 6872",
    origin: { code: "GVA", name: "Geneva" },
    destination: { code: "LHR", name: "London · Heathrow" },
    departISO: "2026-06-11T10:10:00+02:00",
    arriveISO: "2026-06-11T10:55:00+01:00",
  },
  {
    id: "rtn-lhr-ord",
    airline: "American Airlines",
    flightNumber: "AA 7017",
    origin: { code: "LHR", name: "London · Heathrow" },
    destination: { code: "ORD", name: "Chicago · O'Hare" },
    departISO: "2026-06-11T13:10:00+01:00",
    arriveISO: "2026-06-11T16:55:00-05:00",
  },
  {
    id: "rtn-ord-ind",
    airline: "American Airlines",
    flightNumber: "AA 1951",
    origin: { code: "ORD", name: "Chicago · O'Hare" },
    destination: { code: "IND", name: "Indianapolis" },
    departISO: "2026-06-11T17:50:00-05:00",
    arriveISO: "2026-06-11T20:00:00-04:00",
  },
];

// ─── Stays ──────────────────────────────────────────────────────────────────

export const stays: Stay[] = [
  {
    id: "stay-paris",
    city: "paris",
    name: "Hôtel des Grands Boulevards",
    checkInISO: "2026-06-04",
    checkOutISO: "2026-06-07",
    address: "17 Boulevard Poissonnière · 75002 Paris",
    confirmation: "HGB-2026-06-04-BV",
    bookingUrl: "https://maisonsparticulieres.com/grands-boulevards",
    blurb:
      "A quiet, garden-courtyard hotel in the 2nd — a five-minute walk to the Palais Royal, twenty to the Seine. Marble lobby, a soft restaurant, and a bath worth lingering in.",
    images: [],
  },
  {
    id: "stay-beaune",
    city: "beaune",
    name: "L'Hôtel de Beaune",
    checkInISO: "2026-06-07",
    checkOutISO: "2026-06-09",
    address: "5 Rue Samuel Legay · 21200 Beaune",
    confirmation: "LHB-779402",
    bookingUrl: "https://lhoteldebeaune.com",
    blurb:
      "A Relais & Châteaux property tucked behind the ramparts. The cellar restaurant pours the surrounding villages by the glass — a short, walkable spine from Hospices to vineyard.",
    images: [],
  },
  {
    id: "stay-lausanne",
    city: "lausanne",
    name: "Beau-Rivage Palace",
    checkInISO: "2026-06-09",
    checkOutISO: "2026-06-11",
    address: "Place du Port 17–19 · 1006 Lausanne",
    confirmation: "BRP-2026-7714",
    bookingUrl: "https://brp.ch",
    blurb:
      "Lakefront for the final two nights. A balcony room facing the Alps across Geneva, a breakfast terrace at the water, and a long lawn that runs straight to the dock.",
    images: [],
  },
];

// ─── Day-by-day timeline ────────────────────────────────────────────────────

export const timeline: TimelineEntry[] = [
  {
    date: "2026-06-03",
    city: "paris",
    title: "Wheels up",
    description:
      "Indianapolis to Detroit, then the long quiet eastward — the trip begins above the Atlantic.",
  },
  {
    date: "2026-06-04",
    city: "paris",
    title: "Arrive in Paris",
    description:
      "Morning landing. Slow walk into the 2nd, drop bags at the hotel, then a long lunch in the courtyard.",
  },
  {
    date: "2026-06-05",
    city: "paris",
    title: "Le Marais & the river",
    description:
      "An untimed day: morning markets in the Marais, afternoon along the Seine.",
  },
  {
    date: "2026-06-06",
    city: "paris",
    title: "Saint-Germain & the gardens",
    description:
      "Left bank slow-walk. The Luxembourg Gardens, an old bookstore or two.",
  },
  {
    date: "2026-06-07",
    city: "beaune",
    title: "TGV south to Beaune",
    description:
      "Late morning train from Gare de Lyon, stepping off into the Côte d'Or by lunch.",
  },
  {
    date: "2026-06-08",
    city: "beaune",
    title: "Côte de Beaune",
    description:
      "A day among the great vineyards south of town — Pommard, Volnay, Meursault — with lunch among the vines.",
  },
  {
    date: "2026-06-09",
    city: "lausanne",
    title: "On to Lausanne",
    description:
      "Morning train through the Jura, lake on the right hand. Afternoon arrival above Lake Geneva.",
  },
  {
    date: "2026-06-10",
    city: "lausanne",
    title: "Lake day",
    description:
      "A full day on the water — a CGN steamer to the vineyards of Lavaux, a vertical walk through Saint-Saphorin.",
  },
  {
    date: "2026-06-11",
    city: "lausanne",
    title: "Home",
    description:
      "An early lake breakfast, a short ride to Geneva, and the long way west — Geneva to London to Chicago to Indianapolis. Home by evening.",
  },
];

// ─── Auto-appearing sections — populate when bookings exist ─────────────────
//
// Currently empty by design — the Itinerary tab is intentionally a thin
// list of days right now.  Add an entry here later and you can rewire the
// rendering to surface them inline per day.

export const restaurants: Restaurant[] = [];
export const activities: Activity[] = [];
export const wineTours: WineTour[] = [];

