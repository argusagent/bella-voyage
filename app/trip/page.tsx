import { Hero } from "@/components/Hero";
import { TabNav } from "@/components/TabNav";
import { OverviewSection } from "@/components/OverviewSection";
import { CitiesSection } from "@/components/CitiesSection";
import { LodgingSection } from "@/components/LodgingSection";
import { FlightsSection } from "@/components/FlightsSection";
import { ItinerarySection } from "@/components/ItinerarySection";
import { Footer } from "@/components/Footer";
import { Countdown } from "@/components/Countdown";
import { flights, stays, timeline } from "@/lib/trip-data";

// /trip — the full itinerary site.  Five-tab nav (Overview, Cities,
// Lodging, Flights, Itinerary).  Tabs are built from data presence so
// empty sections never render — and the Countdown pill is anchored to
// the trailing edge of the sticky TabNav for a constant departure cue.

export const metadata = {
  title: "Trip details — Bella's Graduation Voyage",
  description:
    "Full itinerary: cities, lodging, flights, and the day-by-day plan.",
};

export default function TripPage() {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "cities", label: "Cities" },
    stays.length > 0 && { id: "lodging", label: "Lodging" },
    flights.length > 0 && { id: "flights", label: "Flights" },
    timeline.length > 0 && { id: "itinerary", label: "Itinerary" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <main className="min-h-screen bg-paper">
      <Hero />
      <TabNav tabs={tabs} trailingSlot={<Countdown variant="pill" />} />
      <OverviewSection />
      <CitiesSection />
      <LodgingSection />
      <FlightsSection />
      <ItinerarySection />
      <Footer />
    </main>
  );
}
