"use client";

import { motion } from "framer-motion";
import { flights, type Flight } from "@/lib/trip-data";
import {
  formatLongDate,
  formatTime24,
  cn,
} from "@/lib/format";
import { SectionHeader } from "./SectionHeader";

// Flights — slim segment cards.  Each card shows only the essentials:
// origin/destination (code + name), flight number, depart/arrive times.
// Multi-segment journeys get a date label so connections read clearly.
//
// Mobile: each segment stacks vertically (origin → divider → dest).
// Desktop: side-by-side with the duration in the middle.

export function FlightsSection() {
  if (flights.length === 0) return null;

  // Group by departure date so consecutive segments on the same day
  // share a header.  Source order is preserved.
  const groups: { date: string; segments: Flight[] }[] = [];
  for (const f of flights) {
    const d = f.departISO.slice(0, 10);
    const last = groups[groups.length - 1];
    if (last && last.date === d) last.segments.push(f);
    else groups.push({ date: d, segments: [f] });
  }

  return (
    <section
      id="flights"
      aria-label="Flights"
      className="bg-paper-bone px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          number="03"
          eyebrow="Flights"
          title={
            <>
              Out and <em className="italic text-gold">back.</em>
            </>
          }
        />

        <div className="space-y-10 sm:space-y-14">
          {groups.map((group, gi) => (
            <DayGroup key={group.date} group={group} index={gi} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DayGroup({
  group,
  index,
}: {
  group: { date: string; segments: Flight[] };
  index: number;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3 sm:mb-5">
        <span aria-hidden className="block h-px w-8 bg-gold sm:w-12" />
        <span
          aria-hidden
          className={cn(
            "block h-5 w-5 text-gold sm:h-6 sm:w-6",
            // Outbound plane points right; return points left.
            index === 0 ? "rotate-0" : "-scale-x-100"
          )}
        >
          <PlaneIcon />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest3 text-ink/75 sm:text-xs">
          {index === 0 ? "Outbound" : "Return"} · {formatLongDate(group.date)}
        </span>
      </div>
      <div className="grid gap-4 sm:gap-5">
        {group.segments.map((f, i) => (
          <FlightCard key={f.id} flight={f} index={i} />
        ))}
      </div>
    </div>
  );
}

function PlaneIcon() {
  // Plane silhouette inscribed in a 24×24 box, points right.  Filled
  // path so it reads at small sizes.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-full w-full"
      aria-hidden
    >
      <path d="M21.5 12.5 13 14.6l-2.6 5.6c-.1.3-.4.5-.7.5h-.5c-.4 0-.7-.4-.6-.8l1.2-5.4-3.6.9-1.5 1.6c-.1.1-.3.2-.5.2h-.4c-.4 0-.6-.4-.5-.7l1-2.8L2 12.4c-.5-.1-.5-.7 0-.9L4.3 11l-1-2.8c-.1-.4.2-.7.6-.7h.4c.2 0 .3.1.4.2l1.5 1.6 3.6.9-1.2-5.4c-.1-.4.2-.8.6-.8h.5c.3 0 .6.2.7.5L13 9.4l8.5 2.1c.5.1.5.9 0 1Z" />
    </svg>
  );
}

function FlightCard({ flight, index }: { flight: Flight; index: number }) {
  const departTime = formatTime24(flight.departISO);
  const arriveTime = formatTime24(flight.arriveISO);
  const sameDay = flight.departISO.slice(0, 10) === flight.arriveISO.slice(0, 10);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn(
        "group relative overflow-hidden border border-line bg-paper",
        "transition-shadow duration-500 hover:shadow-soft"
      )}
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line/70 px-6 py-4 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-widest3 text-ink/65">
          {flight.airline}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-widest3 text-ink">
          {flight.flightNumber}
        </p>
      </header>

      <div className="grid gap-6 px-6 py-7 sm:grid-cols-[1fr_auto_1fr] sm:gap-8 sm:px-8 sm:py-9">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest3 text-ink/55">
            Depart
          </p>
          <p className="mt-2 font-serif text-[clamp(40px,8vw,64px)] font-light leading-none text-ink">
            {flight.origin.code}
          </p>
          <p className="mt-2 font-sans text-sm text-ink/70">{flight.origin.name}</p>
          <p className="mt-3 font-mono text-2xl tracking-wide text-ink sm:text-3xl">
            {departTime}
          </p>
        </div>

        <div className="flex items-center justify-center sm:flex-col">
          <span
            aria-hidden
            className="block h-px w-full bg-[radial-gradient(circle_at_2px,var(--gold)_1.5px,transparent_2px)] [background-size:8px_1px] sm:h-full sm:w-px sm:bg-[radial-gradient(circle_at_50%_2px,var(--gold)_1.5px,transparent_2px)] sm:[background-size:1px_8px]"
          />
          <span className="mx-3 inline-flex h-7 w-7 items-center justify-center text-gold sm:my-3 sm:mx-0 sm:h-8 sm:w-8">
            <PlaneIcon />
          </span>
          <span
            aria-hidden
            className="block h-px w-full bg-[radial-gradient(circle_at_2px,var(--gold)_1.5px,transparent_2px)] [background-size:8px_1px] sm:h-full sm:w-px sm:bg-[radial-gradient(circle_at_50%_2px,var(--gold)_1.5px,transparent_2px)] sm:[background-size:1px_8px]"
          />
        </div>

        <div className="sm:text-right">
          <p className="font-mono text-[11px] uppercase tracking-widest3 text-ink/55">
            Arrive{!sameDay ? <span className="text-gold"> · +1 day</span> : null}
          </p>
          <p className="mt-2 font-serif text-[clamp(40px,8vw,64px)] font-light leading-none text-ink">
            {flight.destination.code}
          </p>
          <p className="mt-2 font-sans text-sm text-ink/70">
            {flight.destination.name}
          </p>
          <p className="mt-3 font-mono text-2xl tracking-wide text-ink sm:text-3xl">
            {arriveTime}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
