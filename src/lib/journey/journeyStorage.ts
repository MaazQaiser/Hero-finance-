import { type JourneyVariantId } from "./journeyVariants";

const JOURNEY_STORAGE_KEY = "hero-apply-journey";

export function saveJourneyVariantId(id: JourneyVariantId): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(JOURNEY_STORAGE_KEY, id);
}

export function loadJourneyVariantId(): JourneyVariantId | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(JOURNEY_STORAGE_KEY);
    return raw ? (raw as JourneyVariantId) : null;
  } catch {
    return null;
  }
}
