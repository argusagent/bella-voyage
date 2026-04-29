"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cityMeta, stays, type City } from "@/lib/trip-data";
import { formatRangeShort, cn } from "@/lib/format";
import { SectionHeader } from "./SectionHeader";

// Cities — the three-card overview.  Each card is a button (focusable,
// keyboard-activatable, full-width tap target) that smooth-scrolls to its
// stay anchor on the Stays section.  Cards stagger-fade-up on scroll.
//
// Mobile: stacked vertically full-width.  Desktop: 3-column grid with
// equal heights and a hover lift.  All interactions tap-friendly:
// >= 44px hit targets, no hover-only state.

const ORDER: City[] = ["paris", "beaune", "lausanne"];

export function CitiesSection() {
  const [hovered, setHovered] = useState<City | null>(null);

  const goToStay = (city: City) => {
    const stay = stays.find((s) => s.city === city);
    if (!stay) return;
    const el = document.getElementById(`stay-${city}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#stay-${city}`);
    }
  };

  return (
    <section
      id="cities"
      aria-label="The cities"
      className="bg-paper px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="01"
          eyebrow="The cities"
          title={
            <>
              Three places, <em className="italic text-gold">in order.</em>
            </>
          }
          subtitle="Each is short by design — long enough to settle, short enough that the next morning still feels like an opening, not a routine."
        />

        <ul className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {ORDER.map((city, idx) => {
            const m = cityMeta[city];
            const stay = stays.find((s) => s.city === city);
            const range = stay
              ? formatRangeShort(stay.checkInISO, stay.checkOutISO)
              : null;

            return (
              <motion.li
                key={city}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.9,
                  ease: [0.2, 0.8, 0.2, 1],
                  delay: idx * 0.12,
                }}
              >
                <button
                  type="button"
                  onClick={() => goToStay(city)}
                  onMouseEnter={() => setHovered(city)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(city)}
                  onBlur={() => setHovered(null)}
                  aria-label={`${m.name} · ${m.nights} nights · view stay`}
                  className={cn(
                    "group relative flex w-full flex-col text-left",
                    "min-h-[280px] overflow-hidden border border-line bg-paper-bone",
                    "p-7 sm:min-h-[420px] sm:p-9",
                    "transition-all duration-500 ease-out",
                    "hover:-translate-y-1 hover:border-gold/60 hover:shadow-soft",
                    "focus-visible:-translate-y-1 focus-visible:border-gold/80"
                  )}
                >
                  {/* Accent rule that draws on hover/focus */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-7 top-0 h-px origin-left bg-gold transition-transform duration-700 ease-out sm:inset-x-9",
                      hovered === city ? "scale-x-100" : "scale-x-0"
                    )}
                  />

                  {/* Top: index + range */}
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55 sm:text-[11px]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {range ? (
                      <span className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55 sm:text-[11px]">
                        {range}
                      </span>
                    ) : null}
                  </div>

                  {/* City name */}
                  <h3 className="mt-10 font-serif text-[clamp(36px,7vw,56px)] font-light leading-none tracking-tight text-ink sm:mt-14">
                    {m.name}
                  </h3>
                  <p className="mt-2 font-sans text-[11px] uppercase tracking-widest2 text-ink/50">
                    {m.country} · {m.nights} {m.nights === 1 ? "night" : "nights"}
                  </p>

                  {/* Blurb */}
                  <p className="mt-6 font-serif text-base italic font-light leading-relaxed text-ink/75 sm:mt-8 sm:text-lg">
                    {m.blurb}
                  </p>

                  {/* Footer cue */}
                  <div className="mt-auto pt-8 sm:pt-10">
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest2 transition-colors",
                        hovered === city ? "text-ink" : "text-ink/60"
                      )}
                    >
                      <span>View the stay</span>
                      <span
                        aria-hidden
                        className="font-serif italic text-gold transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
