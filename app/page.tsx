import Link from "next/link";
import { VineyardBackground } from "@/components/VineyardBackground";
import { Countdown } from "@/components/Countdown";
import { trip, cityMeta, type City } from "@/lib/trip-data";

// Landing page — what the QR code opens.  Full-viewport vineyard scene
// with the trip's high-level signal: title, stats, the city-stack with
// countries, a countdown, and a single quiet CTA into the full site.
//
// The layout is mobile-first: clamp-typography for the title, a stacked
// city flow on small screens, and a horizontal arrow flow on `sm+`.

export const metadata = {
  title: "Bella's Graduation Voyage",
  description:
    "An eight-night graduation journey through Paris, Beaune & Lausanne — June 2026.",
};

const cityFlow: { city: City; label: string; country: string }[] = [
  { city: "paris", label: "Paris", country: "France" },
  { city: "beaune", label: "Beaune", country: "Burgundy · France" },
  { city: "lausanne", label: "Lausanne", country: "Switzerland" },
];

export default function Landing() {
  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden bg-paper">
      <VineyardBackground intensity={0.55} />

      {/* Top corner: tiny eyebrow brand mark */}
      <div className="relative z-10 flex items-start justify-between px-6 pt-8 sm:px-10 sm:pt-10">
        <div className="flex items-center gap-3">
          <span className="block h-px w-8 bg-gold/80" />
          <span className="font-mono text-[10px] uppercase tracking-widest3 text-ink/75">
            Bella&rsquo;s <em className="font-serif italic text-gold not-italic">voyage</em>
          </span>
        </div>
        <Countdown variant="pill" />
      </div>

      {/* Center: hero copy */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-12 text-center sm:px-10">
        <p className="font-mono text-[10px] uppercase tracking-widest3 text-ink/65 sm:text-[11px]">
          June 3 – 11, 2026
        </p>

        <h1 className="mt-6 font-serif text-[clamp(40px,11vw,84px)] font-light leading-[0.98] tracking-tight text-ink sm:mt-8">
          Bella&rsquo;s Graduation
          <span className="block italic text-gold">Voyage</span>
        </h1>

        <p className="mx-auto mt-5 max-w-md font-serif text-lg italic font-light text-ink/85 sm:mt-7 sm:text-xl">
          Three cities, in early June.
        </p>

        {/* Stats row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-widest3 text-ink/65 sm:mt-10 sm:gap-x-8 sm:text-[11px]">
          <span>{trip.nights} Nights</span>
          <span aria-hidden className="block h-3 w-px bg-ink/20" />
          <span>{trip.cities.length} Cities</span>
          <span aria-hidden className="block h-3 w-px bg-ink/20" />
          <span>2 Flights</span>
        </div>

        {/* City flow with country subtitles */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4 sm:mt-14 sm:flex-row sm:justify-center sm:gap-2">
          {cityFlow.map((c, i) => (
            <div key={c.city} className="contents">
              <div className="flex flex-col items-center">
                <span className="font-serif text-[clamp(28px,5.5vw,40px)] font-light leading-none text-ink">
                  {c.label}
                </span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
                  {c.country}
                </span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-widest3 text-gold/85">
                  {cityMeta[c.city].nights} {cityMeta[c.city].nights === 1 ? "night" : "nights"}
                </span>
              </div>
              {i < cityFlow.length - 1 ? (
                <span
                  aria-hidden
                  className="font-serif text-2xl italic text-gold/70 sm:text-3xl"
                >
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>

        {/* Countdown statement */}
        <div className="mt-12 sm:mt-16">
          <Countdown variant="statement" />
        </div>

        {/* CTA */}
        <Link
          href="/trip"
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-ink/85 bg-ink px-6 py-3 font-mono text-[11px] uppercase tracking-widest2 text-paper transition-all duration-300 hover:border-gold hover:bg-ink/90 hover:shadow-soft focus-visible:border-gold sm:mt-14 sm:px-8 sm:py-4 sm:text-xs"
        >
          <span>See trip details</span>
          <span
            aria-hidden
            className="font-serif italic text-gold-glow transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>

      {/* Bottom: quiet credits / dedication */}
      <div className="relative z-10 px-6 pb-8 text-center sm:px-10 sm:pb-10">
        <p className="font-serif text-sm italic font-light text-ink/65 sm:text-base">
          For Bella — congratulations.
        </p>
      </div>
    </main>
  );
}
