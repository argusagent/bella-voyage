"use client";

import { useEffect, useState } from "react";
import {
  getCountdownState,
  formatCountdownShort,
  formatCountdownLong,
  type CountdownState,
} from "@/lib/countdown";
import { cn } from "@/lib/format";

// Countdown — three render variants:
//
//   "pill"      tiny sticky badge (used top-right on /trip)
//   "statement" big serif number (used inline on the Landing hero)
//   "inline"    one-line text (any caption position)
//
// State is computed from `new Date()` on the client; we don't render
// anything during SSR to avoid hydration mismatches when the server's
// "today" disagrees with the user's local "today".  A 60-minute interval
// re-checks so a session left open over midnight rolls forward correctly.

type Variant = "pill" | "statement" | "inline";

export function Countdown({
  variant = "pill",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const [state, setState] = useState<CountdownState | null>(null);

  useEffect(() => {
    // Guard against same-value updates so the hourly tick doesn't
    // re-render the rest of the page when the displayed string is
    // identical (true for the 23 hours between midnight rollovers).
    let last: string | null = null;
    const update = () => {
      const next = getCountdownState();
      const key = JSON.stringify(next);
      if (key === last) return;
      last = key;
      setState(next);
    };
    update();
    const id = setInterval(update, 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  if (!state) {
    // SSR placeholder: hold the visual space so the layout doesn't jump.
    if (variant === "pill") {
      return (
        <span
          aria-hidden
          className={cn(
            "inline-block min-w-[5.5rem] rounded-full border border-line bg-paper/80 px-3 py-1.5 text-center font-mono text-[11px] uppercase tracking-widest3 text-transparent",
            className
          )}
        >
          ·
        </span>
      );
    }
    return null;
  }

  if (variant === "pill") return <Pill state={state} className={className} />;
  if (variant === "statement")
    return <Statement state={state} className={className} />;
  return <Inline state={state} className={className} />;
}

function Pill({
  state,
  className,
}: {
  state: CountdownState;
  className?: string;
}) {
  const label =
    state.phase === "before"
      ? `${formatCountdownShort(state)} away`
      : formatCountdownShort(state);
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={formatCountdownLong(state)}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-gold/40 bg-paper/90 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest2 text-ink shadow-[0_4px_16px_-8px_rgba(10,8,7,0.25)] backdrop-blur-md",
        "sm:px-4 sm:py-2 sm:text-xs",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "block h-1.5 w-1.5 rounded-full",
          state.phase === "live"
            ? "animate-pulse bg-gold"
            : state.phase === "before"
              ? "bg-gold"
              : "bg-ink/40"
        )}
      />
      <span>{label}</span>
    </span>
  );
}

function Statement({
  state,
  className,
}: {
  state: CountdownState;
  className?: string;
}) {
  // Big numeric flourish for the landing.  Different shape per phase.
  if (state.phase === "before") {
    return (
      <div className={cn("flex items-baseline justify-center gap-3", className)}>
        <span className="font-serif text-[clamp(56px,14vw,120px)] font-light leading-none tracking-tight text-ink">
          {state.daysUntil}
        </span>
        <span className="font-serif text-lg italic font-light text-ink/75 sm:text-xl">
          {state.daysUntil === 1 ? "day" : "days"}{" "}
          <span className="text-gold">until departure</span>
        </span>
      </div>
    );
  }
  if (state.phase === "live") {
    return (
      <div className={cn("flex items-baseline justify-center gap-3", className)}>
        <span className="font-serif text-[clamp(56px,14vw,120px)] font-light leading-none tracking-tight text-ink">
          {state.dayIndex}
        </span>
        <span className="font-serif text-lg italic font-light text-ink/75 sm:text-xl">
          of {state.totalDays} <span className="text-gold">— live now</span>
        </span>
      </div>
    );
  }
  return (
    <p
      className={cn(
        "font-serif text-2xl italic font-light text-ink/75 sm:text-3xl",
        className
      )}
    >
      Welcome <span className="text-gold">home</span>.
    </p>
  );
}

function Inline({
  state,
  className,
}: {
  state: CountdownState;
  className?: string;
}) {
  return (
    <span className={className}>{formatCountdownLong(state)}</span>
  );
}
