"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/format";

type Tab = { id: string; label: string };

// A section becomes "active" once its top has scrolled above this many
// pixels from the viewport top — i.e., just under the sticky tab bar.
// Slightly larger than the bar height so a few pixels of the new
// section's content are in view before the indicator flips.
const SCROLLSPY_HEADER_OFFSET = 80;

// TabNav — sticky horizontal navigation that:
//   • smoothly scrolls to the matching <section id={tab.id}> on click,
//     accounting for its own sticky height so the section header lands
//     just below the bar (no being clipped under).
//   • follows scroll position via IntersectionObserver and highlights the
//     active section automatically.
//   • on mobile, horizontally snap-scrolls; the active tab autoscrolls
//     into view (centered) so the user always sees where they are.
//   • is fully keyboard-accessible: arrow-left/right cycles tabs, enter
//     activates.  Each tab is a real <a href> so it's link-traversable too.
//
// The sticky offset (`--tabnav-h`) is published as a CSS var on the bar
// so any anchor scroll target can subtract it via scroll-margin-top.

export function TabNav({
  tabs,
  trailingSlot,
}: {
  tabs: Tab[];
  trailingSlot?: React.ReactNode;
}) {
  const [active, setActive] = useState<string>(tabs[0]?.id ?? "");
  const [stuck, setStuck] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Detect when the bar becomes sticky so we can apply a subtle border/shadow.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // Scroll-spy.  Active = the last section whose top has scrolled above
  // the bottom of the sticky header.  This matches what a reader sees:
  // whatever section currently fills the area below the bar is "current".
  // IntersectionObserver-with-trigger-band misses this when scrolling
  // back up, since a section's center may not re-enter the band before
  // the next section pushes it out.
  useEffect(() => {
    const sections = tabs
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const update = () => {
      let bestId = sections[0].id;
      for (const s of sections) {
        const top = s.getBoundingClientRect().top;
        if (top - SCROLLSPY_HEADER_OFFSET <= 0) {
          bestId = s.id;
        } else {
          break;
        }
      }
      setActive((prev) => (prev === bestId ? prev : bestId));
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [tabs]);

  // When `active` changes, autoscroll the bar so the active tab is in view.
  useEffect(() => {
    const bar = barRef.current;
    const el = tabRefs.current[active];
    if (!bar || !el) return;
    const barRect = bar.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const offset = elRect.left - barRect.left + elRect.width / 2 - barRect.width / 2;
    bar.scrollTo({ left: bar.scrollLeft + offset, behavior: "smooth" });
  }, [active]);

  const onTabClick = useCallback(
    (id: string, e?: React.MouseEvent | React.KeyboardEvent) => {
      const target = document.getElementById(id);
      if (!target) return;
      e?.preventDefault();
      // Smooth scroll — sections set scroll-margin-top so the header isn't
      // clipped under the sticky bar.
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
      // Update URL hash without re-triggering scroll.
      history.replaceState(null, "", `#${id}`);
    },
    []
  );

  const onKey = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const i = tabs.findIndex((t) => t.id === active);
      if (i < 0) return;
      const next =
        e.key === "ArrowRight"
          ? tabs[(i + 1) % tabs.length]
          : tabs[(i - 1 + tabs.length) % tabs.length];
      e.preventDefault();
      tabRefs.current[next.id]?.focus();
      onTabClick(next.id);
    },
    [tabs, active, onTabClick]
  );

  return (
    <>
      {/* Sentinel sits just above the sticky position so we know when to apply border */}
      <div ref={sentinelRef} aria-hidden className="h-px w-full" />

      <div
        className={cn(
          "sticky top-0 z-40 -mx-px border-b backdrop-blur-md transition-colors",
          stuck
            ? "border-line bg-paper/85 shadow-[0_1px_0_rgba(184,137,58,0.18)]"
            : "border-transparent bg-paper/60"
        )}
        style={{ ["--tabnav-h" as string]: "60px" }}
      >
        <div className="mx-auto flex h-[60px] max-w-6xl items-stretch px-4 sm:px-8">
          <div
            ref={barRef}
            role="tablist"
            aria-label="Trip sections"
            onKeyDown={onKey}
            className="no-scrollbar flex min-w-0 flex-1 items-stretch gap-1 overflow-x-auto sm:gap-2"
          >
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <a
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                role="tab"
                aria-selected={isActive}
                href={`#${tab.id}`}
                onClick={(e) => onTabClick(tab.id, e)}
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  "group relative flex shrink-0 snap-start items-center px-4 font-mono uppercase tracking-widest2 transition-colors sm:px-5",
                  "text-[11px] sm:text-xs",
                  "min-h-[48px]",
                  isActive ? "font-medium text-ink" : "text-ink/60 hover:text-ink/90"
                )}
              >
                <span>{tab.label}</span>
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-4 bottom-0 h-[2px] origin-left transition-transform duration-300 ease-out sm:inset-x-5",
                    isActive
                      ? "scale-x-100 bg-gold"
                      : "scale-x-0 bg-ink/30 group-hover:scale-x-100"
                  )}
                />
              </a>
            );
          })}
          </div>
          {trailingSlot ? (
            <div className="ml-2 flex shrink-0 items-center pl-2 sm:ml-3 sm:pl-3">
              {/* Subtle gradient mask so scrolling tabs fade behind the slot */}
              <span
                aria-hidden
                className="-ml-6 h-full w-6 bg-gradient-to-r from-transparent to-paper/85"
              />
              {trailingSlot}
            </div>
          ) : null}
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-snap-type: x proximity;
          -webkit-overflow-scrolling: touch;
        }
        section[id] {
          scroll-margin-top: 68px;
        }
      `}</style>
    </>
  );
}
