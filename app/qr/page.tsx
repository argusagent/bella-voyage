import QRCode from "qrcode";
import { PrintButton } from "@/components/PrintButton";

// /qr — printable QR-code page.  The server pre-renders the SVG at build
// time so the page is fully static, no client JS needed to display the
// code.  The same code is also written to public/bella-voyage-qr.{svg,png}
// for download; the buttons below link to those static files.
//
// Print-friendly: white background on print media, all chrome hides, the
// code centers and fills the page.

const SITE_URL = "https://bella-voyage.vercel.app/";

export const metadata = {
  title: "Scan — Bella's Graduation Voyage",
  description: "Printable QR code that drops you on the trip site.",
};

export default async function QrPage() {
  const svg = await QRCode.toString(SITE_URL, {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 2,
    color: { dark: "#0a0807", light: "#f5efe2" },
    width: 600,
  });

  return (
    <main className="min-h-screen bg-paper px-6 py-14 sm:px-10 sm:py-20 print:bg-white print:py-0">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="flex items-center gap-3 print:hidden">
          <span className="block h-px w-10 bg-gold" />
          <span className="font-sans text-[11px] uppercase tracking-widest3 text-ink/60">
            For Bella · scan to open
          </span>
          <span className="block h-px w-10 bg-gold" />
        </div>

        <h1 className="mt-6 font-serif text-[clamp(36px,8vw,64px)] font-light leading-[1] tracking-tight text-ink print:mt-0 print:text-5xl">
          Bella&rsquo;s Graduation
          <span className="block italic text-gold">Voyage</span>
        </h1>

        <p className="mt-3 font-serif text-base italic font-light text-ink/70 sm:text-lg print:text-base">
          Seven nights · Paris, Beaune &amp; Lake Geneva · June 2026
        </p>

        <figure
          className="mt-10 flex w-full max-w-md flex-col items-center border border-line bg-paper-bone p-6 sm:p-8 print:mt-6 print:border-2 print:border-ink print:bg-white"
          aria-label="QR code linking to bella-voyage.vercel.app"
        >
          <div
            className="aspect-square w-full"
            // The qrcode library returns a complete <svg> element with the
            // right viewBox; rendering it via dangerouslySetInnerHTML is
            // the simplest path and the server-rendered output is static
            // (no user input).
            dangerouslySetInnerHTML={{ __html: svg }}
          />
          <figcaption className="mt-5 font-sans text-[11px] uppercase tracking-widest3 text-ink/65 sm:text-xs print:text-[11px]">
            bella-voyage.vercel.app
          </figcaption>
        </figure>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
          <a
            href="/bella-voyage-qr.png"
            download="bella-voyage-qr.png"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/85 bg-ink px-5 py-2.5 font-sans text-[11px] uppercase tracking-widest2 text-paper transition-all hover:border-gold focus-visible:border-gold sm:px-6 sm:py-3 sm:text-xs"
          >
            <span>Download PNG</span>
            <span aria-hidden className="font-serif italic text-gold-glow transition-transform group-hover:translate-y-px">
              ↓
            </span>
          </a>

          <a
            href="/bella-voyage-qr.svg"
            download="bella-voyage-qr.svg"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 font-sans text-[11px] uppercase tracking-widest2 text-ink/80 transition-all hover:border-gold hover:text-ink sm:px-6 sm:py-3 sm:text-xs"
          >
            <span>Download SVG</span>
            <span aria-hidden className="font-serif italic text-gold transition-transform group-hover:translate-y-px">
              ↓
            </span>
          </a>

          <PrintButton />
        </div>

        <div className="mt-10 max-w-md font-sans text-sm leading-relaxed text-ink/65 print:hidden">
          <p>
            Print this card, screenshot it, or text Bella the PNG. Scanning
            opens the live site at the <em className="italic text-gold">Trip</em> tab.
          </p>
          <p className="mt-3 font-sans text-[11px] uppercase tracking-widest3 text-ink/55">
            High error-correction · scans even when partially covered
          </p>
        </div>

        <p className="mt-12 font-serif text-sm italic font-light text-ink/55 print:mt-6 print:text-xs">
          For Bella — congratulations.
        </p>
      </div>
    </main>
  );
}
