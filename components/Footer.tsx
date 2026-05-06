"use client";

import { trip } from "@/lib/trip-data";
import { formatRangeShort } from "@/lib/format";

export function Footer() {
  const range = formatRangeShort(trip.startDate, trip.endDate);

  return (
    <footer className="border-t border-line bg-paper px-6 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center">
        <span aria-hidden className="block h-px w-12 bg-gold" />

        <p className="font-serif text-2xl italic font-light text-ink/85 sm:text-3xl">
          Bella &mdash;
        </p>

        <p className="max-w-lg font-serif text-base font-light leading-relaxed text-ink/75 sm:text-lg">
          I couldn&rsquo;t be more proud of all your hard work, dedication,
          and perseverance. I can&rsquo;t wait to celebrate with you!
        </p>

        <p className="font-serif text-lg italic font-light text-ink/85 sm:text-xl">
          Je t&rsquo;aime <span aria-hidden>❤️</span>{" "}
          <span className="text-gold">&mdash; Eli</span>
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-[11px] uppercase tracking-widest3 text-ink/55">
          <span>Bella&rsquo;s Graduation Trip</span>
          <span aria-hidden className="block h-3 w-px bg-ink/15" />
          <span>{range}, 2026</span>
          <span aria-hidden className="block h-3 w-px bg-ink/15" />
          <span>{trip.nights} nights</span>
        </div>
      </div>
    </footer>
  );
}
