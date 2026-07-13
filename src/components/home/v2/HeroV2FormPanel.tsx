"use client";

import { HeroEligibilityCard } from "@/components/HeroEligibilityCard";
import { useLandingVariant } from "@/components/landing/LandingVariantProvider";

export function HeroV2FormPanel() {
  const { variant, applyHref } = useLandingVariant();

  return (
    <HeroEligibilityCard
      variant="v2"
      introHeadline={variant.introHeading}
      introBody={variant.supportingCopy}
      ctaLabel={variant.cta}
      trustMessage={variant.firstReassurance}
      applyHref={applyHref}
    />
  );
}
