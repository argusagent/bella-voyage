"use client";

import { useMemo } from "react";
import { cityMeta, type City } from "@/lib/trip-data";
import { cn } from "@/lib/format";

// Reusable filter-pill row used by Restaurants / Activities / Wine Tours.
// "All" + one pill per city present in the data.  Keyboard-accessible
// (arrow keys cycle, Enter/Space activates), tap target ≥ 44px on mobile.

type Value = City | "all";

type Props = {
  value: Value;
  onChange: (v: Value) => void;
  cities: City[]; // cities actually present in the underlying list
  className?: string;
  ariaLabel: string;
};

export function CityFilter({
  value,
  onChange,
  cities,
  className,
  ariaLabel,
}: Props) {
  const options = useMemo<Value[]>(
    () => ["all", ...cities] as Value[],
    [cities]
  );

  if (cities.length <= 1) return null; // single-city filter is noise

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const i = options.indexOf(value);
    const next =
      e.key === "ArrowRight"
        ? options[(i + 1) % options.length]
        : options[(i - 1 + options.length) % options.length];
    e.preventDefault();
    onChange(next);
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={onKey}
      className={cn(
        "no-scrollbar flex gap-2 overflow-x-auto pb-1",
        className
      )}
    >
      {options.map((opt) => {
        const label = opt === "all" ? "All" : cityMeta[opt].name;
        const isActive = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(opt)}
            tabIndex={isActive ? 0 : -1}
            className={cn(
              "shrink-0 snap-start whitespace-nowrap border px-4 py-2 font-mono text-[10px] uppercase tracking-widest2 transition-all",
              "min-h-[40px] sm:min-h-[36px]",
              isActive
                ? "border-gold bg-ink text-paper"
                : "border-line bg-paper text-ink/70 hover:border-gold/60 hover:text-ink"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
