"use client";

// Tiny client island for the /qr page — calls window.print() so the
// user can save the QR card as a PDF or send it straight to a printer.
// Hidden in print stylesheet so it doesn't appear on the printed page.

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 font-sans text-[11px] uppercase tracking-widest2 text-ink/85 transition-all hover:border-gold hover:text-ink focus-visible:border-gold sm:px-6 sm:py-3 sm:text-xs"
    >
      <span>Print</span>
      <svg
        aria-hidden
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        className="text-gold transition-transform group-hover:translate-y-px"
      >
        <path
          d="M4 5V2h8v3M4 11h8v3H4zM3 5h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-1M3 11H2a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
