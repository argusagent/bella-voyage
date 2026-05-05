"use client";

import { motion, useInView } from "framer-motion";
import { Fragment, useRef } from "react";
import { trip, cityMeta } from "@/lib/trip-data";
import { SectionHeader } from "./SectionHeader";

// Trip — the shape of the journey.  Four-stop directional route ribbon
// (vertical on mobile, horizontal on desktop) plus a quick city
// summary that deep-links into Lodging.  The headline stats live up
// in the Hero.

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

        <RouteRibbon />

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
                  <p className="font-sans text-[11px] uppercase tracking-widest3 text-ink/55">
                    {String(i + 1).padStart(2, "0")} · {m.country}
                  </p>
                  <p className="mt-1 font-serif text-2xl font-light leading-tight text-ink sm:text-3xl">
                    {m.name}
                  </p>
                </div>
                <p className="font-sans text-[11px] uppercase tracking-widest3 text-gold/85">
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

// ─── Route ribbon ──────────────────────────────────────────────────────────
//
// The shape of the trip — four stops in sequence.  Forward-only (no
// return loop): the Flights tab carries the actual transit detail, so
// here we just show where the trip goes, with a directional gold path
// connecting the cities and a small chevron arrow at each transition.

const STATIONS = [
  { code: "IND", name: "Indianapolis", kind: "airport" as const },
  { code: "PAR", name: "Paris", kind: "city" as const, accent: cityMeta.paris.accent },
  { code: "BNE", name: "Beaune", kind: "city" as const, accent: cityMeta.beaune.accent },
  { code: "LAU", name: "Lake Geneva", kind: "city" as const, accent: cityMeta.lausanne.accent },
];

function RouteRibbon() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className="relative">
      {/* Mobile — vertical flow with downward chevrons between stops */}
      <div className="md:hidden">
        <ol className="relative space-y-8 pl-10">
          <span
            aria-hidden
            className="absolute left-[15px] top-3 bottom-10 w-px origin-top bg-gradient-to-b from-gold via-gold/50 to-gold/10"
            style={{
              transform: inView ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top",
              transition: "transform 1.4s cubic-bezier(0.2,0.8,0.2,1)",
            }}
          />
          {STATIONS.map((s, i) => (
            <li key={i} className="relative">
              <Station station={s} delay={0.18 + i * 0.18} animate={inView} />
              {i < STATIONS.length - 1 ? (
                <motion.span
                  aria-hidden
                  initial={{ opacity: 0, y: -4 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.18 }}
                  className="mt-4 ml-[-26px] block w-3 text-gold"
                >
                  <ChevronDown />
                </motion.span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      {/* Desktop — horizontal flow with right-pointing chevrons between */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="absolute left-[10%] right-[10%] top-[26px] h-px overflow-hidden">
            <span
              aria-hidden
              className="block h-full origin-left bg-gradient-to-r from-gold/0 via-gold to-gold/30"
              style={{
                transform: inView ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 1.4s cubic-bezier(0.2,0.8,0.2,1)",
              }}
            />
          </div>

          <ol className="relative grid grid-cols-7 items-start">
            {STATIONS.map((s, i) => (
              <Fragment key={i}>
                <li className="col-span-1 flex flex-col items-center">
                  <Station station={s} delay={0.3 + i * 0.18} animate={inView} />
                </li>
                {i < STATIONS.length - 1 ? (
                  <li
                    aria-hidden
                    className="col-span-1 flex items-start justify-center pt-[18px]"
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.55 + i * 0.18 }}
                      className="block w-4 text-gold"
                    >
                      <ChevronRight />
                    </motion.span>
                  </li>
                ) : null}
              </Fragment>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 12 14" fill="none" className="h-auto w-full">
      <path
        d="M6 1V13M2 9L6 13L10 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 18 12" fill="none" className="h-auto w-full">
      <path
        d="M1 6H17M13 2L17 6L13 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
      <p className="font-sans text-[11px] uppercase tracking-widest3 text-ink/55">
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
