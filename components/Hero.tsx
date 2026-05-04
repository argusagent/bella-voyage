"use client";

import { motion } from "framer-motion";
import { trip } from "@/lib/trip-data";
import { formatRangeLong } from "@/lib/format";

// Hero — the moment the page opens.  A staggered reveal of the eyebrow,
// the three-line title, and a stacked metadata block (dates / nights /
// cities).  No subtitle line — the metadata speaks for itself.
//
// Mobile: title clamps from 44px upward.  Desktop: title hits 96px+.
// Metadata stacks vertically on every breakpoint so the rhythm is the
// same in glance form on phone and laptop.

export function Hero() {
  const { eyebrow, title } = trip.hero;
  const range = formatRangeLong(trip.startDate, trip.endDate);

  return (
    <section
      id="top"
      aria-label="Bella's voyage — overview"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-24 sm:px-10 sm:pt-32"
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
        {/* Eyebrow with gold rules */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
          className="mb-10 flex items-center justify-center gap-3 sm:mb-14 sm:gap-4"
        >
          <span className="block h-px w-8 bg-gold/70 sm:w-14" />
          <span className="font-mono text-[11px] uppercase tracking-widest3 text-ink/75 sm:text-xs">
            {eyebrow}
          </span>
          <span className="block h-px w-8 bg-gold/70 sm:w-14" />
        </motion.div>

        {/* Three-line title.  Each line reveals from below with overflow-hidden
            so the entrance feels like a stage curtain, not a fade.            */}
        <h1 className="font-serif text-[clamp(44px,14vw,108px)] font-light leading-[0.95] tracking-tight text-ink">
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

        {/* Stacked metadata — dates / nights / cities on their own lines */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay: 1.2 }}
          className="mx-auto mt-10 flex flex-col items-center gap-y-3 font-mono text-[11px] uppercase tracking-widest3 text-ink/70 sm:mt-14 sm:gap-y-3 sm:text-xs"
        >
          <span>{range}</span>
          <span>{trip.nights} Nights</span>
          <span>{trip.cities.length} Cities</span>
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#trip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
          aria-label="Begin the journey"
          className="group mt-12 inline-flex flex-col items-center gap-2 text-ink/55 transition-colors hover:text-ink/85 focus-visible:text-ink sm:mt-20"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest3 sm:text-xs">
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
