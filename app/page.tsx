import { Capabilities } from "@/components/features/capabilities";
import { CoreServices } from "@/components/features/core-services";
import { KeyBenefits } from "@/components/features/key-benefits";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { PlatformIntro } from "@/components/intro/platform-intro";
import { WhoWeAre } from "@/components/intro/who-we-are";
import { Navbar } from "@/components/navbar/navbar";
import { Resources } from "@/components/resources/resources";
import { Accelerators } from "@/components/solutions/accelerators";
import { Solutions } from "@/components/solutions/solutions";
import { DedicatedTeams } from "@/components/teams/dedicated-teams";
import { Trust } from "@/components/trust/trust";

// Removed from the homepage (components kept in the codebase): Intelligence
// (Applied AI), DataSection (Real-time insights), Enterprise, Developers, Culture (team teaser), Engagement (pricing), Decisions, CustomerStory.
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <WhoWeAre />
        <Trust />
        <PlatformIntro />
        <CoreServices />
        <Capabilities />
        <Solutions />
        <DedicatedTeams />
        <Accelerators />
        <KeyBenefits />
        <Resources />
      </main>
      <Footer />
    </>
  );
}
