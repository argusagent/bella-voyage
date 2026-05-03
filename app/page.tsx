import { Hero } from "@/components/Hero";
import { TabNav } from "@/components/TabNav";
import { TripSection } from "@/components/TripSection";
import { LodgingSection } from "@/components/LodgingSection";
import { FlightsSection } from "@/components/FlightsSection";
import { ItinerarySection } from "@/components/ItinerarySection";
import { Footer } from "@/components/Footer";
import { Countdown } from "@/components/Countdown";
import { flights, stays, timeline } from "@/lib/trip-data";

// Single-route home — the QR code drops Bella here.  Hero plays its
// staggered reveal, then the sticky four-tab nav (Trip · Lodging ·
// Flights · Itinerary) takes over with the live countdown anchored to
// its trailing edge.

export const metadata = {
  title: "Bella's Graduation Voyage — Paris, Beaune & Lausanne · June 2026",
  description:
    "Seven nights, three cities — the trip, the rooms, the flights, and the day-by-day plan.",
};

export default function Home() {
  const tabs = [
    { id: "trip", label: "Trip" },
    stays.length > 0 && { id: "lodging", label: "Lodging" },
    flights.length > 0 && { id: "flights", label: "Flights" },
    timeline.length > 0 && { id: "itinerary", label: "Itinerary" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <main className="min-h-screen bg-paper">
      <Hero />
      <TabNav tabs={tabs} trailingSlot={<Countdown variant="pill" />} />
      <TripSection />
      <LodgingSection />
      <FlightsSection />
      <ItinerarySection />
      <Footer />
    </main>
  );
}
