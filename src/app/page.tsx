import { HeroWithVideo } from "@/components/HeroWithVideo";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyHero } from "@/components/WhyHero";
import { BudgetSearch } from "@/components/BudgetSearch";
import { FeaturedCars } from "@/components/FeaturedCars";
import { FinanceExplained } from "@/components/FinanceExplained";
import { TrustReviews } from "@/components/TrustReviews";
import { Faqs } from "@/components/Faqs";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { StickyMobileCta } from "@/components/StickyMobileCta";

export default function Home() {
  return (
    <>
      <main>
        <HeroWithVideo />
        <HowItWorks />
        <BudgetSearch />
        <WhyHero />
        <FeaturedCars />
        <FinanceExplained />
        <TrustReviews />
        <Faqs />
        <FinalCta />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
