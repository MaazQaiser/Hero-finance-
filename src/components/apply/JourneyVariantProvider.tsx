"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { type JourneyVariant } from "@/lib/journey/journeyVariants";
import { getJourneyBehaviour, type JourneyBehaviour } from "@/lib/journey/journeyBehaviour";
import { resolveJourneyVariant } from "@/lib/journey/resolveJourney";
import { loadJourneyVariantId, saveJourneyVariantId } from "@/lib/journey/journeyStorage";
import { getJourneyVariantById } from "@/lib/journey/resolveJourney";

const JourneyVariantContext = createContext<JourneyVariant | null>(null);

interface JourneyVariantProviderProps {
  children: ReactNode;
  campaign?: string;
  variant?: string;
  vehicleId?: string;
  source?: string;
}

export function JourneyVariantProvider({
  children,
  campaign,
  variant,
  vehicleId,
  source,
}: JourneyVariantProviderProps) {
  const journey = useMemo(() => {
    const hasEntryContext = Boolean(campaign || variant || vehicleId || source);

    if (hasEntryContext) {
      const resolved = resolveJourneyVariant({ campaign, variant, vehicleId, source });
      saveJourneyVariantId(resolved.id);
      return resolved;
    }

    const savedId = loadJourneyVariantId();
    if (savedId) {
      return getJourneyVariantById(savedId);
    }

    return resolveJourneyVariant();
  }, [campaign, source, variant, vehicleId]);

  return (
    <JourneyVariantContext.Provider value={journey}>{children}</JourneyVariantContext.Provider>
  );
}

export function useJourneyVariant(): JourneyVariant {
  const context = useContext(JourneyVariantContext);
  if (!context) {
    throw new Error("useJourneyVariant must be used within JourneyVariantProvider");
  }
  return context;
}

export function useJourneyBehaviour(): JourneyBehaviour {
  const journey = useJourneyVariant();
  return useMemo(() => getJourneyBehaviour(journey.id), [journey.id]);
}
