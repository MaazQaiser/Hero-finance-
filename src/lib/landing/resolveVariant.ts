import { getLandingVariant, landingVariants } from "./variants";
import { type LandingVariant, type LandingVariantId } from "./types";

const CAMPAIGN_ALIASES: Record<string, LandingVariantId> = {
  default: "default",
  refused: "refused-before",
  "refused-before": "refused-before",
  "been-refused": "refused-before",
  "bad-credit": "bad-credit",
  badcredit: "bad-credit",
  "self-employed": "self-employed",
  selfemployed: "self-employed",
  benefits: "benefits",
  "non-standard-income": "benefits",
  "first-time-buyer": "first-time-buyer",
  firsttime: "first-time-buyer",
  "soft-search": "soft-search",
  softsearch: "soft-search",
  "just-browsing": "just-browsing",
  browsing: "just-browsing",
  "no-deposit": "no-deposit",
  nodeposit: "no-deposit",
  "negative-equity": "negative-equity",
  negativeequity: "negative-equity",
  "new-to-uk": "new-to-uk",
  newtouk: "new-to-uk",
  "fast-decision": "fast-decision",
  fast: "fast-decision",
  "price-budget": "price-budget",
  budget: "price-budget",
};

export function normalizeCampaignParam(value: string | null | undefined): LandingVariantId | null {
  if (!value?.trim()) return null;

  const key = value.trim().toLowerCase().replace(/_/g, "-");
  const resolved = CAMPAIGN_ALIASES[key];

  if (resolved) return resolved;
  if (key in landingVariants) return key as LandingVariantId;

  return null;
}

export function resolveLandingVariant(campaign: string | null | undefined): LandingVariant {
  const id = normalizeCampaignParam(campaign);
  return getLandingVariant(id ?? "default");
}

export function getApplyHref(variantId: LandingVariantId): string {
  if (variantId === "default") return "/apply";
  return `/apply?campaign=${variantId}`;
}
