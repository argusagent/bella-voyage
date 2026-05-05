"use client";

import { motion } from "framer-motion";
import { trip, cityMeta, type City } from "@/lib/trip-data";
import { SectionHeader } from "./SectionHeader";

// Trip Overview — three city rows, one per stop, deep-linking into
// the matching Lodging entry.  Each row carries a small line-icon
// representing the city: the Eiffel for Paris, a wine glass for
// Beaune, Alpine peaks above Lake Geneva for the final stop.
//
// The vertical route ribbon used to live here; it's been retired —
// the journey shape is implicit in the three numbered rows below.

export function TripSection() {
  return (
    <section
      id="trip"
      aria-label="Trip"
      className="bg-paper-bone px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          number="01"
          eyebrow="Trip"
          title={
            <>
              Trip <em className="italic text-gold">Overview</em>
            </>
          }
        />

        <ol className="border-b border-line">
          {trip.cities.map((c, i) => (
            <CityRow key={c} city={c} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function CityRow({ city, index }: { city: City; index: number }) {
  const m = cityMeta[city];
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
    >
      <a
        href={`#stay-${city}`}
        className="group flex items-center gap-4 border-t border-line py-5 transition-colors hover:bg-paper sm:gap-6 sm:py-6"
      >
        <span
          aria-hidden
          className="block h-8 w-8 shrink-0 text-gold/75 transition-colors group-hover:text-gold sm:h-10 sm:w-10"
        >
          <CityIcon city={city} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-sans text-[11px] uppercase tracking-widest3 text-ink/55 sm:text-xs">
            {String(index + 1).padStart(2, "0")} · {m.country}
          </p>
          <p className="mt-1 font-serif text-[clamp(28px,6vw,40px)] font-light leading-tight text-ink">
            {m.name}
          </p>
        </div>

        <p className="shrink-0 font-sans text-[11px] uppercase tracking-widest3 text-gold/85 sm:text-xs">
          {m.nights} {m.nights === 1 ? "night" : "nights"}
        </p>
      </a>
    </motion.li>
  );
}

// ─── Per-city line icons ───────────────────────────────────────────────────

function CityIcon({ city }: { city: City }) {
  if (city === "paris") return <EiffelIcon />;
  if (city === "beaune") return <WineGlassIcon />;
  return <LakeGenevaIcon />;
}

function EiffelIcon() {
  return (
    <svg
      viewBox="0 0 24 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
      aria-hidden
    >
      {/* Antenna + top spire */}
      <path d="M12 1V4" />
      <path d="M11 4h2" />
      {/* Upper legs */}
      <path d="M11 4 8 13" />
      <path d="M13 4 16 13" />
      {/* Mid horizontal */}
      <path d="M9.5 9h5" />
      {/* Lower legs flaring to base */}
      <path d="M8 13 5 26" />
      <path d="M16 13 19 26" />
      {/* Lower mid horizontal */}
      <path d="M7 18h10" />
      {/* Ground */}
      <path d="M4 26h16" />
    </svg>
  );
}

function WineGlassIcon() {
  return (
    <svg
      viewBox="0 0 24 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
      aria-hidden
    >
      {/* Bowl */}
      <path d="M7 4h10c0 7-2.5 12-5 12S7 11 7 4z" />
      {/* Stem */}
      <path d="M12 16v8" />
      {/* Foot */}
      <path d="M8 24h8" />
    </svg>
  );
}

function LakeGenevaIcon() {
  return (
    <svg
      viewBox="0 0 24 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
      aria-hidden
    >
      {/* Three Alpine peaks */}
      <path d="M2 16 7 6l4 7 4-9 7 12" />
      {/* Three water ripples below */}
      <path d="M3 20h18" />
      <path d="M5 23h14" />
      <path d="M8 26h8" />
    </svg>
  );
}
