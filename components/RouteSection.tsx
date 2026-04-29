"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cityMeta } from "@/lib/trip-data";
import { SectionHeader } from "./SectionHeader";

// Route — the connective tissue between the three cities.  Renders
// vertically on mobile (stations stacked, dotted line down the gutter)
// and horizontally on `md+` (a left-to-right journey ribbon).
//
// The connecting line draws when the section enters the viewport, with
// stations animating in sequence behind it.

type Leg = {
  fromLabel: string;
  toLabel: string;
  mode: "Air" | "Rail" | "Road";
  detail: string;
  duration: string;
};

const LEGS: Leg[] = [
  {
    fromLabel: "JFK",
    toLabel: "CDG",
    mode: "Air",
    detail: "Delta · DL 264",
    duration: "7h 25m",
  },
  {
    fromLabel: "Paris",
    toLabel: "Beaune",
    mode: "Rail",
    detail: "TGV 6707 · Gare de Lyon",
    duration: "2h 09m",
  },
  {
    fromLabel: "Beaune",
    toLabel: "Lausanne",
    mode: "Rail",
    detail: "TGV Lyria · 9261",
    duration: "3h 04m",
  },
  {
    fromLabel: "GVA",
    toLabel: "JFK",
    mode: "Air",
    detail: "Swiss · LX 22",
    duration: "9h 15m",
  },
];

const STATIONS = [
  { code: "JFK", name: "New York", kind: "airport" as const },
  { code: "PAR", name: "Paris", kind: "city" as const, accent: cityMeta.paris.accent },
  { code: "BNE", name: "Beaune", kind: "city" as const, accent: cityMeta.beaune.accent },
  {
    code: "LAU",
    name: "Lausanne",
    kind: "city" as const,
    accent: cityMeta.lausanne.accent,
  },
  { code: "JFK", name: "New York", kind: "airport" as const },
];

export function RouteSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section
      id="route"
      aria-label="The route"
      className="bg-paper-warm px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="02"
          eyebrow="The route"
          title={
            <>
              West to east, <em className="italic text-gold">and back.</em>
            </>
          }
          subtitle="Two flights book the trip; two trains string the cities together. Nothing rushes."
        />

        <div ref={ref} className="relative">
          {/* Mobile: vertical stack with line down the left gutter */}
          <div className="md:hidden">
            <ol className="relative space-y-6 pl-10">
              {/* Vertical line */}
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
                const leg = LEGS[i - 1]; // leg into station i
                return (
                  <li key={i} className="relative">
                    {leg ? (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.18 }}
                        className="-mt-3 mb-3 text-[10px] uppercase tracking-widest3 font-mono text-ink/55"
                      >
                        <span className="text-gold">·</span> {leg.mode} ·{" "}
                        {leg.duration} · {leg.detail}
                      </motion.div>
                    ) : null}
                    <Station
                      station={s}
                      delay={0.18 + i * 0.18}
                      animate={inView}
                    />
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Desktop: horizontal ribbon */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting horizontal line */}
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

              {/* Stations evenly spaced */}
              <ol className="relative grid grid-cols-5">
                {STATIONS.map((s, i) => (
                  <li key={i} className="flex flex-col items-center">
                    <Station station={s} delay={0.3 + i * 0.18} animate={inView} />
                  </li>
                ))}
              </ol>

              {/* Legs labels — placed in 4 spans between stations */}
              <div className="mt-8 grid grid-cols-4 gap-4">
                {LEGS.map((leg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 + i * 0.18 }}
                    className="text-center"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
                      {leg.mode} · {leg.duration}
                    </p>
                    <p className="mt-1 font-sans text-xs text-ink/70">
                      {leg.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
      className="relative flex flex-col items-center md:items-center"
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
              ? `0 0 0 3px var(--paper-warm), 0 0 0 4px ${accent}`
              : "0 0 0 3px var(--paper-warm)",
        }}
      />
      <p className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
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
