# Bella's Graduation Voyage

Seven nights, three cities — Paris, Beaune & Lausanne, June 3 – 11, 2026.

Live: https://bella-voyage.vercel.app

| Route          | What it is                                                       |
| -------------- | ---------------------------------------------------------------- |
| `/`            | The QR-target landing — vineyard hero, countdown, single CTA     |
| `/trip`        | Full itinerary site (Overview · Cities · Lodging · Flights · Itinerary) |

---

## Stack

- **Next.js 15** (App Router) + **TypeScript strict**
- **Tailwind CSS** — palette + typography wired through `tailwind.config.ts`
- **next/font** — Cormorant Garamond (serif), Manrope (sans), JetBrains Mono (mono)
- **Framer Motion** — restrained: hero reveals, scroll-fades, route transitions
- **Embla Carousel** — mobile photo galleries (grid on desktop)
- **Vercel** — auto-deploys every push to `master`

## Editing trip content

**All trip content lives in [`lib/trip-data.ts`](./lib/trip-data.ts).** Editing
this file is how the site changes — components don't need touching.

The `/trip` page renders five sections, in order:

| Section       | Drives from                            | Notes                                                                            |
| ------------- | -------------------------------------- | -------------------------------------------------------------------------------- |
| Overview      | `trip`, `flights`, `stays`, `timeline` | At-a-glance stats + the route ribbon (Air → Rail → Rail → Air)                  |
| Cities        | `cityMeta`, `stays`                    | Three cards; tapping a card deep-scrolls to that city's room in Lodging          |
| Lodging       | `stays`                                | One expanded card per hotel — Embla on mobile, grid on desktop, gradient placeholders if no images |
| Flights       | `flights`                              | Boarding-pass cards, mobile-stacks vertically                                    |
| Itinerary     | `timeline` + `restaurants` + `activities` + `wineTours` | Each day expandable; restaurants/activities/wine tours fold in **by date** as Tables / Sights / Vineyards subgroups |

Sections render conditionally — empty arrays mean nothing shows up, and
the TabNav drops the corresponding tab too. The Countdown pill in the
sticky tab bar derives its label from `trip.startDate` / `trip.endDate`.

### Add a restaurant reservation (1-minute edit)

```ts
// lib/trip-data.ts
export const restaurants: Restaurant[] = [
  {
    id: "septime-jun-5",
    city: "paris",
    name: "Septime",
    date: "2026-06-05",   // ← join key with the Itinerary day
    time: "20:00",
    partySize: 2,
    reservationCode: "AB12CD",
    url: "https://septime-charonne.fr",
    notes: "Tasting menu only.  Cash gratuity preferred.",
  },
];
```

`git push` → Vercel deploys → it's live in ~60s, and the new card appears
under "Tables" inside the Jun 5 expansion of the Itinerary tab.

### Add a wine tour

```ts
export const wineTours: WineTour[] = [
  {
    id: "drouhin-jun-8",
    city: "beaune",
    date: "2026-06-08",
    time: "10:30",
    domain: "Maison Joseph Drouhin",
    description: "Historic cellars under the old town, eight-vintage tasting.",
    meetingPoint: "7 Rue d'Enfer, Beaune",
    bookingCode: "MJD-2026-06-08",
    url: "https://drouhin.com",
  },
];
```

### Add photos to a stay

```ts
// Drop the file in public/images/paris/   (or beaune/, lausanne/)
// Then reference it:
images: [
  { src: "/images/paris/lobby.jpg", alt: "Marble lobby", width: 1600, height: 1067 },
  ...
]
```

When `images` is empty, the card renders a city-tinted gradient
placeholder so the page never feels broken.

## Local dev

```
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run build        # production build
```

## Visual rules (don't drift)

- Background palette stays light. `#f5efe2` paper, `#ebe2cf` warm,
  `#f9f4e8` bone for section breaks. The Landing's vineyard background
  is the only intentional moment of darker tone — and it sits behind a
  paper wash so text always reads.
- Cormorant Garamond ONLY for hero h1, section titles, stay/city names.
  Manrope for body, buttons, nav, descriptions. JetBrains Mono only for
  metadata (dates, codes, flight numbers).
- Every section header: gold rule + mono section number → Cormorant
  title with italic accent → Manrope subtitle at ~70% ink opacity.
- Animations stay restrained: hero line reveals, fade-ups on scroll,
  smooth tab transitions. No hover bounces, no extra parallax.

## Interactivity guarantees

- Tap targets ≥ 44px on mobile.
- Focus-visible outlines via the global `:focus-visible` rule.
- ARIA on tabs, expandable rows, the live countdown.
- Touch carousels use `touch-pan-y` so vertical scroll passes through.
- All animations honor `prefers-reduced-motion`.

## Countdown

The pill in the trip-page tab bar (and the big number on the Landing)
both come from `lib/countdown.ts`, which derives one of three states
from `new Date()`:

| Phase    | Trigger                       | Pill copy           |
| -------- | ----------------------------- | ------------------- |
| `before` | today < `trip.startDate`      | `35 days away`      |
| `live`   | start ≤ today ≤ end           | `Day 4 of 9`        |
| `after`  | today > `trip.endDate`        | `home`              |

State recomputes every 60 minutes so a session left open over midnight
rolls forward correctly.
