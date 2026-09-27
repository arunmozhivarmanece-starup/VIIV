import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { BusinessSideOfTech } from "@/components/sections/BusinessSideOfTech";
import { CareerPaths } from "@/components/sections/CareerPaths";
import { CareerReadiness } from "@/components/sections/CareerReadiness";
import { CareerTransformation } from "@/components/sections/CareerTransformation";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FounderSection } from "@/components/sections/FounderSection";
import { FullStackSales } from "@/components/sections/FullStackSales";
import { GraduateReality } from "@/components/sections/GraduateReality";
import { Hero } from "@/components/sections/Hero";
import { HiddenJobMarket } from "@/components/sections/HiddenJobMarket";
import { LearnByDoing } from "@/components/sections/LearnByDoing";
import { ProofOfWork } from "@/components/sections/ProofOfWork";
import { SalesStack } from "@/components/sections/SalesStack";
import { SkillGap } from "@/components/sections/SkillGap";
import { VIIVMethod } from "@/components/sections/VIIVMethod";
import { WebinarSection } from "@/components/sections/WebinarSection";
import { WhySales } from "@/components/sections/WhySales";
import { StructuredData } from "@/components/StructuredData";

/**
 * Homepage narrative (see README): I need a job → my options are bigger →
 * business careers beyond coding → sales is a business career → skill gap →
 * Full-Stack Sales teaches it → practice + proof → real experience → free webinar.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <GraduateReality />
        <HiddenJobMarket />
        <BusinessSideOfTech />
        <CareerPaths />
        <WhySales />
        <SkillGap />
        <FullStackSales />
        <SalesStack />
        <LearnByDoing />
        <VIIVMethod />
        <ProofOfWork />
        <CareerReadiness />
        <CareerTransformation />
        <FounderSection />
        <WebinarSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
      <StructuredData />
    </>
  );
}
