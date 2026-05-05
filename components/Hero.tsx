"use client";

import { motion } from "framer-motion";
import { trip, timeline } from "@/lib/trip-data";
import { Countdown } from "./Countdown";

// Hero — the moment the page opens.  Staggered reveal of:
//   eyebrow → three-line title → stat grid (Days/Nights/Cities/Fun) →
//   prominent countdown → quiet "Begin" cue.
//
// The same stat grid used to live in the Trip section; pulling it up
// here gives Bella the trip-shape signal at a glance, before any tab
// or scroll.  When she scrolls past, the countdown morphs into the
// small pill anchored to the sticky tab bar (handled in TabNav).

export function Hero() {
  const { eyebrow, title } = trip.hero;

  return (
    <section
      id="top"
      aria-label="Bella's Graduation Trip — overview"
      className="relative flex flex-col items-center overflow-hidden px-6 pb-12 pt-20 sm:px-10 sm:pb-16 sm:pt-28"
    >
      {/* Soft paper-grain wash so the hero reads as a printed page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(230,197,133,0.18) 0%, rgba(245,239,226,0) 60%)",
        }}
      />

      <div className="mx-auto w-full max-w-5xl text-center">
        {/* Eyebrow with gold rules — single line at every breakpoint */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
          className="mb-8 flex items-center justify-center gap-3 sm:mb-12 sm:gap-4"
        >
          <span className="block h-px w-6 bg-gold/70 sm:w-14" />
          <span className="whitespace-nowrap font-sans text-[11px] uppercase tracking-widest text-ink/75 sm:text-xs sm:tracking-widest3">
            {eyebrow}
          </span>
          <span className="block h-px w-6 bg-gold/70 sm:w-14" />
        </motion.div>

        {/* Three-line title.  Each line reveals from below with overflow-hidden
            so the entrance feels like a stage curtain, not a fade.            */}
        <h1 className="font-serif text-[clamp(40px,12vw,96px)] font-light leading-[0.95] tracking-tight text-ink">
          {title.lines.map((line, idx) => (
            <span key={idx} className="block overflow-hidden pb-1 sm:pb-2">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.1,
                  ease: [0.2, 0.8, 0.2, 1],
                  delay: 0.35 + idx * 0.18,
                }}
                className="block"
              >
                {renderLine(line, title.italicWord)}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Stat grid — Days / Nights / Cities / Fun */}
        <motion.dl
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay: 1.2 }}
          className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 sm:gap-4"
        >
          <Stat label="Days" value={timeline.length} />
          <Stat label="Nights" value={trip.nights} />
          <Stat label="Cities" value={trip.cities.length} />
          <Stat label="Memories" value="∞" />
        </motion.dl>

        {/* Countdown — the headline number, big and unmissable */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay: 1.5 }}
          className="mt-12 sm:mt-16"
        >
          <Countdown variant="statement" />
        </motion.div>
      </div>
    </section>
  );
}

// Single stat tile.  Subtle 3D feel: gradient background + layered drop
// shadow + a 1px top highlight rim.  Lifts on hover.  Numbers in
// Cormorant medium so they read with weight against the soft paper.
function Stat({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div
      className={[
        "group relative overflow-hidden border border-line",
        "bg-gradient-to-br from-paper-warm via-paper-warm to-paper-soft/70",
        "px-4 py-6 sm:px-6 sm:py-8",
        "shadow-[0_12px_32px_-14px_rgba(10,8,7,0.28),0_3px_6px_-2px_rgba(10,8,7,0.10)]",
        "transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-20px_rgba(10,8,7,0.36),0_5px_10px_-2px_rgba(10,8,7,0.12)]",
      ].join(" ")}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper-bone/80 to-transparent"
      />
      <dt className="font-sans text-[11px] uppercase tracking-widest3 text-ink/55 sm:text-xs">
        {label}
      </dt>
      <dd className="mt-3 font-serif text-5xl font-medium leading-none text-ink sm:mt-4 sm:text-6xl">
        {value}
      </dd>
    </div>
  );
}

function renderLine(line: string, italicWord: string) {
  if (!line.includes(italicWord)) return line;
  const idx = line.indexOf(italicWord);
  return (
    <>
      {line.slice(0, idx)}
      <em className="italic text-gold">{italicWord}</em>
      {line.slice(idx + italicWord.length)}
    </>
  );
}
