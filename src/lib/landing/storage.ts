import { normalizeCampaignParam } from "./resolveVariant";
import { type LandingVariantId } from "./types";

const CAMPAIGN_STORAGE_KEY = "hero-landing-campaign";

export function saveLandingCampaign(campaign: string | null | undefined): void {
  if (typeof window === "undefined") return;

  const id = normalizeCampaignParam(campaign);
  if (!id || id === "default") {
    sessionStorage.removeItem(CAMPAIGN_STORAGE_KEY);
    return;
  }

  sessionStorage.setItem(CAMPAIGN_STORAGE_KEY, id);
}

export function loadLandingCampaign(): LandingVariantId | null {
  if (typeof window === "undefined") return null;

  const stored = sessionStorage.getItem(CAMPAIGN_STORAGE_KEY);
  return normalizeCampaignParam(stored);
}
