import { FooterV2 } from "@/components/home/v2/FooterV2";
import { Faqs } from "@/components/Faqs";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { BudgetSearchV2 } from "@/components/home/v2/BudgetSearchV2";
import { FeaturedCarsV2 } from "@/components/home/v2/FeaturedCarsV2";
import { FinalCtaV2 } from "@/components/home/v2/FinalCtaV2";
import { FinanceExplainedV2 } from "@/components/home/v2/FinanceExplainedV2";
import { HowItWorksV2 } from "@/components/home/v2/HowItWorksV2";
import { TrustReviewsV2 } from "@/components/home/v2/TrustReviewsV2";
import { WhyHeroV2 } from "@/components/home/v2/WhyHeroV2";
import { HeroWithVideoV2 } from "@/components/home/v2/HeroWithVideoV2";

/** V2 homepage — hero complete; additional sections can be added below. */
export function HomeV2() {
  return (
    <>
      <main id="main-content" className="overflow-x-clip">
        <HeroWithVideoV2 />
        <HowItWorksV2 />
        <BudgetSearchV2 />
        <WhyHeroV2 />
        <FeaturedCarsV2 />
        <FinanceExplainedV2 />
        <TrustReviewsV2 />
        <Faqs />
        <FinalCtaV2 />
      </main>
      <FooterV2 />
      <StickyMobileCta />
    </>
  );
}
