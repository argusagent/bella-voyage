"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useId } from "react";
import {
  timeline,
  cityMeta,
  restaurants,
  activities,
  wineTours,
  type Restaurant,
  type Activity,
  type WineTour,
} from "@/lib/trip-data";
import {
  formatLongDate,
  formatDayNumber,
  formatWeekday,
  cn,
} from "@/lib/format";
import { SectionHeader } from "./SectionHeader";

// Pre-bucketed by date so DayRow doesn't re-filter the full arrays on
// every parent render (the toggle state lives on the parent).  The
// underlying arrays are static module data — bucketing once at import
// is correct and the memory footprint is negligible.
const RESTAURANTS_BY_DATE = groupByDate(restaurants);
const ACTIVITIES_BY_DATE = groupByDate(activities);
const WINE_TOURS_BY_DATE = groupByDate(wineTours);
const NO_RESTAURANTS: readonly Restaurant[] = [];
const NO_ACTIVITIES: readonly Activity[] = [];
const NO_WINE_TOURS: readonly WineTour[] = [];

function groupByDate<T extends { date?: string }>(items: T[]): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    if (!item.date) continue;
    const arr = map.get(item.date);
    if (arr) arr.push(item);
    else map.set(item.date, [item]);
  }
  return map;
}

// Itinerary — the day-by-day timeline.  Each row is an expandable button
// (Enter/Space/click), with `aria-expanded` and `aria-controls`.  The
// expansion shows three layered groups in fixed order:
//
//   • Highlights — the per-day spine (always present)
//   • Tables     — restaurants reserved on this date
//   • Sights     — activities scheduled on this date
//   • Vineyards  — wine tours scheduled on this date
//
// All three optional groups are pulled from the same module-level data
// the standalone tabs used to use; the date is the join key, so editing
// `lib/trip-data.ts` is still the only thing that updates the page.

export function ItinerarySection() {
  if (timeline.length === 0) return null;
  return <ItineraryInner />;
}

function ItineraryInner() {
  const [open, setOpen] = useState<Set<string>>(new Set([timeline[0].date]));

  const toggle = (date: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(date)) next.delete(date);
      else next.add(date);
      return next;
    });
  };

  const expandAll = () => setOpen(new Set(timeline.map((d) => d.date)));
  const collapseAll = () => setOpen(new Set());
  const allOpen = open.size === timeline.length;

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
          subtitle="A loose rhythm — anchored by the trains and the dinners, with the rest left wide.  Tap any day to see what's held."
        />

        {/* Expand / collapse all */}
        <div className="mb-6 flex justify-end sm:mb-8">
          <button
            type="button"
            onClick={() => (allOpen ? collapseAll() : expandAll())}
            className="font-mono text-[11px] uppercase tracking-widest3 text-ink/60 underline-offset-4 transition-colors hover:text-ink hover:underline focus-visible:text-ink"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>

        <ol className="border-t border-line">
          {timeline.map((day, idx) => (
            <DayRow
              key={day.date}
              day={day}
              index={idx}
              isOpen={open.has(day.date)}
              onToggle={() => toggle(day.date)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function DayRow({
  day,
  index,
  isOpen,
  onToggle,
}: {
  day: (typeof timeline)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const cityName = cityMeta[day.city].name;
  const id = useId();

  const dayRestaurants = RESTAURANTS_BY_DATE.get(day.date) ?? NO_RESTAURANTS;
  const dayActivities = ACTIVITIES_BY_DATE.get(day.date) ?? NO_ACTIVITIES;
  const dayWineTours = WINE_TOURS_BY_DATE.get(day.date) ?? NO_WINE_TOURS;
  const hasExtras =
    (day.highlights?.length ?? 0) +
      dayRestaurants.length +
      dayActivities.length +
      dayWineTours.length >
    0;

  // Mini-summary chips on the collapsed row, telling the user what's
  // inside before they expand.  Only shows on `sm+` so the mobile row
  // stays clean.
  const summary: string[] = [];
  if (day.highlights?.length) summary.push(`${day.highlights.length} notes`);
  if (dayRestaurants.length)
    summary.push(
      `${dayRestaurants.length} ${dayRestaurants.length === 1 ? "table" : "tables"}`
    );
  if (dayActivities.length)
    summary.push(
      `${dayActivities.length} ${dayActivities.length === 1 ? "sight" : "sights"}`
    );
  if (dayWineTours.length)
    summary.push(
      `${dayWineTours.length} ${dayWineTours.length === 1 ? "vineyard" : "vineyards"}`
    );

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.4) }}
      className="border-b border-line"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={id}
        className={cn(
          "group flex w-full cursor-pointer items-start gap-4 py-5 text-left transition-colors sm:gap-8 sm:py-7",
          "hover:bg-paper-bone focus-visible:bg-paper-bone",
          "min-h-[64px]"
        )}
      >
        {/* Date column */}
        <div className="flex shrink-0 flex-col items-center gap-1 pl-1 sm:w-28 sm:items-start sm:pl-2">
          <span className="font-mono text-[11px] uppercase tracking-widest3 text-ink/55">
            {formatWeekday(day.date)}
          </span>
          <span className="font-serif text-3xl font-light leading-none text-ink sm:text-4xl">
            {formatDayNumber(day.date)}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest3 text-ink/55">
            Jun
          </span>
        </div>

        {/* Content column */}
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

          {summary.length > 0 ? (
            <p className="mt-3 hidden font-mono text-[11px] uppercase tracking-widest3 text-ink/50 sm:block">
              {summary.join(" · ")}
            </p>
          ) : null}
        </div>

        {/* Toggle arrow */}
        <div className="shrink-0 self-center pr-1">
          <span
            aria-hidden
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line transition-all duration-300",
              "group-hover:border-gold group-hover:text-gold",
              isOpen && "rotate-180 border-gold/60 bg-paper-bone text-gold"
            )}
          >
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 4L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && hasExtras ? (
          <motion.div
            id={id}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="ml-1 grid gap-7 pb-7 pl-1 sm:ml-28 sm:gap-9 sm:pb-9 sm:pl-8">
              {day.highlights && day.highlights.length > 0 ? (
                <SubGroup label="Notes">
                  {day.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 font-sans text-sm text-ink/75"
                    >
                      <span className="mt-2 block h-px w-4 shrink-0 bg-gold/70" />
                      <span>{h}</span>
                    </div>
                  ))}
                </SubGroup>
              ) : null}

              {dayRestaurants.length > 0 ? (
                <SubGroup label="Tables">
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    {dayRestaurants.map((r) => (
                      <RestaurantCard key={r.id} r={r} />
                    ))}
                  </div>
                </SubGroup>
              ) : null}

              {dayActivities.length > 0 ? (
                <SubGroup label="Sights">
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    {dayActivities.map((a) => (
                      <ActivityCard key={a.id} a={a} />
                    ))}
                  </div>
                </SubGroup>
              ) : null}

              {dayWineTours.length > 0 ? (
                <SubGroup label="Vineyards">
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    {dayWineTours.map((w) => (
                      <WineCard key={w.id} w={w} />
                    ))}
                  </div>
                </SubGroup>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}

// ─── Sub-group wrapper ─────────────────────────────────────────────────────

function SubGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <span aria-hidden className="block h-px w-6 bg-gold" />
        <span className="font-mono text-[11px] uppercase tracking-widest3 text-ink/60">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

// ─── Card variants reused inside day expansions ────────────────────────────

function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <article className="border border-line bg-paper-bone p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-widest3 text-gold">
            {cityMeta[r.city].name}
          </p>
          <h4 className="mt-1 font-serif text-xl font-light leading-tight text-ink">
            {r.name}
          </h4>
        </div>
        {r.partySize ? (
          <span className="shrink-0 border border-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest2 text-ink/60">
            Party {r.partySize}
          </span>
        ) : null}
      </div>
      {r.time ? (
        <p className="mt-2 font-mono text-xs uppercase tracking-widest2 text-ink/65">
          {r.time}
        </p>
      ) : null}
      {r.notes ? (
        <p className="mt-2 font-serif text-sm italic font-light text-ink/70">
          {r.notes}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line/70 pt-3">
        {r.reservationCode ? (
          <p className="font-mono text-[11px] uppercase tracking-widest3 text-ink/55">
            {r.reservationCode}
          </p>
        ) : null}
        {r.url ? (
          <a
            href={r.url}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-auto inline-flex items-center gap-1 border-b border-gold/50 pb-0.5 font-mono text-[11px] uppercase tracking-widest3 text-ink/70 transition-colors hover:text-ink focus-visible:text-ink"
          >
            <span>Site</span>
            <span aria-hidden className="font-serif italic text-gold">
              →
            </span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

function ActivityCard({ a }: { a: Activity }) {
  return (
    <article className="border border-line bg-paper-bone p-4 sm:p-5">
      <p className="font-mono text-[11px] uppercase tracking-widest3 text-gold">
        {cityMeta[a.city].name}
      </p>
      <h4 className="mt-1 font-serif text-lg font-light leading-snug text-ink">
        {a.title}
      </h4>
      {a.description ? (
        <p className="mt-2 font-sans text-sm leading-relaxed text-ink/70">
          {a.description}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line/70 pt-3">
        {a.time ? (
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/65">
            {a.time}
          </p>
        ) : null}
        {a.bookingCode ? (
          <p className="font-mono text-[11px] uppercase tracking-widest3 text-ink/55">
            {a.bookingCode}
          </p>
        ) : null}
        {a.url ? (
          <a
            href={a.url}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-auto inline-flex items-center gap-1 border-b border-gold/50 pb-0.5 font-mono text-[11px] uppercase tracking-widest3 text-ink/70 transition-colors hover:text-ink focus-visible:text-ink"
          >
            <span>Site</span>
            <span aria-hidden className="font-serif italic text-gold">
              →
            </span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

function WineCard({ w }: { w: WineTour }) {
  return (
    <article className="relative border border-line bg-paper-bone p-4 sm:p-5">
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 font-serif text-2xl italic text-gold/30"
      >
        ❦
      </span>
      <p className="font-mono text-[11px] uppercase tracking-widest3 text-gold">
        {cityMeta[w.city].name}
      </p>
      <h4 className="mt-1 font-serif text-xl font-light leading-tight text-ink">
        {w.domain}
      </h4>
      {w.description ? (
        <p className="mt-2 font-serif text-sm italic font-light text-ink/75">
          {w.description}
        </p>
      ) : null}
      <div className="mt-3 grid gap-1 border-t border-line/70 pt-3 text-sm sm:grid-cols-[max-content_1fr] sm:gap-x-4">
        {w.time ? (
          <>
            <dt className="font-mono text-[11px] uppercase tracking-widest3 text-ink/55">
              When
            </dt>
            <dd className="font-sans text-ink/85">{w.time}</dd>
          </>
        ) : null}
        {w.meetingPoint ? (
          <>
            <dt className="font-mono text-[11px] uppercase tracking-widest3 text-ink/55">
              Meet
            </dt>
            <dd className="font-sans text-ink/85">{w.meetingPoint}</dd>
          </>
        ) : null}
      </div>
      {w.url ? (
        <a
          href={w.url}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-3 inline-flex w-fit items-center gap-1 border-b border-gold/50 pb-0.5 font-mono text-[11px] uppercase tracking-widest3 text-ink/70 transition-colors hover:text-ink focus-visible:text-ink"
        >
          <span>Estate</span>
          <span aria-hidden className="font-serif italic text-gold">
            →
          </span>
        </a>
      ) : null}
    </article>
  );
}
