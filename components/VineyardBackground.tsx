// Decorative vineyard scene — pure CSS + SVG, no external assets.
//
// Layered from back to front:
//   1. warm sunset gradient (sky → field)
//   2. distant mountain silhouette
//   3. middle hill with vine-row stripes (a repeating linear-gradient)
//   4. nearer hill with denser vine-rows
//   5. soft paper grain on top
//
// `intensity` lets the caller dial the visual presence — 0.55 is the
// default for the landing hero, where text needs to read clearly on top.

type Props = {
  intensity?: number; // 0–1, default 0.55
  className?: string;
};

export function VineyardBackground({ intensity = 0.55, className }: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        className ?? ""
      }`}
      style={{ opacity: intensity }}
    >
      {/* 1 · Sunset gradient sky → field */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #f5e7c8 0%,
              #f0d4a3 28%,
              #e6b986 48%,
              #cf9a6b 62%,
              #a87c54 78%,
              #6e5a3e 100%
            )
          `,
        }}
      />

      {/* 2 · Distant mountain silhouette */}
      <svg
        className="absolute inset-x-0 bottom-[42%] h-[18%] w-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,200 L0,140 L80,90 L150,120 L240,60 L320,100 L420,40 L520,90 L620,55 L720,100 L820,70 L900,110 L1000,75 L1100,105 L1200,85 L1200,200 Z"
          fill="rgba(80, 60, 45, 0.55)"
        />
      </svg>

      {/* 3 · Middle hill with sparse vine-rows */}
      <div
        className="absolute inset-x-0 bottom-[24%] h-[26%]"
        style={{
          background: `
            linear-gradient(
              180deg,
              transparent 0%,
              rgba(115, 95, 55, 0.85) 18%,
              rgba(95, 80, 50, 0.95) 100%
            ),
            repeating-linear-gradient(
              92deg,
              rgba(40, 30, 20, 0) 0px,
              rgba(40, 30, 20, 0) 22px,
              rgba(40, 30, 20, 0.18) 22px,
              rgba(40, 30, 20, 0.18) 24px
            )
          `,
          clipPath:
            "polygon(0 32%, 8% 28%, 18% 30%, 30% 22%, 42% 26%, 55% 18%, 68% 24%, 80% 16%, 92% 22%, 100% 18%, 100% 100%, 0 100%)",
        }}
      />

      {/* 4 · Front hill with dense vine-rows */}
      <div
        className="absolute inset-x-0 bottom-0 h-[32%]"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(85, 65, 40, 0.7) 0%,
              rgba(60, 45, 28, 0.95) 60%,
              rgba(40, 30, 20, 1) 100%
            ),
            repeating-linear-gradient(
              94deg,
              rgba(25, 18, 10, 0) 0px,
              rgba(25, 18, 10, 0) 14px,
              rgba(25, 18, 10, 0.35) 14px,
              rgba(25, 18, 10, 0.35) 16px
            )
          `,
          clipPath:
            "polygon(0 18%, 12% 14%, 25% 22%, 38% 12%, 50% 18%, 62% 10%, 75% 16%, 88% 8%, 100% 14%, 100% 100%, 0 100%)",
        }}
      />

      {/* 5 · Paper grain on top */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(10,8,7,0.45) 1px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* 6 · Soft paper wash so the background never overpowers text */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(245,239,226,0.45) 0%, rgba(245,239,226,0.15) 35%, rgba(245,239,226,0.55) 100%)",
        }}
      />
    </div>
  );
}
