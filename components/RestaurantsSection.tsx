"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { restaurants, cityMeta, type City } from "@/lib/trip-data";
import { formatLongDate, cn } from "@/lib/format";
import { SectionHeader } from "./SectionHeader";
import { CityFilter } from "./CityFilter";

// Restaurants — auto-renders only when there's at least one entry.
// Filterable by city (radio pills).  Each card animates in when the
// filter changes; layout is mobile-first stacked, two-column on `md+`.

export function RestaurantsSection() {
  if (restaurants.length === 0) return null;
  return <RestaurantsInner />;
}

function RestaurantsInner() {
  const cities = useMemo(
    () =>
      Array.from(
        new Set(restaurants.map((r) => r.city))
      ) as City[],
    []
  );

  const [filter, setFilter] = useState<City | "all">("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? restaurants
        : restaurants.filter((r) => r.city === filter),
    [filter]
  );

  return (
    <section
      id="restaurants"
      aria-label="Restaurants"
      className="bg-paper-bone px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="06"
          eyebrow="The tables"
          title={
            <>
              Tables <em className="italic text-gold">held.</em>
            </>
          }
          subtitle="The dinners (and one or two long lunches) on the calendar."
        />

        <CityFilter
          value={filter}
          onChange={setFilter}
          cities={cities}
          ariaLabel="Filter restaurants by city"
          className="mb-8 sm:mb-10"
        />

        <AnimatePresence mode="wait">
          <motion.ul
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 sm:gap-5 md:grid-cols-2"
          >
            {visible.map((r, i) => (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="border border-line bg-paper p-6 transition-shadow hover:shadow-soft sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-widest3 text-gold">
                      {cityMeta[r.city].name}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-light leading-tight text-ink sm:text-[28px]">
                      {r.name}
                    </h3>
                  </div>
                  {r.partySize ? (
                    <span className="shrink-0 border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-widest2 text-ink/60">
                      Party of {r.partySize}
                    </span>
                  ) : null}
                </div>

                {r.date || r.time ? (
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest2 text-ink/65">
                    {r.date ? formatLongDate(r.date) : null}
                    {r.date && r.time ? " · " : null}
                    {r.time ?? null}
                  </p>
                ) : null}

                {r.notes ? (
                  <p className="mt-3 font-serif text-base italic font-light text-ink/75">
                    {r.notes}
                  </p>
                ) : null}

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/70 pt-4">
                  {r.reservationCode ? (
                    <p className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
                      Code · {r.reservationCode}
                    </p>
                  ) : null}
                  {r.url ? (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={cn(
                        "ml-auto inline-flex items-center gap-2 border-b border-gold/50 pb-0.5",
                        "font-mono text-[10px] uppercase tracking-widest3 text-ink/70",
                        "transition-colors hover:text-ink focus-visible:text-ink"
                      )}
                    >
                      <span>Site</span>
                      <span aria-hidden className="font-serif italic text-gold">
                        →
                      </span>
                    </a>
                  ) : null}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {visible.length === 0 ? (
          <p className="py-10 text-center font-serif text-lg italic text-ink/60">
            Nothing in {cityMeta[filter as City].name} yet.
          </p>
        ) : null}
      </div>
    </section>
  );
}
