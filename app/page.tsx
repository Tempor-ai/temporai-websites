import { FeaturesSectionContainer } from "@/components/FeaturesSectionContainer";
import Footer from "@/components/Footer";
import { GlowingEffectContainer } from "@/components/GlowingEffectContainer";
import Hero from "@/components/Hero";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { MilestonesSection } from "@/components/MilestonesSection";
import Navbar from "@/components/Navbar";
import { PilotCaseStudySection } from "@/components/PilotCaseStudySection";
import { ProductSpotlightSection } from "@/components/ProductSpotlightSection";
import { TrustSafetySection } from "@/components/TrustSafetySection";
import { WhoItsForSection } from "@/components/WhoItsForSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <GlowingEffectContainer />
        <HowItWorksSection />
        <ProductSpotlightSection />
        <FeaturesSectionContainer />
        <TrustSafetySection />
        <PilotCaseStudySection />
        <MilestonesSection />
        <WhoItsForSection />
        <Footer />
      </main>
    </>
  );
}
