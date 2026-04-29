"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { activities, cityMeta, type City } from "@/lib/trip-data";
import { formatLongDate } from "@/lib/format";
import { SectionHeader } from "./SectionHeader";
import { CityFilter } from "./CityFilter";

// Activities — same render shape as Restaurants, kept distinct so each
// section evolves independently (e.g. Activities may add tickets later).
// Auto-renders only when there's at least one entry.

export function ActivitiesSection() {
  if (activities.length === 0) return null;
  return <ActivitiesInner />;
}

function ActivitiesInner() {
  const cities = useMemo(
    () => Array.from(new Set(activities.map((a) => a.city))) as City[],
    []
  );
  const [filter, setFilter] = useState<City | "all">("all");
  const visible = useMemo(
    () =>
      filter === "all"
        ? activities
        : activities.filter((a) => a.city === filter),
    [filter]
  );

  return (
    <section
      id="activities"
      aria-label="Activities"
      className="bg-paper px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="07"
          eyebrow="Things to see"
          title={
            <>
              Tickets, <em className="italic text-gold">walks, hours.</em>
            </>
          }
          subtitle="A loose handful of timed entries — everything else is left to chance."
        />

        <CityFilter
          value={filter}
          onChange={setFilter}
          cities={cities}
          ariaLabel="Filter activities by city"
          className="mb-8 sm:mb-10"
        />

        <AnimatePresence mode="wait">
          <motion.ul
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 sm:gap-5 lg:grid-cols-3"
          >
            {visible.map((a, i) => (
              <motion.li
                key={a.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex flex-col border border-line bg-paper-bone p-6 transition-shadow hover:shadow-soft sm:p-7"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest3 text-gold">
                  {cityMeta[a.city].name}
                </p>
                <h3 className="mt-2 font-serif text-xl font-light leading-snug text-ink sm:text-2xl">
                  {a.title}
                </h3>
                {a.description ? (
                  <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink/70">
                    {a.description}
                  </p>
                ) : null}

                <div className="mt-auto pt-5">
                  {a.date || a.time ? (
                    <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/65">
                      {a.date ? formatLongDate(a.date) : null}
                      {a.date && a.time ? " · " : null}
                      {a.time ?? null}
                    </p>
                  ) : null}

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line/70 pt-3">
                    {a.bookingCode ? (
                      <p className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
                        {a.bookingCode}
                      </p>
                    ) : null}
                    {a.url ? (
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="ml-auto inline-flex items-center gap-2 border-b border-gold/50 pb-0.5 font-mono text-[10px] uppercase tracking-widest3 text-ink/70 transition-colors hover:text-ink focus-visible:text-ink"
                      >
                        <span>Site</span>
                        <span aria-hidden className="font-serif italic text-gold">
                          →
                        </span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}
