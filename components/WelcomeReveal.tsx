"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Three-beat reveal: greeting → tagline → CTA, each fades up gently
// on a 1.5-second cadence so the moment feels deliberate.  The CTA
// is a Next link to "/" — the route transition does the cross-fade.

export function WelcomeReveal() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
        className="font-serif text-[clamp(28px,7vw,42px)] font-light italic leading-[1.1] text-ink"
      >
        For Bella —
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1], delay: 1.8 }}
        className="mt-6 font-serif text-[clamp(22px,5vw,32px)] font-light leading-snug text-ink"
      >
        a journey, in <em className="italic text-gold">eight nights.</em>
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 3.6 }}
        className="mt-16"
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-3 border-b border-gold/40 pb-1 font-sans text-sm uppercase tracking-widest2 text-ink/80 transition-colors hover:text-ink"
        >
          <span>Open the journey</span>
          <span className="font-serif italic text-gold transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
