"use client";

import { motion } from "framer-motion";
import { trip } from "@/lib/trip-data";
import { formatRangeShort } from "@/lib/format";

// Hero — the moment the page opens.  A staggered reveal of the eyebrow,
// then the three-line title, then the subtitle.  Honors prefers-reduced-
// motion (transitions clamp to ~0ms via globals.css).
//
// Mobile: title clamps from 44px upward; the subtitle wraps; metadata row
// stacks horizontally with reduced gap.  Desktop: title hits 96px+, single-line
// metadata row sits below the subtitle.

export function Hero() {
  const { eyebrow, title, sub } = trip.hero;
  const range = formatRangeShort(trip.startDate, trip.endDate);

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
          <span className="font-mono text-[10px] uppercase tracking-widest3 text-ink/70 sm:text-[11px]">
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

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay: 1.2 }}
          className="mx-auto mt-8 max-w-xl font-serif text-lg italic font-light text-ink/80 sm:mt-10 sm:text-xl"
        >
          {sub}
        </motion.p>

        {/* Metadata row — dates + city count + nights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.55 }}
          className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-widest3 text-ink/60 sm:mt-16 sm:gap-x-8 sm:text-[11px]"
        >
          <span>{range}, 2026</span>
          <span aria-hidden className="hidden h-3 w-px bg-ink/15 sm:inline-block" />
          <span>{trip.cities.length} cities</span>
          <span aria-hidden className="hidden h-3 w-px bg-ink/15 sm:inline-block" />
          <span>{trip.nights} nights</span>
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#cities"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
          aria-label="Begin the journey"
          className="group mt-16 inline-flex flex-col items-center gap-2 text-ink/50 transition-colors hover:text-ink/80 focus-visible:text-ink sm:mt-24"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest3">
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
