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
  name: string; // "Hôtel ..." or Airbnb listing name
  host?: string; // for Airbnbs / private rentals
  checkInISO: string; // "2026-06-04"
  checkOutISO: string; // "2026-06-07"
  checkInTime?: string; // "2:00 PM" — display string, free-form
  checkOutTime?: string; // "10:00 AM"
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
  description: string; // 1-line summary
  highlights?: string[]; // optional bullet detail when expanded
  images?: { src: string; alt: string; width: number; height: number }[]; // swipeable photo strip
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
    title: { lines: ["Paris,", "Beaune &", "Lake Geneva"], italicWord: "&" },
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
    name: "Lake Geneva",
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
    name: "Home in Levallois-Perret",
    host: "Joseph",
    checkInISO: "2026-06-04",
    checkOutISO: "2026-06-07",
    checkInTime: "2:00 PM",
    checkOutTime: "10:00 AM",
    address: "4 Rue Edouard Vaillant · Levallois-Perret · 92300",
    confirmation: "HMB23FBN9N",
    blurb:
      "Studio Airbnb with a balcony in Levallois-Perret, just past the 17th — Métro line 3 to the centre.",
    // To enable the photo carousel, drop high-resolution JPGs into
    // public/images/paris/ at the filenames below and uncomment the
    // entries.  Order here = render order in the carousel.
    images: [
      // { src: "/images/paris/airbnb-1.jpg", alt: "Bedroom and kitchenette", width: 1600, height: 1067 },
      // { src: "/images/paris/airbnb-2.jpg", alt: "Living and dining area", width: 1600, height: 1067 },
      // { src: "/images/paris/airbnb-3.jpg", alt: "Balcony", width: 1600, height: 1067 },
    ],
  },
  {
    id: "stay-beaune",
    city: "beaune",
    name: "Home in Beaune",
    host: "Francoise",
    checkInISO: "2026-06-07",
    checkOutISO: "2026-06-09",
    checkInTime: "4:00 PM",
    checkOutTime: "10:00 AM",
    address: "2 Rue Vivant Gardin · Beaune · 21200",
    confirmation: "HMCHCZWRBZ",
    blurb:
      "Loft Airbnb in the centre of Beaune, a few blocks from the Hospices and the cellars.",
    // To enable the photo carousel, drop high-resolution JPGs into
    // public/images/beaune/ at the filenames below and uncomment the
    // entries.  Order here = render order in the carousel.
    images: [
      // { src: "/images/beaune/airbnb-1.jpg", alt: "Loft interior", width: 1600, height: 1067 },
      // { src: "/images/beaune/airbnb-2.jpg", alt: "Living area", width: 1600, height: 1067 },
      // { src: "/images/beaune/airbnb-3.jpg", alt: "Bedroom", width: 1600, height: 1067 },
    ],
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
//
// Each entry: a tight one-line summary of the day, optional `images` array
// for a swipeable photo strip below the activities.  Drop JPGs into
// public/images/days/ then add image entries here to surface them.

export const timeline: TimelineEntry[] = [
  {
    date: "2026-06-03",
    city: "paris",
    title: "Wheels up",
    description:
      "Indianapolis to Detroit, then the long quiet eastward — the trip begins above the Atlantic.",
    images: [],
  },
  {
    date: "2026-06-04",
    city: "paris",
    title: "Arrive in Paris",
    description: "Morning landing, then the avenue, the Arc, and the Tower at dusk.",
    images: [],
  },
  {
    date: "2026-06-05",
    city: "paris",
    title: "Versailles",
    description: "South to the palace and gardens for the day, dinner back in the 17th.",
    images: [],
  },
  {
    date: "2026-06-06",
    city: "paris",
    title: "Paris in full",
    description: "Louvre, the river, then the hill at dusk.",
    images: [],
  },
  {
    date: "2026-06-07",
    city: "beaune",
    title: "South to Beaune",
    description: "Late-morning train, then a long afternoon wandering the old town.",
    images: [],
  },
  {
    date: "2026-06-08",
    city: "beaune",
    title: "Côte de Beaune",
    description:
      "Bouché for breakfast, the Hospices mid-morning, then the candlelit cellars in the afternoon.",
    images: [],
  },
  {
    date: "2026-06-09",
    city: "lausanne",
    title: "On to Lake Geneva",
    description: "Morning train through the Jura into the Alps, afternoon to explore.",
    images: [],
  },
  {
    date: "2026-06-10",
    city: "lausanne",
    title: "Lavaux & the lake",
    description: "Terraced vineyards above the water, dinner with a view.",
    images: [],
  },
  {
    date: "2026-06-11",
    city: "lausanne",
    title: "Home",
    description: "Morning train to Geneva, then the long way west.",
    images: [],
  },
];

// ─── Per-day activities ─────────────────────────────────────────────────────
//
// Surfaced inline under the matching Itinerary day row.  Order in this
// array is the order they render in (already chronological per day).

export const activities: Activity[] = [
  // ── Thursday, June 4 — Arrive in Paris ──────────────────────────────────
  {
    id: "jun-4-arrive",
    city: "paris",
    date: "2026-06-04",
    time: "Morning",
    title: "Arrive & train into the city",
    description: "From CDG into Paris.",
  },
  {
    id: "jun-4-arc",
    city: "paris",
    date: "2026-06-04",
    time: "Afternoon",
    title: "Champs-Élysées & Arc de Triomphe",
    description: "The avenue, the Arc, the view from the top.",
  },
  {
    id: "jun-4-eiffel",
    city: "paris",
    date: "2026-06-04",
    time: "Evening",
    title: "Eiffel Tower & dinner",
    description: "Under the iron, then a long table.",
  },

  // ── Friday, June 5 — Versailles ─────────────────────────────────────────
  {
    id: "jun-5-cafe",
    city: "paris",
    date: "2026-06-05",
    time: "Morning",
    title: "Café & train to Versailles",
    description: "Coffee out, then south to the palace.",
  },
  {
    id: "jun-5-palace",
    city: "paris",
    date: "2026-06-05",
    time: "Noon",
    title: "Palace & gardens",
    description: "Tour the rooms, then walk the parterres.",
  },
  {
    id: "jun-5-dinner",
    city: "paris",
    date: "2026-06-05",
    time: "Evening",
    title: "Dinner in the 17ème",
    description: "Back into Paris for the night.",
  },

  // ── Saturday, June 6 — Paris in full ────────────────────────────────────
  {
    id: "jun-6-louvre",
    city: "paris",
    date: "2026-06-06",
    time: "Morning",
    title: "Louvre",
    description: "Open at 9 — start with the Denon wing.",
  },
  {
    id: "jun-6-notre-dame",
    city: "paris",
    date: "2026-06-06",
    time: "Afternoon",
    title: "Notre Dame & the Seine",
    description: "Walk the islands, cross the bridges.",
  },
  {
    id: "jun-6-montmartre",
    city: "paris",
    date: "2026-06-06",
    time: "Evening",
    title: "Montmartre & Sacré-Cœur",
    description: "Up the steps for the city at dusk.",
  },

  // ── Sunday, June 7 — South to Beaune ────────────────────────────────────
  {
    id: "jun-7-tgv",
    city: "beaune",
    date: "2026-06-07",
    time: "Morning",
    title: "Train to Beaune",
    description: "TGV south from Gare de Lyon.",
  },
  {
    id: "jun-7-wander",
    city: "beaune",
    date: "2026-06-07",
    time: "Afternoon & evening",
    title: "Wander the old town",
    description: "Ramparts, the Hospices roof, a glass at the wall.",
  },

  // ── Monday, June 8 — Côte de Beaune ─────────────────────────────────────
  {
    id: "bouche-jun-8",
    city: "beaune",
    date: "2026-06-08",
    time: "Morning",
    title: "Breakfast at Bouché",
    description: "Beloved local bakery — coffee and croissants.",
  },
  {
    id: "hospices-jun-8",
    city: "beaune",
    date: "2026-06-08",
    time: "Mid-morning",
    title: "Hospices de Beaune",
    description:
      "The 15th-century Hôtel-Dieu, the iconic polychrome-tiled almshouse — audio-guided visit through the medieval wards, apothecary, and Last Judgement altarpiece.",
  },
  {
    id: "marche-aux-vins-jun-8",
    city: "beaune",
    date: "2026-06-08",
    time: "3:00 PM",
    title: "Marché aux Vins — Exclusive Tasting",
    description:
      "Guided tasting of 7 Burgundy wines (4 reds, 3 whites, 1 Grand Cru) in the candlelit cellars of the 14th-century Cordeliers Church.",
    bookingCode: "OS-9098755",
  },

  // ── Tuesday, June 9 — On to Lake Geneva ─────────────────────────────────
  {
    id: "jun-9-train",
    city: "lausanne",
    date: "2026-06-09",
    time: "Morning",
    title: "Train to Lake Geneva",
    description: "Through the Jura into the Alps.",
  },
  {
    id: "jun-9-explore",
    city: "lausanne",
    date: "2026-06-09",
    time: "Afternoon",
    title: "Explore the region",
    description: "First lakeside walks above the water.",
  },

  // ── Wednesday, June 10 — Lavaux & the lake ──────────────────────────────
  {
    id: "jun-10-lavaux",
    city: "lausanne",
    date: "2026-06-10",
    time: "Morning & afternoon",
    title: "Lavaux Vineyard Terraces",
    description: "Terraced vineyards stepping down to the lake.",
  },
  {
    id: "jun-10-dinner",
    city: "lausanne",
    date: "2026-06-10",
    time: "Evening",
    title: "Dinner with a view",
    description: "Watch the light cross the water.",
  },

  // ── Thursday, June 11 — Home ────────────────────────────────────────────
  {
    id: "jun-11-airport",
    city: "lausanne",
    date: "2026-06-11",
    time: "Morning",
    title: "Train to Geneva Airport",
    description: "The last train, then the long way west.",
  },
];

// ─── Reservations / wine tours — empty for now ──────────────────────────────

export const restaurants: Restaurant[] = [];
export const wineTours: WineTour[] = [];

