"use client";

import { motion } from "framer-motion";

// Shared section-header pattern (per the visual rules in README):
//   gold rule + mono section number  →  Cormorant title with italic accent
//   →  Manrope subtitle at ~70% ink opacity.
//
// All three pieces fade up together when the header enters the viewport.
// Use `italic` to set a one-word italic accent inside the title.

type Props = {
  number: string; // "01"
  eyebrow: string; // "The cities"
  title: React.ReactNode; // "Three places, in <em>order.</em>"
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  number,
  eyebrow,
  title,
  subtitle,
  align = "left",
}: Props) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      className={`mb-10 ${alignClass} sm:mb-14`}
    >
      <div
        className={`flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="block h-px w-10 bg-gold sm:w-14" />
        <span className="font-mono text-[11px] uppercase tracking-widest3 text-ink/65 sm:text-xs">
          {number} · {eyebrow}
        </span>
      </div>
      <h2 className="mt-5 font-serif text-[clamp(28px,5.5vw,52px)] font-light leading-[1.05] tracking-tight text-ink sm:mt-7">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 max-w-2xl font-sans text-[15px] leading-relaxed text-ink/70 sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </motion.header>
  );
}
