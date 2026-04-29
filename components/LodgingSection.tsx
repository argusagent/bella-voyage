"use client";

import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { stays, cityMeta, type Stay } from "@/lib/trip-data";
import {
  formatLongDate,
  formatRangeShort,
  nightsBetween,
  cn,
} from "@/lib/format";
import { SectionHeader } from "./SectionHeader";

// Lodging — one expanded card per hotel.  Each card has:
//   • a media region — Embla snap-carousel on mobile (touch swipe), grid
//     on desktop.  When `images` is empty, an elegant gradient placeholder
//     stands in (the data file may not have photos yet).
//   • a metadata block: dates, address, confirmation, booking link.
//   • an anchor id (`stay-paris`, `stay-beaune`, `stay-lausanne`) so the
//     Cities section can deep-scroll to it.

export function LodgingSection() {
  if (stays.length === 0) return null;
  return (
    <section
      id="lodging"
      aria-label="Lodging"
      className="bg-paper-warm px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="03"
          eyebrow="Lodging"
          title={
            <>
              Three rooms, <em className="italic text-gold">held.</em>
            </>
          }
          subtitle="Quiet hotels, chosen for the morning more than the lobby — a courtyard in Paris, behind the ramparts in Beaune, and the lake in Lausanne."
        />

        <div className="grid gap-10 sm:gap-14">
          {stays.map((s, i) => (
            <StayCard key={s.id} stay={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StayCard({ stay, index }: { stay: Stay; index: number }) {
  const nights = nightsBetween(stay.checkInISO, stay.checkOutISO);
  const range = formatRangeShort(stay.checkInISO, stay.checkOutISO);
  const cityName = cityMeta[stay.city].name;

  return (
    <motion.article
      id={`stay-${stay.city}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      className="grid gap-6 lg:grid-cols-[5fr_4fr] lg:gap-10"
    >
      <Media stay={stay} />

      <div className="flex flex-col justify-center">
        <p className="font-mono text-[10px] uppercase tracking-widest3 text-gold">
          {String(index + 1).padStart(2, "0")} · {cityName}
        </p>
        <h3 className="mt-3 font-serif text-[clamp(28px,5vw,42px)] font-light leading-tight tracking-tight text-ink">
          {stay.name}
        </h3>

        {stay.address ? (
          <p className="mt-3 font-sans text-sm text-ink/70">{stay.address}</p>
        ) : null}

        {stay.blurb ? (
          <p className="mt-5 font-serif text-base italic font-light leading-relaxed text-ink/80 sm:text-lg">
            {stay.blurb}
          </p>
        ) : null}

        {/* Detail strip */}
        <dl className="mt-7 grid gap-y-3 border-t border-line/70 pt-5 text-sm sm:grid-cols-[max-content_1fr] sm:gap-x-8">
          <Row label="Check-in">{formatLongDate(stay.checkInISO)}</Row>
          <Row label="Check-out">{formatLongDate(stay.checkOutISO)}</Row>
          <Row label="Stay">
            {range} · {nights} {nights === 1 ? "night" : "nights"}
          </Row>
          {stay.confirmation ? (
            <Row label="Confirmation" mono>
              {stay.confirmation}
            </Row>
          ) : null}
        </dl>

        {stay.bookingUrl ? (
          <a
            href={stay.bookingUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-7 inline-flex w-fit items-center gap-2 border-b border-gold/60 pb-1 font-sans text-xs uppercase tracking-widest2 text-ink transition-colors hover:text-gold focus-visible:text-gold"
          >
            <span>Booking page</span>
            <span aria-hidden className="font-serif italic text-gold">→</span>
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

function Row({
  label,
  mono,
  children,
}: {
  label: string;
  mono?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <dt className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
        {label}
      </dt>
      <dd
        className={cn(
          "text-ink/85",
          mono ? "font-mono text-xs uppercase tracking-widest2" : "font-sans"
        )}
      >
        {children}
      </dd>
    </>
  );
}

// ─── Media — Embla on mobile, grid on desktop ──────────────────────────────

function Media({ stay }: { stay: Stay }) {
  const hasImages = stay.images.length > 0;

  if (!hasImages) {
    // Elegant placeholder per city when no photos uploaded yet.
    return <Placeholder city={stay.city} name={stay.name} />;
  }

  return (
    <>
      {/* Mobile carousel */}
      <div className="lg:hidden">
        <EmblaCarousel stay={stay} />
      </div>
      {/* Desktop grid (first image dominant, rest as a strip below) */}
      <div className="hidden lg:block">
        <DesktopGrid stay={stay} />
      </div>
    </>
  );
}

function EmblaCarousel({ stay }: { stay: Stay }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="space-y-3">
      <div
        ref={emblaRef}
        className="overflow-hidden touch-pan-y"
        aria-roledescription="carousel"
        aria-label={`${stay.name} photos`}
      >
        <div className="flex">
          {stay.images.map((img, i) => (
            <div
              key={i}
              className="relative mr-3 aspect-[4/5] min-w-0 flex-[0_0_85%] overflow-hidden bg-paper-soft last:mr-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${stay.images.length}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      {snaps.length > 1 ? (
        <div className="flex justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === selected}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === selected ? "w-6 bg-gold" : "w-1.5 bg-ink/20"
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function DesktopGrid({ stay }: { stay: Stay }) {
  const [main, ...rest] = stay.images;
  return (
    <div className="grid gap-3">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={main.src}
          alt={main.alt}
          width={main.width}
          height={main.height}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      {rest.length > 0 ? (
        <div className="grid grid-cols-3 gap-3">
          {rest.slice(0, 3).map((img, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden bg-paper-soft"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Placeholder({ city, name }: { city: Stay["city"]; name: string }) {
  // City-coloured gradient with a subtle paper grain.  Reads as a held
  // space (not "missing image") and adapts to mobile/desktop.
  const accent = cityMeta[city].accent;
  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden border border-line/60 sm:aspect-[5/4] lg:aspect-[4/5]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(120% 80% at 30% 20%, ${accent} 0%, transparent 55%),
            radial-gradient(100% 60% at 80% 90%, var(--gold-glow) 0%, transparent 55%),
            linear-gradient(160deg, var(--paper-warm) 0%, var(--paper-soft) 100%)
          `,
          opacity: 0.55,
        }}
      />
      {/* Paper grain — many tiny dots */}
      <div
        className="absolute inset-0 opacity-25 mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(10,8,7,0.18) 1px, transparent 0)",
          backgroundSize: "5px 5px",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-7">
        <p className="font-serif text-2xl italic font-light leading-tight text-ink/80 sm:text-3xl">
          {name}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest3 text-ink/55">
          Photos to come
        </p>
      </div>
    </div>
  );
}
