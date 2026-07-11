export type LandingVariantId =
  | "default"
  | "refused-before"
  | "bad-credit"
  | "self-employed"
  | "benefits"
  | "first-time-buyer"
  | "soft-search"
  | "just-browsing"
  | "no-deposit"
  | "negative-equity"
  | "new-to-uk"
  | "fast-decision"
  | "price-budget";

export interface LandingVariant {
  id: LandingVariantId;
  headline: string;
  subtitle: string;
  cta: string;
  trustMessage: string;
  cardIntroHeadline: string;
  cardIntroBody: string;
  reassuranceHeadline: string;
  reassuranceBody: string;
  applicationHeadline: string;
  applicationBody: string;
  applicationCta: string;
}
