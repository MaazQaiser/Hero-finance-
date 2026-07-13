export type LandingVariantId =
  | "default"
  | "bad-credit"
  | "refused-finance"
  | "self-employed"
  | "first-time-buyer"
  | "no-deposit"
  | "affordability"
  // Legacy IDs kept for existing campaign links
  | "refused-before"
  | "benefits"
  | "soft-search"
  | "just-browsing"
  | "negative-equity"
  | "new-to-uk"
  | "fast-decision"
  | "price-budget";

/**
 * Central message-matching config.
 * Layout stays identical — only these strings change per campaign.
 */
export interface LandingVariant {
  id: LandingVariantId;
  /** Hero / eligibility intro heading */
  introHeading: string;
  /** Hero / eligibility supporting copy */
  supportingCopy: string;
  /** Primary CTA label */
  cta: string;
  /** First reassurance message (landing + application) */
  firstReassurance: string;
  /** Application welcome heading — continues the same conversation */
  applicationIntroHeading: string;
  /** Application welcome supporting copy */
  applicationSupportingCopy: string;
  /** Application primary CTA */
  applicationCta: string;
}

/** Convenience accessors used by existing landing sections */
export function getHeroHeadline(variant: LandingVariant): string {
  return variant.introHeading;
}

export function getHeroSubtitle(variant: LandingVariant): string {
  return variant.supportingCopy;
}
