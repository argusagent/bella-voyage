"use client";

import { trip } from "@/lib/trip-data";
import { formatRangeShort } from "@/lib/format";

export function Footer() {
  const range = formatRangeShort(trip.startDate, trip.endDate);

  return (
    <footer className="border-t border-line bg-paper px-6 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <span aria-hidden className="block h-px w-12 bg-gold" />

        <p className="font-serif text-2xl italic font-light text-ink/85 sm:text-3xl">
          For Bella —
        </p>

        <p className="max-w-md font-serif text-base font-light leading-relaxed text-ink/65 sm:text-lg">
          seven nights, three cities, one long table after another.
          <br className="hidden sm:block" />
          See you at gate <span className="text-gold">B22</span>.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest3 text-ink/55">
          <span>Bella&rsquo;s voyage</span>
          <span aria-hidden className="block h-3 w-px bg-ink/15" />
          <span>{range}, 2026</span>
          <span aria-hidden className="block h-3 w-px bg-ink/15" />
          <span>{trip.nights} nights</span>
        </div>
      </div>
    </footer>
  );
}
