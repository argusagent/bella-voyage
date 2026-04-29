import { WelcomeReveal } from "@/components/WelcomeReveal";

// /welcome — the gift moment.  Slow 1.5s fade-in, italic Cormorant
// reveal, then a single quiet "Open the journey" CTA that crossfades
// into the main site.  Designed for the QR-code first-touch.

export const metadata = {
  title: "For Bella — a journey, in eight nights",
};

export default function WelcomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 py-20">
      <WelcomeReveal />
    </main>
  );
}
