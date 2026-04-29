import Link from "next/link";

// Phase 1 placeholder — the full Cities/Route/Wings/Days/Stays
// experience lands in a follow-up commit, driven entirely by
// lib/trip-data.ts.  Keeping this small page deployable so the live
// URL is up immediately and content edits roll out via the
// trip-data file.

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="block h-px w-10 bg-gold" />
          <span className="font-mono text-[10px] uppercase tracking-widest3 text-ink/70">
            Bella&rsquo;s <em className="font-serif italic text-gold not-italic">voyage</em>
          </span>
          <span className="block h-px w-10 bg-gold" />
        </div>

        <h1 className="font-serif text-[clamp(44px,12vw,72px)] font-light leading-[0.95] tracking-tight text-ink">
          Paris, Beaune <em className="italic text-gold">&amp;</em> Lausanne
        </h1>

        <p className="mt-6 font-serif text-lg italic font-light text-ink/80 sm:text-xl">
          An eight-night journey · June 3 – 11, 2026
        </p>

        <p className="mt-12 font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
          The full itinerary is being prepared.
        </p>

        <Link
          href="/welcome"
          className="mt-10 inline-block border-b border-gold/60 pb-1 font-sans text-sm uppercase tracking-widest2 text-ink transition-colors hover:text-gold"
        >
          See the gift page →
        </Link>
      </div>
    </main>
  );
}
