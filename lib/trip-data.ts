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
  origin: { code: string; name: string; timeZone: string };
  destination: { code: string; name: string; timeZone: string };
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
    origin: { code: "IND", name: "Indianapolis", timeZone: "America/Indiana/Indianapolis" },
    destination: { code: "DTW", name: "Detroit", timeZone: "America/Detroit" },
    departISO: "2026-06-03T15:59:00-04:00",
    arriveISO: "2026-06-03T17:10:00-04:00",
  },
  {
    id: "out-dtw-cdg",
    airline: "Delta",
    flightNumber: "DL 228",
    origin: { code: "DTW", name: "Detroit", timeZone: "America/Detroit" },
    destination: { code: "CDG", name: "Paris · Charles de Gaulle", timeZone: "Europe/Paris" },
    departISO: "2026-06-03T18:30:00-04:00",
    arriveISO: "2026-06-04T08:40:00+02:00",
  },
  {
    id: "rtn-gva-lhr",
    airline: "American Airlines",
    flightNumber: "AA 6872",
    origin: { code: "GVA", name: "Geneva", timeZone: "Europe/Zurich" },
    destination: { code: "LHR", name: "London · Heathrow", timeZone: "Europe/London" },
    departISO: "2026-06-11T10:10:00+02:00",
    arriveISO: "2026-06-11T10:55:00+01:00",
  },
  {
    id: "rtn-lhr-ord",
    airline: "American Airlines",
    flightNumber: "AA 7017",
    origin: { code: "LHR", name: "London · Heathrow", timeZone: "Europe/London" },
    destination: { code: "ORD", name: "Chicago · O'Hare", timeZone: "America/Chicago" },
    departISO: "2026-06-11T13:10:00+01:00",
    arriveISO: "2026-06-11T15:55:00-05:00",
  },
  {
    id: "rtn-ord-ind",
    airline: "American Airlines",
    flightNumber: "AA 1951",
    origin: { code: "ORD", name: "Chicago · O'Hare", timeZone: "America/Chicago" },
    destination: { code: "IND", name: "Indianapolis", timeZone: "America/Indiana/Indianapolis" },
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
    images: [
      { src: "/images/paris/airbnb-1.jpg", alt: "Studio with bed, kitchenette, and balcony doors", width: 1067, height: 800 },
      { src: "/images/paris/airbnb-2.jpg", alt: "Dining nook by the balcony window", width: 640, height: 480 },
      { src: "/images/paris/airbnb-3.jpg", alt: "Balcony looking out over Levallois-Perret", width: 1280, height: 960 },
      { src: "/images/paris/airbnb-4.jpg", alt: "Marble bathroom with walk-in shower", width: 1280, height: 960 },
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
    images: [
      { src: "/images/beaune/airbnb-1.jpg", alt: "Loft living area with stone alcove and wood-beam wall", width: 540, height: 405 },
      { src: "/images/beaune/airbnb-2.jpg", alt: "Rooftop view of a Beaune street and tower", width: 1440, height: 1080 },
      { src: "/images/beaune/airbnb-3.jpg", alt: "Loft sitting nook under a skylight with a small fireplace", width: 1080, height: 810 },
      { src: "/images/beaune/airbnb-4.jpg", alt: "Bathroom with corner tub under the eaves", width: 1440, height: 1080 },
    ],
  },
  {
    id: "stay-lausanne",
    city: "lausanne",
    name: "Hôtel Lavaux",
    checkInISO: "2026-06-09",
    checkOutISO: "2026-06-11",
    address: "Rte Cantonale 1 · 1096 Cully · Switzerland",
    blurb:
      "Lakefront for the final two nights. A balcony room facing the Alps across Geneva.",
    images: [
      { src: "/images/lausanne/hotel-1.jpg", alt: "Room with lake and Alps through floor-to-ceiling windows", width: 789, height: 592 },
      { src: "/images/lausanne/hotel-2.jpg", alt: "Private terrace overlooking Lake Geneva", width: 847, height: 635 },
      { src: "/images/lausanne/hotel-3.jpg", alt: "Bedroom interior in soft neutral tones", width: 789, height: 592 },
      { src: "/images/lausanne/hotel-4.jpg", alt: "Terrace seating facing the Alps across the lake", width: 781, height: 586 },
    ],
  },
];

// ─── Day-by-day timeline ────────────────────────────────────────────────────
//
// Each entry: a title, an optional `images` array for the swipeable photo
// strip, and the per-day activities live in the `activities` array below
// keyed by date.  Drop JPGs into public/images/days/ to surface them.

export const timeline: TimelineEntry[] = [
  {
    date: "2026-06-03",
    city: "paris",
    title: "Wheels up",
    images: [
      {
        src: "/images/days/jun-03-travel.jpg",
        alt: "Plane wing over Paris with the Eiffel Tower on the horizon",
        width: 768,
        height: 576,
      },
    ],
  },
  {
    date: "2026-06-04",
    city: "paris",
    title: "Arrive in Paris",
    images: [
      {
        src: "/images/days/jun-04-eiffel.jpg",
        alt: "Eiffel Tower at dusk",
        width: 1439,
        height: 1079,
      },
    ],
  },
  {
    date: "2026-06-05",
    city: "paris",
    title: "Versailles",
    images: [
      {
        src: "/images/days/jun-05-versailles.jpg",
        alt: "Palace of Versailles above the parterre gardens",
        width: 1600,
        height: 1200,
      },
    ],
  },
  {
    date: "2026-06-06",
    city: "paris",
    title: "Paris in full",
    images: [
      {
        src: "/images/days/jun-06-montmartre.jpg",
        alt: "Sacré-Cœur on Montmartre at dusk",
        width: 1600,
        height: 1200,
      },
    ],
  },
  {
    date: "2026-06-07",
    city: "beaune",
    title: "South to Beaune",
    images: [
      {
        src: "/images/days/jun-07-beaune.jpg",
        alt: "Vineyards above Beaune at golden hour",
        width: 1440,
        height: 1080,
      },
    ],
  },
  {
    date: "2026-06-08",
    city: "beaune",
    title: "Côte de Beaune",
    images: [
      {
        src: "/images/days/jun-08-wine-tasting.jpg",
        alt: "Burgundy wine cellar tasting room",
        width: 911,
        height: 683,
      },
    ],
  },
  {
    date: "2026-06-09",
    city: "lausanne",
    title: "On to Lake Geneva",
    images: [
      {
        src: "/images/days/jun-09-geneva.jpg",
        alt: "Lake Geneva from a hillside village",
        width: 1133,
        height: 850,
      },
    ],
  },
  {
    date: "2026-06-10",
    city: "lausanne",
    title: "Lavaux & the lake",
    images: [
      {
        src: "/images/days/jun-10-lavaux.jpg",
        alt: "Lavaux vineyard terraces stepping down to Lake Geneva",
        width: 479,
        height: 359,
      },
    ],
  },
  {
    date: "2026-06-11",
    city: "lausanne",
    title: "Home",
    images: [
      {
        src: "/images/days/jun-11-train.jpg",
        alt: "Swiss regional train winding through Lavaux vineyards",
        width: 1600,
        height: 1200,
      },
    ],
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
  },
  {
    id: "jun-4-arc",
    city: "paris",
    date: "2026-06-04",
    time: "Afternoon",
    title: "Champs-Élysées & Arc de Triomphe",
  },
  {
    id: "jun-4-eiffel",
    city: "paris",
    date: "2026-06-04",
    time: "Evening",
    title: "Eiffel Tower & dinner",
  },

  // ── Friday, June 5 — Versailles ─────────────────────────────────────────
  {
    id: "jun-5-cafe",
    city: "paris",
    date: "2026-06-05",
    time: "Morning",
    title: "Café & train to Versailles",
  },
  {
    id: "jun-5-palace",
    city: "paris",
    date: "2026-06-05",
    time: "Noon",
    title: "Palace & gardens",
  },
  {
    id: "jun-5-dinner",
    city: "paris",
    date: "2026-06-05",
    time: "Evening",
    title: "Dinner in the 17ème",
  },

  // ── Saturday, June 6 — Paris in full ────────────────────────────────────
  {
    id: "jun-6-louvre",
    city: "paris",
    date: "2026-06-06",
    time: "Morning",
    title: "Louvre",
  },
  {
    id: "jun-6-notre-dame",
    city: "paris",
    date: "2026-06-06",
    time: "Afternoon",
    title: "Notre Dame & the Seine",
  },
  {
    id: "jun-6-montmartre",
    city: "paris",
    date: "2026-06-06",
    time: "Evening",
    title: "Montmartre & Sacré-Cœur",
  },

  // ── Sunday, June 7 — South to Beaune ────────────────────────────────────
  {
    id: "jun-7-tgv",
    city: "beaune",
    date: "2026-06-07",
    time: "Morning",
    title: "Train to Beaune",
  },
  {
    id: "jun-7-wander",
    city: "beaune",
    date: "2026-06-07",
    time: "Afternoon & evening",
    title: "Wander the old town — ramparts and the Hospices",
  },

  // ── Monday, June 8 — Côte de Beaune ─────────────────────────────────────
  {
    id: "bouche-jun-8",
    city: "beaune",
    date: "2026-06-08",
    time: "Morning",
    title: "Breakfast at Bouché",
  },
  {
    id: "hospices-jun-8",
    city: "beaune",
    date: "2026-06-08",
    time: "Mid-morning",
    title: "Hospices de Beaune",
  },
  {
    id: "marche-aux-vins-jun-8",
    city: "beaune",
    date: "2026-06-08",
    time: "3:00 PM",
    title: "Marché aux Vins — Exclusive Tasting",
    bookingCode: "OS-9098755",
  },

  // ── Tuesday, June 9 — On to Lake Geneva ─────────────────────────────────
  {
    id: "jun-9-train",
    city: "lausanne",
    date: "2026-06-09",
    time: "Morning",
    title: "Train to Lake Geneva",
  },
  {
    id: "jun-9-explore",
    city: "lausanne",
    date: "2026-06-09",
    time: "Afternoon",
    title: "Lakeside walks above the water",
  },

  // ── Wednesday, June 10 — Lavaux & the lake ──────────────────────────────
  {
    id: "jun-10-lavaux",
    city: "lausanne",
    date: "2026-06-10",
    time: "Morning & afternoon",
    title: "Lavaux Vineyard Terraces",
  },
  {
    id: "jun-10-dinner",
    city: "lausanne",
    date: "2026-06-10",
    time: "Evening",
    title: "Dinner with a view",
  },

  // ── Thursday, June 11 — Home ────────────────────────────────────────────
  {
    id: "jun-11-airport",
    city: "lausanne",
    date: "2026-06-11",
    time: "Morning",
    title: "Train to Geneva Airport",
  },
];

// ─── Reservations / wine tours — empty for now ──────────────────────────────

export const restaurants: Restaurant[] = [];
export const wineTours: WineTour[] = [];

