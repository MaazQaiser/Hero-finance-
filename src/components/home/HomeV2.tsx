import { FinalCta } from "@/components/FinalCta";
import { FooterV2 } from "@/components/home/v2/FooterV2";
import { Faqs } from "@/components/Faqs";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { BudgetSearchV2 } from "@/components/home/v2/BudgetSearchV2";
import { FeaturedCarsV2 } from "@/components/home/v2/FeaturedCarsV2";
import { FinanceExplainedV2 } from "@/components/home/v2/FinanceExplainedV2";
import { HowItWorksV2 } from "@/components/home/v2/HowItWorksV2";
import { PcpExplainedV2 } from "@/components/home/v2/PcpExplainedV2";
import { TrustReviewsV2 } from "@/components/home/v2/TrustReviewsV2";
import { WhatYouNeedV2 } from "@/components/home/v2/WhatYouNeedV2";
import { WhoHeroHelpsV2 } from "@/components/home/v2/WhoHeroHelpsV2";
import { WhyHeroV2 } from "@/components/home/v2/WhyHeroV2";
import { HeroWithVideoV2 } from "@/components/home/v2/HeroWithVideoV2";

/** V2 homepage — wording aligned to Hero_Homepage_Wording_Changes.docx */
export function HomeV2() {
  return (
    <>
      <main id="main-content" className="overflow-x-clip">
        <HeroWithVideoV2 />
        <HowItWorksV2 />
        <BudgetSearchV2 />
        <WhyHeroV2 />
        <WhoHeroHelpsV2 />
        <FeaturedCarsV2 />
        <FinanceExplainedV2 />
        <PcpExplainedV2 />
        <WhatYouNeedV2 />
        <TrustReviewsV2 />
        <Faqs />
        <FinalCta />
      </main>
      <FooterV2 />
      <StickyMobileCta />
    </>
  );
}
