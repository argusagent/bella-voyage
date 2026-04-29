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
    eyebrow: "A seven-night journey",
    title: { lines: ["Paris,", "Beaune &", "Lausanne"], italicWord: "&" },
    sub: "Three cities, in early June.",
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
    id: "outbound-jfk-cdg",
    airline: "Delta Air Lines",
    flightNumber: "DL 264",
    origin: { code: "JFK", name: "New York · John F. Kennedy" },
    destination: { code: "CDG", name: "Paris · Charles de Gaulle" },
    departISO: "2026-06-03T19:30:00-04:00",
    arriveISO: "2026-06-04T08:55:00+02:00",
    cabin: "Delta One",
    confirmation: "JTRX9P",
    notes: "Window seats 2A · 2B. Lounge access at JFK Terminal 4.",
  },
  {
    id: "return-gva-jfk",
    airline: "Swiss International",
    flightNumber: "LX 22",
    origin: { code: "GVA", name: "Geneva · Cointrin" },
    destination: { code: "JFK", name: "New York · John F. Kennedy" },
    departISO: "2026-06-11T13:25:00+02:00",
    arriveISO: "2026-06-11T16:40:00-04:00",
    cabin: "Business",
    confirmation: "LX-44KQ7B",
    notes: "Train from Lausanne to GVA leaves 10:14 — platform 5.",
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
      "Late afternoon at JFK, then the long quiet eastward — the trip begins above the Atlantic.",
    highlights: [
      "Lounge at JFK · Terminal 4",
      "DL 264 · 19:30 departure",
      "Sleep over Newfoundland",
    ],
  },
  {
    date: "2026-06-04",
    city: "paris",
    title: "Arrive in Paris",
    description:
      "Morning landing. Slow walk into the 2nd, drop bags at the hotel, then a long lunch in the courtyard. The afternoon is yours.",
    highlights: [
      "Arrival 08:55 · CDG Terminal 2E",
      "Hotel des Grands Boulevards · early check-in held",
      "Optional walk: Palais Royal → Tuileries",
    ],
  },
  {
    date: "2026-06-05",
    city: "paris",
    title: "Le Marais & the river",
    description:
      "An untimed day: morning markets in the Marais, afternoon along the Seine, dinner in the 11th.",
    highlights: [
      "Place des Vosges, mid-morning",
      "Île Saint-Louis · Berthillon",
      "Dinner held — see Restaurants",
    ],
  },
  {
    date: "2026-06-06",
    city: "paris",
    title: "Saint-Germain & the gardens",
    description:
      "Left bank slow-walk. The Luxembourg Gardens, an old bookstore or two, a long table for dinner.",
    highlights: [
      "Musée d'Orsay · timed entry",
      "Jardin du Luxembourg",
      "Sunset along Quai Voltaire",
    ],
  },
  {
    date: "2026-06-07",
    city: "beaune",
    title: "TGV south to Beaune",
    description:
      "Late morning train from Gare de Lyon, stepping off into the Côte d'Or by lunch. The vineyards begin at the edge of town.",
    highlights: [
      "TGV 6707 · Paris GdL → Beaune · 11:24",
      "Check-in: L'Hôtel de Beaune",
      "Walk the ramparts before dinner",
    ],
  },
  {
    date: "2026-06-08",
    city: "beaune",
    title: "Côte de Beaune, end-to-end",
    description:
      "A car-free day driving the great vineyards south of town — Pommard, Volnay, Meursault — with lunch among the vines.",
    highlights: [
      "Hospices de Beaune, morning",
      "Vineyard tour · see Wine Tours",
      "Dinner back in town, late",
    ],
  },
  {
    date: "2026-06-09",
    city: "lausanne",
    title: "On to Lausanne",
    description:
      "Morning train through the Jura, lake on the right hand. Afternoon arrival, then the long terrace at the Beau-Rivage as the light turns.",
    highlights: [
      "TGV Lyria · Beaune → Lausanne · 11:18",
      "Check-in: Beau-Rivage Palace",
      "Aperitif on the Anchor terrace",
    ],
  },
  {
    date: "2026-06-10",
    city: "lausanne",
    title: "Lake day",
    description:
      "A full day on the water — a CGN steamer to the vineyards of Lavaux, a vertical walk through Saint-Saphorin, dinner back in town.",
    highlights: [
      "CGN Belle Époque steamer to Cully",
      "Lavaux terraces walk",
      "Sunset on the lake",
    ],
  },
  {
    date: "2026-06-11",
    city: "lausanne",
    title: "Home",
    description:
      "An early lake breakfast, a short ride to Geneva, and the long flight west. Back in New York by late afternoon.",
    highlights: [
      "Train Lausanne → GVA · 10:14",
      "LX 22 · 13:25 departure",
      "Arrive JFK · 16:40",
    ],
  },
];

// ─── Auto-appearing sections — populate when bookings exist ─────────────────

export const restaurants: Restaurant[] = [
  {
    id: "septime-jun-5",
    city: "paris",
    name: "Septime",
    date: "2026-06-05",
    time: "20:30",
    partySize: 2,
    reservationCode: "SEP-26-0605-BV",
    url: "https://septime-charonne.fr",
    notes: "Tasting menu only · cash gratuity preferred.",
  },
  {
    id: "clamato-jun-6",
    city: "paris",
    name: "Clamato",
    date: "2026-06-06",
    time: "13:00",
    partySize: 2,
    url: "https://septime-charonne.fr/clamato",
    notes: "No reservations — go right at noon.",
  },
  {
    id: "frenchie-jun-6",
    city: "paris",
    name: "Frenchie",
    date: "2026-06-06",
    time: "20:00",
    partySize: 2,
    reservationCode: "FR-2606-2A",
    url: "https://frenchie-restaurant.com",
  },
  {
    id: "ma-cuisine-jun-7",
    city: "beaune",
    name: "Ma Cuisine",
    date: "2026-06-07",
    time: "20:00",
    partySize: 2,
    reservationCode: "MAC-77-21",
    notes: "House classics; the wine list is the city's deepest.",
  },
  {
    id: "lecrit-vin-jun-8",
    city: "beaune",
    name: "L'Écrit-Vin",
    date: "2026-06-08",
    time: "20:30",
    partySize: 2,
    reservationCode: "EV-080626",
  },
  {
    id: "anne-sophie-pic-jun-10",
    city: "lausanne",
    name: "Anne-Sophie Pic au Beau-Rivage",
    date: "2026-06-10",
    time: "19:30",
    partySize: 2,
    reservationCode: "BRP-ASP-6101926",
    url: "https://brp.ch/restaurants/anne-sophie-pic",
    notes: "Jacket recommended · arrive for the lake light.",
  },
];

export const activities: Activity[] = [
  {
    id: "orsay-jun-6",
    city: "paris",
    date: "2026-06-06",
    time: "10:00",
    title: "Musée d'Orsay · timed entry",
    description: "The Impressionist galleries, top floor — quiet hour just after open.",
    bookingCode: "ORS-2026-06-06-1000",
    url: "https://musee-orsay.fr",
  },
  {
    id: "hospices-jun-8",
    city: "beaune",
    date: "2026-06-08",
    time: "09:30",
    title: "Hospices de Beaune",
    description: "The polychrome roof, the great hall, and the wine the foundation still pours.",
    bookingCode: "HOSP-26-0608",
    url: "https://hospices-de-beaune.com",
  },
  {
    id: "cgn-lavaux-jun-10",
    city: "lausanne",
    date: "2026-06-10",
    time: "10:45",
    title: "CGN Belle Époque · Ouchy → Cully",
    description: "Restored 1908 paddle-steamer along the Lavaux terraces.",
    bookingCode: "CGN-VEV-26100610",
    url: "https://cgn.ch",
  },
];

export const wineTours: WineTour[] = [
  {
    id: "drouhin-jun-8",
    city: "beaune",
    date: "2026-06-08",
    time: "10:30",
    domain: "Maison Joseph Drouhin",
    description:
      "Two hours through the historic cellars under the old town — eight vintages, walking south from the Roman walls.",
    meetingPoint: "7 Rue d'Enfer · Beaune",
    bookingCode: "MJD-2026-06-08",
    url: "https://drouhin.com",
  },
  {
    id: "domaine-leflaive-jun-8",
    city: "beaune",
    date: "2026-06-08",
    time: "15:00",
    domain: "Domaine Leflaive · Puligny-Montrachet",
    description:
      "Afternoon in Puligny with the next-generation team — a vertical of Chevalier and a long wander among the climats.",
    meetingPoint: "Place des Marronniers · Puligny-Montrachet",
    bookingCode: "DL-PM-26-0608",
    url: "https://leflaive.fr",
  },
];
