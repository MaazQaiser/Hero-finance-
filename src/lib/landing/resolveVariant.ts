import { getLandingVariant, landingVariants } from "./variants";
import { type LandingVariant, type LandingVariantId } from "./types";

/**
 * Maps PPC / ads query values onto canonical variant IDs.
 * Prefer ?campaign= or ?variant=
 */
const CAMPAIGN_ALIASES: Record<string, LandingVariantId> = {
  default: "default",

  "bad-credit": "bad-credit",
  badcredit: "bad-credit",
  "bad_credit": "bad-credit",

  "refused-finance": "refused-finance",
  refusedfinance: "refused-finance",
  refused: "refused-finance",
  "refused-before": "refused-finance",
  "been-refused": "refused-finance",

  "self-employed": "self-employed",
  selfemployed: "self-employed",

  "first-time-buyer": "first-time-buyer",
  firsttime: "first-time-buyer",
  "first-time": "first-time-buyer",

  "no-deposit": "no-deposit",
  nodeposit: "no-deposit",

  affordability: "affordability",
  afford: "affordability",
  budget: "affordability",
  "price-budget": "affordability",

  // Legacy extras still supported
  benefits: "benefits",
  "non-standard-income": "benefits",
  "soft-search": "soft-search",
  softsearch: "soft-search",
  "just-browsing": "just-browsing",
  browsing: "just-browsing",
  "negative-equity": "negative-equity",
  negativeequity: "negative-equity",
  "new-to-uk": "new-to-uk",
  newtouk: "new-to-uk",
  "fast-decision": "fast-decision",
  fast: "fast-decision",
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
  const canonical = normalizeCampaignParam(variantId) ?? variantId;
  if (canonical === "default") return "/apply";
  return `/apply?campaign=${canonical}`;
}
