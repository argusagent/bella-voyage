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
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-20 sm:px-10 sm:pb-24 sm:pt-28"
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
          <Stat label="Fun" value="∞" />
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

        {/* Scroll cue */}
        <motion.a
          href="#trip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.9 }}
          aria-label="Begin the journey"
          className="group mt-10 inline-flex flex-col items-center gap-2 text-ink/55 transition-colors hover:text-ink/85 focus-visible:text-ink sm:mt-14"
        >
          <span className="font-sans text-[11px] uppercase tracking-widest3 sm:text-xs">
            Begin
          </span>
          <span
            aria-hidden
            className="block h-10 w-px bg-gradient-to-b from-gold/70 to-transparent transition-all group-hover:h-14"
          />
        </motion.a>
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
        "group relative overflow-hidden border border-line/70",
        "bg-gradient-to-br from-paper via-paper to-paper-warm/40",
        "px-4 py-6 sm:px-6 sm:py-8",
        "shadow-[0_10px_30px_-15px_rgba(10,8,7,0.20),0_2px_4px_-2px_rgba(10,8,7,0.06)]",
        "transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(10,8,7,0.30),0_4px_8px_-2px_rgba(10,8,7,0.08)]",
      ].join(" ")}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper-bone to-transparent"
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
