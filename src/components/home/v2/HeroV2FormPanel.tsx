"use client";

import { HeroEligibilityCard } from "@/components/HeroEligibilityCard";
import { useLandingVariant } from "@/components/landing/LandingVariantProvider";

const DEFAULT_CARD_HEADLINE = "Start my soft search";
const DEFAULT_CARD_BODY =
  "Answer a few questions. Soft search only — no impact on your credit score.";

export function HeroV2FormPanel() {
  const { variant, applyHref } = useLandingVariant();
  const isDefault = variant.id === "default";

  return (
    <HeroEligibilityCard
      variant="v2"
      introHeadline={isDefault ? DEFAULT_CARD_HEADLINE : variant.applicationIntroHeading}
      introBody={isDefault ? DEFAULT_CARD_BODY : variant.applicationSupportingCopy}
      ctaLabel={isDefault ? "See what you can afford" : variant.cta}
      trustMessage={variant.firstReassurance}
      applyHref={applyHref}
    />
  );
}
