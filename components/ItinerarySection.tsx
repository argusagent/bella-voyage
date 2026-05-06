"use client";

import { motion } from "framer-motion";
import {
  timeline,
  cityMeta,
  activities,
  type Activity,
} from "@/lib/trip-data";
import {
  formatMonthDay,
  formatDayNumber,
  formatWeekday,
} from "@/lib/format";
import { SectionHeader } from "./SectionHeader";

// Itinerary — a flat list of nine days.  Each row shows the date, city,
// title, and (when present) a small chronological list of that day's
// activities pulled from `activities[]` by date.  No expansion, no
// nested groups — the activity strip is always visible, with a thin
// gold rule on the left to anchor it as a child of the day above.

// Pre-bucketed by date so each row renders in O(1) instead of scanning
// the full activities array on every parent re-render.
const ACTIVITIES_BY_DATE = new Map<string, Activity[]>();
for (const a of activities) {
  if (!a.date) continue;
  const arr = ACTIVITIES_BY_DATE.get(a.date);
  if (arr) arr.push(a);
  else ACTIVITIES_BY_DATE.set(a.date, [a]);
}
const NO_ACTIVITIES: readonly Activity[] = [];

export function ItinerarySection() {
  if (timeline.length === 0) return null;

  return (
    <section
      id="itinerary"
      aria-label="Itinerary"
      className="bg-paper px-6 py-12 sm:px-10 sm:py-20"
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
  const dayActivities = ACTIVITIES_BY_DATE.get(day.date) ?? NO_ACTIVITIES;

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.4) }}
      className="flex items-start gap-4 border-b border-line py-5 sm:gap-8 sm:py-7"
    >
      <div className="flex shrink-0 flex-col items-center gap-1 pl-1 sm:w-28 sm:items-start sm:pl-2">
        <span className="font-sans text-[11px] uppercase tracking-widest3 text-ink/55">
          {formatWeekday(day.date)}
        </span>
        <span className="font-serif text-3xl font-light leading-none text-ink sm:text-4xl">
          {formatDayNumber(day.date)}
        </span>
        <span className="font-sans text-[10px] uppercase tracking-widest3 text-ink/55">
          Jun
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="font-sans text-[11px] uppercase tracking-widest3 text-gold">
            {cityName}
          </p>
          <span aria-hidden className="hidden h-3 w-px bg-ink/15 sm:block" />
          <p className="hidden font-sans text-[11px] uppercase tracking-widest3 text-ink/55 sm:block">
            {formatMonthDay(day.date)}
          </p>
        </div>

        <h3 className="mt-2 font-serif text-2xl font-light leading-tight text-ink sm:text-3xl">
          {day.title}
        </h3>

        {dayActivities.length > 0 ? (
          <ul className="mt-4 space-y-3 border-l border-gold/40 pl-4 sm:mt-5 sm:space-y-4 sm:pl-5">
            {dayActivities.map((a) => (
              <li key={a.id}>
                {a.time ? (
                  <p className="font-sans text-[11px] uppercase tracking-widest3 text-gold">
                    {a.time}
                  </p>
                ) : null}
                <h4 className="mt-1 font-serif text-lg font-light leading-snug text-ink sm:text-xl">
                  {a.title}
                </h4>
                {a.bookingCode ? (
                  <p className="mt-2 font-sans text-[11px] uppercase tracking-widest2 text-ink/55">
                    Confirmation · {a.bookingCode}
                  </p>
                ) : null}
                {a.url ? (
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-2 inline-flex items-center gap-1 border-b border-gold/50 pb-0.5 font-sans text-[11px] uppercase tracking-widest3 text-ink/70 transition-colors hover:text-ink focus-visible:text-ink"
                  >
                    <span>Site</span>
                    <span aria-hidden className="font-serif italic text-gold">→</span>
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        {day.images && day.images.length > 0 ? (
          <DayPhotos images={day.images} title={day.title} />
        ) : null}
      </div>
    </motion.li>
  );
}

// Per-day photo strip.  CSS-only horizontal snap-scroll — when there
// are multiple photos for a day, swipe to advance.  Each slide takes
// the full column width so the image matches the text block above it
// rather than peeking the next photo at a smaller size.
function DayPhotos({
  images,
  title,
}: {
  images: NonNullable<(typeof timeline)[number]["images"]>;
  title: string;
}) {
  return (
    <div
      className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:mt-6 sm:gap-4"
      aria-roledescription="carousel"
      aria-label={`${title} photos`}
    >
      {images.map((img, i) => (
        <figure
          key={i}
          className="relative aspect-[4/3] flex-[0_0_100%] shrink-0 snap-start overflow-hidden border border-line/60 bg-paper-soft"
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${images.length}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </figure>
      ))}
    </div>
  );
}
