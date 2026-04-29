import { Hero } from "@/components/Hero";
import { TabNav } from "@/components/TabNav";
import { CitiesSection } from "@/components/CitiesSection";
import { RouteSection } from "@/components/RouteSection";
import { WingsSection } from "@/components/WingsSection";
import { DaysSection } from "@/components/DaysSection";
import { StaysSection } from "@/components/StaysSection";
import { RestaurantsSection } from "@/components/RestaurantsSection";
import { ActivitiesSection } from "@/components/ActivitiesSection";
import { WineToursSection } from "@/components/WineToursSection";
import { Footer } from "@/components/Footer";
import {
  flights,
  stays,
  timeline,
  restaurants,
  activities,
  wineTours,
} from "@/lib/trip-data";

// Phase 2 — full home page.  Sections render conditionally on the
// presence of data in lib/trip-data.ts.  The TabNav rebuilds itself
// from the same conditions so the nav and the page can never drift.

export default function Home() {
  // Build the tab list from data presence — empty sections never appear,
  // and never have a tab pointing into nothing.
  const tabs = [
    { id: "cities", label: "Cities" },
    { id: "route", label: "Route" },
    flights.length > 0 && { id: "wings", label: "Wings" },
    timeline.length > 0 && { id: "days", label: "Days" },
    stays.length > 0 && { id: "stays", label: "Stays" },
    restaurants.length > 0 && { id: "restaurants", label: "Tables" },
    activities.length > 0 && { id: "activities", label: "Sights" },
    wineTours.length > 0 && { id: "wine", label: "Vineyards" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <main className="min-h-screen bg-paper">
      <Hero />
      <TabNav tabs={tabs} />
      <CitiesSection />
      <RouteSection />
      <WingsSection />
      <DaysSection />
      <StaysSection />
      <RestaurantsSection />
      <ActivitiesSection />
      <WineToursSection />
      <Footer />
    </main>
  );
}
