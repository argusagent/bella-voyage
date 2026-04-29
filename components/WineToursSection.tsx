"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { wineTours, cityMeta, type City } from "@/lib/trip-data";
import { formatLongDate } from "@/lib/format";
import { SectionHeader } from "./SectionHeader";
import { CityFilter } from "./CityFilter";

// Wine tours — auto-renders only when there's at least one entry.  A
// little more romantic than Activities: each card has a quote-mark
// flourish and the domain name set in display serif.

export function WineToursSection() {
  if (wineTours.length === 0) return null;
  return <WineToursInner />;
}

function WineToursInner() {
  const cities = useMemo(
    () => Array.from(new Set(wineTours.map((w) => w.city))) as City[],
    []
  );
  const [filter, setFilter] = useState<City | "all">("all");
  const visible = useMemo(
    () =>
      filter === "all"
        ? wineTours
        : wineTours.filter((w) => w.city === filter),
    [filter]
  );

  return (
    <section
      id="wine"
      aria-label="Wine tours"
      className="bg-paper-warm px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="08"
          eyebrow="In the cellars"
          title={
            <>
              Vineyards, <em className="italic text-gold">at scale.</em>
            </>
          }
          subtitle="A short list of estates that opened their doors — Burgundy on the west side of the trip."
        />

        <CityFilter
          value={filter}
          onChange={setFilter}
          cities={cities}
          ariaLabel="Filter wine tours by city"
          className="mb-8 sm:mb-10"
        />

        <AnimatePresence mode="wait">
          <motion.ul
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-5 sm:gap-6 md:grid-cols-2"
          >
            {visible.map((w, i) => (
              <motion.li
                key={w.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative border border-line bg-paper p-7 transition-shadow hover:shadow-soft sm:p-9"
              >
                {/* Decorative gold corner */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-5 top-5 font-serif text-3xl italic text-gold/30"
                >
                  ❦
                </span>

                <p className="font-mono text-[10px] uppercase tracking-widest3 text-gold">
                  {cityMeta[w.city].name}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-light leading-tight text-ink sm:text-3xl">
                  {w.domain}
                </h3>

                {w.description ? (
                  <p className="mt-4 font-serif text-base italic font-light leading-relaxed text-ink/80">
                    {w.description}
                  </p>
                ) : null}

                <dl className="mt-6 grid gap-y-2 border-t border-line/70 pt-4 text-sm sm:grid-cols-[max-content_1fr] sm:gap-x-6">
                  {w.date || w.time ? (
                    <>
                      <dt className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
                        When
                      </dt>
                      <dd className="font-sans text-ink/85">
                        {w.date ? formatLongDate(w.date) : null}
                        {w.date && w.time ? " · " : null}
                        {w.time ?? null}
                      </dd>
                    </>
                  ) : null}
                  {w.meetingPoint ? (
                    <>
                      <dt className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
                        Meet
                      </dt>
                      <dd className="font-sans text-ink/85">{w.meetingPoint}</dd>
                    </>
                  ) : null}
                  {w.bookingCode ? (
                    <>
                      <dt className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
                        Code
                      </dt>
                      <dd className="font-mono text-xs uppercase tracking-widest2 text-ink/85">
                        {w.bookingCode}
                      </dd>
                    </>
                  ) : null}
                </dl>

                {w.url ? (
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-5 inline-flex w-fit items-center gap-2 border-b border-gold/60 pb-1 font-sans text-xs uppercase tracking-widest2 text-ink transition-colors hover:text-gold focus-visible:text-gold"
                  >
                    <span>Estate</span>
                    <span aria-hidden className="font-serif italic text-gold">
                      →
                    </span>
                  </a>
                ) : null}
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}
