import { resolveLandingVariant, normalizeCampaignParam } from "@/lib/landing/resolveVariant";
import { type LandingVariantId } from "@/lib/landing/types";
import {
  type JourneyVariant,
  type JourneyVariantId,
  journeyVariants,
  mergeJourneyWithLanding,
} from "./journeyVariants";

export interface JourneyResolveInput {
  campaign?: string | null;
  variant?: string | null;
  vehicleId?: string | null;
  source?: string | null;
}

const LANDING_TO_JOURNEY: Partial<Record<LandingVariantId, JourneyVariantId>> = {
  default: "default",
  "bad-credit": "badCredit",
  "refused-finance": "declined",
  "refused-before": "declined",
  "self-employed": "selfEmployed",
  "first-time-buyer": "firstTimeBuyer",
  "no-deposit": "noDeposit",
  affordability: "calculator",
  "price-budget": "calculator",
  "soft-search": "softSearch",
  benefits: "default",
  "just-browsing": "calculator",
  "negative-equity": "negativeEquity",
  "new-to-uk": "default",
  "fast-decision": "fastDecision",
};

export function resolveJourneyVariantId(input: JourneyResolveInput = {}): JourneyVariantId {
  if (input.vehicleId?.trim()) return "vehicle";

  const source = input.source?.trim().toLowerCase();
  if (source === "calculator") return "calculator";

  const campaignParam = input.campaign ?? input.variant;
  const landingId = normalizeCampaignParam(campaignParam);

  if (landingId && LANDING_TO_JOURNEY[landingId]) {
    return LANDING_TO_JOURNEY[landingId]!;
  }

  return "default";
}

export function resolveJourneyVariant(input: JourneyResolveInput = {}): JourneyVariant {
  const id = resolveJourneyVariantId(input);
  const base = journeyVariants[id] ?? journeyVariants.default;

  const campaignParam = input.campaign ?? input.variant;
  const landingId = normalizeCampaignParam(campaignParam);
  const landing = landingId ? resolveLandingVariant(landingId) : null;

  if (id === "vehicle" || !landing || landing.id === "default") {
    return base;
  }

  return mergeJourneyWithLanding(base, landing);
}

export function getJourneyVariantById(id: JourneyVariantId): JourneyVariant {
  return journeyVariants[id] ?? journeyVariants.default;
}
