"use client";

import { HeroEligibilityCard } from "@/components/HeroEligibilityCard";
import { useLandingVariant } from "@/components/landing/LandingVariantProvider";

const DEFAULT_CARD_HEADLINE = "See what you can afford";
const DEFAULT_CARD_BODY =
  "Answer a few questions and see what you can afford. Soft search, no impact on your credit score.";

export function HeroV2FormPanel() {
  const { variant, applyHref } = useLandingVariant();
  const isDefault = variant.id === "default";

  return (
    <HeroEligibilityCard
      variant="v2"
      introHeadline={isDefault ? DEFAULT_CARD_HEADLINE : variant.introHeading}
      introBody={isDefault ? DEFAULT_CARD_BODY : variant.supportingCopy}
      ctaLabel={variant.cta}
      trustMessage={variant.firstReassurance}
      applyHref={applyHref}
    />
  );
}
