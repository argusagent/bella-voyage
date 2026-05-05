"use client";

import { motion } from "framer-motion";
import { timeline, cityMeta } from "@/lib/trip-data";
import {
  formatLongDate,
  formatDayNumber,
  formatWeekday,
} from "@/lib/format";
import { SectionHeader } from "./SectionHeader";

// Itinerary — a flat list of nine days.  Each row is non-interactive:
// date column, city eyebrow, title, one-line description.  No
// expansion, no nested groups.  Restaurants / activities / wine tours
// can be reintroduced later by editing this file alongside trip-data.

export function ItinerarySection() {
  if (timeline.length === 0) return null;

  return (
    <section
      id="itinerary"
      aria-label="Itinerary"
      className="bg-paper px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          number="04"
          eyebrow="Itinerary"
          title={
            <>
              Nine days, <em className="italic text-gold">unhurried.</em>
            </>
          }
        />

        <ol className="border-t border-line">
          {timeline.map((day, idx) => (
            <DayRow key={day.date} day={day} index={idx} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function DayRow({
  day,
  index,
}: {
  day: (typeof timeline)[number];
  index: number;
}) {
  const cityName = cityMeta[day.city].name;

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.4) }}
      className="flex items-start gap-4 border-b border-line py-5 sm:gap-8 sm:py-7"
    >
      <div className="flex shrink-0 flex-col items-center gap-1 pl-1 sm:w-28 sm:items-start sm:pl-2">
        <span className="font-mono text-[11px] uppercase tracking-widest3 text-ink/55">
          {formatWeekday(day.date)}
        </span>
        <span className="font-serif text-3xl font-light leading-none text-ink sm:text-4xl">
          {formatDayNumber(day.date)}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
          Jun
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="font-mono text-[11px] uppercase tracking-widest3 text-gold">
            {cityName}
          </p>
          <span aria-hidden className="block h-3 w-px bg-ink/15" />
          <p className="font-mono text-[11px] uppercase tracking-widest3 text-ink/55 sm:hidden">
            {formatLongDate(day.date).split(",")[0]}
          </p>
          <p className="hidden font-mono text-[11px] uppercase tracking-widest3 text-ink/55 sm:block">
            {formatLongDate(day.date)}
          </p>
        </div>

        <h3 className="mt-2 font-serif text-2xl font-light leading-tight text-ink sm:text-3xl">
          {day.title}
        </h3>
        <p className="mt-2 font-sans text-[15px] leading-relaxed text-ink/70 sm:text-base">
          {day.description}
        </p>
      </div>
    </motion.li>
  );
}
