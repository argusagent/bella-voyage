"use client";

import { motion } from "framer-motion";
import { flights, type Flight } from "@/lib/trip-data";
import {
  formatLongDate,
  formatTime24,
  formatFlightDuration,
  cn,
} from "@/lib/format";
import { SectionHeader } from "./SectionHeader";

// Flights — boarding-pass-style flight cards.  Each card is fully
// keyboard-focusable.  On mobile the card stacks vertically (origin block
// on top, dotted divider, destination on bottom).  On desktop the two
// blocks sit side-by-side with the duration centered between them.

export function FlightsSection() {
  if (flights.length === 0) return null;

  return (
    <section
      id="flights"
      aria-label="The flights"
      className="bg-paper-bone px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          number="04"
          eyebrow="Flights"
          title={
            <>
              Two long flights, <em className="italic text-gold">east and west.</em>
            </>
          }
          subtitle="The bookend hours of the trip — held in business, both directions."
        />

        <div className="grid gap-5 sm:gap-6">
          {flights.map((f, i) => (
            <FlightCard key={f.id} flight={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlightCard({ flight, index }: { flight: Flight; index: number }) {
  const departTime = formatTime24(flight.departISO);
  const arriveTime = formatTime24(flight.arriveISO);
  const departDate = formatLongDate(flight.departISO);
  const arriveDate = formatLongDate(flight.arriveISO);
  const duration = formatFlightDuration(flight.departISO, flight.arriveISO);
  const sameDay = flight.departISO.slice(0, 10) === flight.arriveISO.slice(0, 10);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn(
        "group relative overflow-hidden border border-line bg-paper",
        "transition-shadow duration-500 hover:shadow-soft"
      )}
    >
      {/* Top metadata strip */}
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line/70 px-6 py-4 sm:px-8">
        <div className="flex items-baseline gap-3">
          <p className="font-mono text-[11px] uppercase tracking-widest3 text-ink/60">
            {flight.airline}
          </p>
          <span aria-hidden className="block h-3 w-px bg-ink/15" />
          <p className="font-mono text-[11px] uppercase tracking-widest3 text-ink">
            {flight.flightNumber}
          </p>
        </div>
        <div className="flex items-baseline gap-3">
          {flight.cabin ? (
            <p className="font-mono text-[10px] uppercase tracking-widest3 text-gold">
              {flight.cabin}
            </p>
          ) : null}
          {flight.confirmation ? (
            <>
              <span aria-hidden className="block h-3 w-px bg-ink/15" />
              <p className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
                {flight.confirmation}
              </p>
            </>
          ) : null}
        </div>
      </header>

      {/* Body — origin / divider / destination */}
      <div className="grid gap-6 px-6 py-7 sm:grid-cols-[1fr_auto_1fr] sm:gap-8 sm:px-8 sm:py-9">
        {/* Origin */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
            Depart
          </p>
          <p className="mt-2 font-serif text-[clamp(40px,8vw,64px)] font-light leading-none text-ink">
            {flight.origin.code}
          </p>
          <p className="mt-2 font-sans text-sm text-ink/70">{flight.origin.name}</p>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-ink/65">
            {departDate}
          </p>
          <p className="font-mono text-2xl tracking-wide text-ink sm:text-3xl">
            {departTime}
          </p>
        </div>

        {/* Center divider with duration label.  On mobile, becomes a
            horizontal dotted line above destination block.            */}
        <div className="flex items-center justify-center sm:flex-col">
          <span
            aria-hidden
            className="block h-px w-full bg-[radial-gradient(circle_at_2px,var(--gold)_1.5px,transparent_2px)] [background-size:8px_1px] sm:h-full sm:w-px sm:bg-[radial-gradient(circle_at_50%_2px,var(--gold)_1.5px,transparent_2px)] sm:[background-size:1px_8px]"
          />
          <span className="mx-3 inline-flex flex-col items-center font-mono text-[10px] uppercase tracking-widest3 text-ink/55 sm:my-3 sm:mx-0">
            <span className="text-base text-gold sm:text-xl" aria-hidden>
              ✈
            </span>
            <span className="mt-1">{duration}</span>
          </span>
          <span
            aria-hidden
            className="block h-px w-full bg-[radial-gradient(circle_at_2px,var(--gold)_1.5px,transparent_2px)] [background-size:8px_1px] sm:h-full sm:w-px sm:bg-[radial-gradient(circle_at_50%_2px,var(--gold)_1.5px,transparent_2px)] sm:[background-size:1px_8px]"
          />
        </div>

        {/* Destination */}
        <div className="sm:text-right">
          <p className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
            Arrive
          </p>
          <p className="mt-2 font-serif text-[clamp(40px,8vw,64px)] font-light leading-none text-ink">
            {flight.destination.code}
          </p>
          <p className="mt-2 font-sans text-sm text-ink/70">
            {flight.destination.name}
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-ink/65">
            {arriveDate}
            {!sameDay ? <span className="text-gold"> · +1 day</span> : null}
          </p>
          <p className="font-mono text-2xl tracking-wide text-ink sm:text-3xl">
            {arriveTime}
          </p>
        </div>
      </div>

      {flight.notes ? (
        <footer className="border-t border-line/70 bg-paper-warm/40 px-6 py-3 sm:px-8">
          <p className="font-sans text-xs italic text-ink/65">{flight.notes}</p>
        </footer>
      ) : null}
    </motion.article>
  );
}
