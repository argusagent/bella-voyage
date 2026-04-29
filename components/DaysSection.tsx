"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useId } from "react";
import { timeline, cityMeta } from "@/lib/trip-data";
import {
  formatLongDate,
  formatDayNumber,
  formatWeekday,
  cn,
} from "@/lib/format";
import { SectionHeader } from "./SectionHeader";

// Days — the timeline.  Each entry is an expandable row.  Click anywhere
// on the row (or activate via Enter/Space) to expand the highlights.
// Multiple rows can be open at once.  All rows are real <button>s with
// aria-expanded — accessible by default, and works on mobile and desktop.
//
// Mobile layout: tight vertical rhythm, big tap targets (>= 56px).
// Desktop: spacious 2-column rows with the day-number on the left.

export function DaysSection() {
  if (timeline.length === 0) return null;
  return <DaysInner />;
}

function DaysInner() {
  const [open, setOpen] = useState<Set<string>>(new Set([timeline[0].date]));

  const toggle = (date: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(date)) next.delete(date);
      else next.add(date);
      return next;
    });
  };

  const expandAll = () =>
    setOpen(new Set(timeline.map((d) => d.date)));
  const collapseAll = () => setOpen(new Set());
  const allOpen = open.size === timeline.length;

  return (
    <section
      id="days"
      aria-label="Day by day"
      className="bg-paper px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          number="04"
          eyebrow="Day by day"
          title={
            <>
              Nine days, <em className="italic text-gold">unhurried.</em>
            </>
          }
          subtitle="A loose rhythm — anchored by the trains and the dinners, with the rest left wide."
        />

        {/* Expand / collapse all */}
        <div className="mb-6 flex justify-end sm:mb-8">
          <button
            type="button"
            onClick={() => (allOpen ? collapseAll() : expandAll())}
            className="font-mono text-[10px] uppercase tracking-widest3 text-ink/60 underline-offset-4 transition-colors hover:text-ink hover:underline focus-visible:text-ink"
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
          <span className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
            {formatWeekday(day.date)}
          </span>
          <span className="font-serif text-3xl font-light leading-none text-ink sm:text-4xl">
            {formatDayNumber(day.date)}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest3 text-ink/45">
            Jun
          </span>
        </div>

        {/* Content column */}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <p className="font-mono text-[10px] uppercase tracking-widest3 text-gold">
              {cityName}
            </p>
            <span aria-hidden className="block h-3 w-px bg-ink/15" />
            <p className="font-mono text-[10px] uppercase tracking-widest3 text-ink/45 sm:hidden">
              {formatLongDate(day.date).split(",")[0]}
            </p>
            <p className="hidden font-mono text-[10px] uppercase tracking-widest3 text-ink/45 sm:block">
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

        {/* Toggle arrow */}
        <div className="shrink-0 self-center pr-1">
          <span
            aria-hidden
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border border-line transition-all duration-300",
              "group-hover:border-gold group-hover:text-gold",
              isOpen && "rotate-180 border-gold/60 bg-paper-bone text-gold"
            )}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
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

      {/* Expandable highlights */}
      <AnimatePresence initial={false}>
        {isOpen && day.highlights && day.highlights.length > 0 ? (
          <motion.div
            id={id}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="ml-1 grid gap-2 pb-7 pl-1 sm:ml-28 sm:gap-3 sm:pb-9 sm:pl-8">
              {day.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 font-sans text-sm text-ink/75"
                >
                  <span className="mt-2 block h-px w-4 shrink-0 bg-gold/70" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}
