"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { trip, cityMeta, flights, timeline } from "@/lib/trip-data";
import { SectionHeader } from "./SectionHeader";

// Trip — at-a-glance signal: a four-stat grid up top, then the
// west-to-east-and-back route ribbon (vertical on mobile, horizontal
// on desktop) with each leg labelled.  This is the landing tab — the
// QR code drops Bella here.

export function TripSection() {
  return (
    <section
      id="trip"
      aria-label="Trip"
      className="bg-paper-bone px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="01"
          eyebrow="Trip"
          title={
            <>
              The shape of <em className="italic text-gold">the trip.</em>
            </>
          }
        />

        {/* Stats grid */}
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          <Stat label="Days" value={timeline.length} />
          <Stat label="Nights" value={trip.nights} note="hotel" />
          <Stat label="Cities" value={trip.cities.length} />
          <Stat label="Flights" value={flights.length} />
        </dl>

        <div className="mt-12 sm:mt-16">
          <RouteRibbon />
        </div>

        {/* City quick-summary — each row deep-links straight to that
            city's row in Lodging. */}
        <div className="mt-14 grid gap-3 sm:gap-4 md:grid-cols-3">
          {trip.cities.map((c, i) => {
            const m = cityMeta[c];
            return (
              <a
                key={c}
                href={`#stay-${c}`}
                className="group flex items-baseline justify-between gap-3 border-t border-line py-4 transition-colors hover:bg-paper sm:py-5"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest3 text-ink/55">
                    {String(i + 1).padStart(2, "0")} · {m.country}
                  </p>
                  <p className="mt-1 font-serif text-2xl font-light leading-tight text-ink sm:text-3xl">
                    {m.name}
                  </p>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-widest3 text-gold/85">
                  {m.nights} {m.nights === 1 ? "night" : "nights"}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7 }}
      className="border border-line bg-paper p-5 sm:p-6"
    >
      <p className="font-mono text-[11px] uppercase tracking-widest3 text-ink/55">
        {label}
      </p>
      <p className="mt-2 font-serif text-4xl font-light leading-none text-ink sm:text-5xl">
        {value}
      </p>
      {note ? (
        <p className="mt-1 font-mono text-[11px] uppercase tracking-widest3 text-gold/85">
          {note}
        </p>
      ) : null}
    </motion.div>
  );
}

// ─── Route ribbon (lifted from the retired RouteSection) ──────────────────

type Leg = {
  fromLabel: string;
  toLabel: string;
  mode: "Air" | "Rail" | "Road";
  detail: string;
  duration: string;
};

const LEGS: Leg[] = [
  { fromLabel: "IND", toLabel: "CDG", mode: "Air", detail: "Delta · via DTW", duration: "Wed Jun 3" },
  { fromLabel: "Paris", toLabel: "Beaune", mode: "Rail", detail: "TGV", duration: "~2h" },
  { fromLabel: "Beaune", toLabel: "Lausanne", mode: "Rail", detail: "TGV Lyria", duration: "~3h" },
  { fromLabel: "GVA", toLabel: "IND", mode: "Air", detail: "American · via LHR, ORD", duration: "Thu Jun 11" },
];

const STATIONS = [
  { code: "IND", name: "Indianapolis", kind: "airport" as const },
  { code: "PAR", name: "Paris", kind: "city" as const, accent: cityMeta.paris.accent },
  { code: "BNE", name: "Beaune", kind: "city" as const, accent: cityMeta.beaune.accent },
  { code: "LAU", name: "Lausanne", kind: "city" as const, accent: cityMeta.lausanne.accent },
  { code: "IND", name: "Indianapolis", kind: "airport" as const },
];

function RouteRibbon() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className="relative">
      {/* Mobile vertical */}
      <div className="md:hidden">
        <ol className="relative space-y-6 pl-10">
          <span
            aria-hidden
            className="absolute left-[15px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-gold via-gold/40 to-gold/0"
            style={{
              transform: inView ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top",
              transition: "transform 1.6s cubic-bezier(0.2,0.8,0.2,1)",
            }}
          />
          {STATIONS.map((s, i) => {
            const leg = LEGS[i - 1];
            return (
              <li key={i} className="relative">
                {leg ? (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.18 }}
                    className="-mt-3 mb-3 font-mono text-[11px] uppercase tracking-widest3 text-ink/55"
                  >
                    <span className="text-gold">·</span> {leg.mode} · {leg.duration} ·{" "}
                    {leg.detail}
                  </motion.div>
                ) : null}
                <Station station={s} delay={0.18 + i * 0.18} animate={inView} />
              </li>
            );
          })}
        </ol>
      </div>

      {/* Desktop horizontal */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="absolute left-0 right-0 top-[26px] h-px overflow-hidden">
            <span
              aria-hidden
              className="block h-full origin-left bg-gradient-to-r from-gold/0 via-gold to-gold/0"
              style={{
                transform: inView ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 1.6s cubic-bezier(0.2,0.8,0.2,1)",
              }}
            />
          </div>

          <ol className="relative grid grid-cols-5">
            {STATIONS.map((s, i) => (
              <li key={i} className="flex flex-col items-center">
                <Station station={s} delay={0.3 + i * 0.18} animate={inView} />
              </li>
            ))}
          </ol>

          <div className="mt-8 grid grid-cols-4 gap-4">
            {LEGS.map((leg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.18 }}
                className="text-center"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest3 text-ink/55">
                  {leg.mode} · {leg.duration}
                </p>
                <p className="mt-1 font-sans text-xs text-ink/70">{leg.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Station({
  station,
  delay,
  animate,
}: {
  station: (typeof STATIONS)[number];
  delay: number;
  animate: boolean;
}) {
  const accent = station.kind === "city" ? station.accent : "var(--ink)";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={animate ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative flex flex-col items-center"
    >
      <span
        aria-hidden
        className="absolute md:static md:mb-3"
        style={{
          left: "-30px",
          top: "8px",
          width: "12px",
          height: "12px",
          borderRadius: "9999px",
          background: "var(--paper)",
          border: `2px solid ${accent ?? "var(--gold)"}`,
          boxShadow:
            station.kind === "city"
              ? `0 0 0 3px var(--paper-bone), 0 0 0 4px ${accent}`
              : "0 0 0 3px var(--paper-bone)",
        }}
      />
      <p className="font-mono text-[11px] uppercase tracking-widest3 text-ink/55">
        {station.code}
      </p>
      <p
        className={`mt-1 font-serif text-2xl font-light leading-tight text-ink md:text-3xl ${
          station.kind === "city" ? "italic" : ""
        }`}
      >
        {station.name}
      </p>
    </motion.div>
  );
}
