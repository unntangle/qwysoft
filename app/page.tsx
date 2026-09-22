import { Intelligence } from "@/components/ai/intelligence";
import { DataSection } from "@/components/analytics/data-section";
import { Decisions } from "@/components/analytics/decisions";
import { Developers } from "@/components/developers/developers";
import { Enterprise } from "@/components/enterprise/enterprise";
import { Capabilities } from "@/components/features/capabilities";
import { CoreServices } from "@/components/features/core-services";
import { KeyBenefits } from "@/components/features/key-benefits";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { PlatformIntro } from "@/components/intro/platform-intro";
import { Navbar } from "@/components/navbar/navbar";
import { Engagement } from "@/components/pricing/engagement";
import { Culture } from "@/components/resources/culture";
import { Resources } from "@/components/resources/resources";
import { Accelerators } from "@/components/solutions/accelerators";
import { Solutions } from "@/components/solutions/solutions";
import { CustomerStory } from "@/components/testimonials/customer-story";
import { Trust } from "@/components/trust/trust";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Trust />
        <PlatformIntro />
        <CoreServices />
        <Capabilities />
        <Decisions />
        <Intelligence />
        <DataSection />
        <Solutions />
        <Accelerators />
        <Enterprise />
        <Developers />
        <KeyBenefits />
        <CustomerStory />
        <Engagement />
        <Resources />
        <Culture />
      </main>
      <Footer />
    </>
  );
}
