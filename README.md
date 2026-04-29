# Bella's Voyage

An eight-night journey through Paris, Beaune & Lausanne — June 3 – 11, 2026.

Live: https://bella-voyage.vercel.app
Welcome / gift page: https://bella-voyage.vercel.app/welcome

---

## Stack

- **Next.js 15** (App Router) + **TypeScript strict**
- **Tailwind CSS** — palette + typography wired through `tailwind.config.ts`
- **next/font** — Cormorant Garamond (serif), Manrope (sans), JetBrains Mono (mono)
- **Framer Motion** — restrained: hero reveals, scroll-fades, route transitions
- **Embla Carousel** — mobile photo galleries (grid on desktop)
- **Vercel** — auto-deploys every push to `main`

## Editing trip content

**All trip content lives in [`lib/trip-data.ts`](./lib/trip-data.ts).** Editing
this file is how the site changes — components don't need touching.

Sections render conditionally:

- **`flights`, `stays`, `timeline`** — the always-visible spine of the site.
- **`restaurants`, `activities`, `wineTours`** — auto-appear as new sections
  the moment they have at least one entry. Empty arrays don't render.

### Add a restaurant reservation (1-minute edit)

```ts
// lib/trip-data.ts
export const restaurants: Restaurant[] = [
  {
    id: "septime-jun-5",
    city: "paris",
    name: "Septime",
    date: "2026-06-05",
    time: "20:00",
    partySize: 2,
    reservationCode: "AB12CD",
    url: "https://septime-charonne.fr",
    notes: "Tasting menu only.  Cash gratuity preferred.",
  },
];
```

`git push` → Vercel deploys → it's live in ~60s.

### Add a wine tour

```ts
export const wineTours: WineTour[] = [
  {
    id: "drouhin-jun-9",
    city: "beaune",
    date: "2026-06-09",
    time: "10:30",
    domain: "Maison Joseph Drouhin",
    description: "Historic cellars under the old town, eight-vintage tasting.",
    meetingPoint: "7 Rue d'Enfer, Beaune",
    bookingCode: "MJD-2026-06-09",
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

`next/image` handles responsive sizing + lazy loading automatically.

## Local dev

```
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run build        # production build
```

## Visual rules (don't drift)

- Background palette stays light. `#f5efe2` paper, `#ebe2cf` warm,
  `#f9f4e8` bone for section breaks. Never go dark for backgrounds —
  the booked-stay cards are the only intentional dark moments.
- Cormorant Garamond ONLY for hero h1, section titles, stay/city names.
  Manrope for body, buttons, nav, descriptions. JetBrains Mono only for
  metadata (dates, codes, flight numbers).
- Every section header: gold rule + mono section number → Cormorant
  title with italic accent → Manrope subtitle at 70% ink opacity.
- Animations stay restrained: hero line reveals, fade-ups on scroll,
  smooth tab transitions. No hover bounces, no extra parallax.

## What's different from the source HTML

The source `bella-graduation-trip.html` is a single 1.5 MB file with 12
inline base64 images and CDN-loaded Google Fonts. The Next port:

- Splits content (typed) from chrome (components).
- Extracts images to `/public/images/{paris,beaune,lausanne}/` so
  `next/image` can do responsive sizing + lazy loading.
- Loads fonts via `next/font/google` instead of a CDN link tag (no
  render-blocking, font CSS is self-hosted on the deploy).
- Adds the `/welcome` gift route, OG / Twitter card metadata, and a
  proper favicon.
- Mobile fixes: hero `clamp(44px, 14vw, 72px)`, tab bar snap-scroll
  with active-tab autoscroll, dark Cities tab lightened to fix
  mobile readability, Embla carousels for stay galleries < 768px.
