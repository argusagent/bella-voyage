"use client";

// Tiny client island for the /qr page — calls window.print() so the
// user can save the QR card as a PDF or send it straight to a printer.
// Hidden in print stylesheet so it doesn't appear on the printed page.

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="group inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 font-mono text-[10px] uppercase tracking-widest2 text-ink/80 transition-all hover:border-gold hover:text-ink sm:px-6 sm:py-3 sm:text-[11px]"
    >
      <span>Print</span>
      <span
        aria-hidden
        className="font-serif italic text-gold transition-transform group-hover:translate-x-px"
      >
        ⎙
      </span>
    </button>
  );
}
