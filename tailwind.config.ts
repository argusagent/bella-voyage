import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Source-of-truth palette — keep in sync with globals.css :root.
        ink: {
          DEFAULT: "#0a0807",
          2: "#15110d",
        },
        paper: {
          DEFAULT: "#f5efe2",
          warm: "#ebe2cf",
          soft: "#ddd2b9",
          bone: "#f9f4e8",
        },
        gold: {
          DEFAULT: "#b8893a",
          soft: "#d4ad5f",
          glow: "#e6c585",
        },
        vintage: "#7d6543",
        lake: "#6b8a9e",
        rouge: "#8b3a2e",
      },
      fontFamily: {
        // Driven by next/font → CSS variables on <html>.
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        wider2: "0.18em",
        widest2: "0.22em",
        widest3: "0.28em",
      },
      boxShadow: {
        soft: "0 30px 60px -20px rgba(10, 8, 7, 0.18)",
        deep: "0 40px 80px -30px rgba(10, 8, 7, 0.4)",
      },
      keyframes: {
        revealUp: {
          "0%": { transform: "translateY(110%)" },
          "100%": { transform: "translateY(0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        revealUp: "revealUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        fadeUp: "fadeUp 1s ease-out both",
        fadeIn: "fadeIn 1.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
