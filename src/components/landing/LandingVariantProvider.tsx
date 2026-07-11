"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { getApplyHref, resolveLandingVariant } from "@/lib/landing/resolveVariant";
import { saveLandingCampaign } from "@/lib/landing/storage";
import { type LandingVariant } from "@/lib/landing/types";

interface LandingVariantContextValue {
  variant: LandingVariant;
  applyHref: string;
}

const LandingVariantContext = createContext<LandingVariantContextValue | null>(null);

interface LandingVariantProviderProps {
  children: ReactNode;
}

export function LandingVariantProvider({ children }: LandingVariantProviderProps) {
  const searchParams = useSearchParams();
  const campaign = searchParams.get("campaign") ?? searchParams.get("variant");

  const value = useMemo(() => {
    const variant = resolveLandingVariant(campaign);
    return {
      variant,
      applyHref: getApplyHref(variant.id),
    };
  }, [campaign]);

  useEffect(() => {
    saveLandingCampaign(campaign);
  }, [campaign]);

  return (
    <LandingVariantContext.Provider value={value}>{children}</LandingVariantContext.Provider>
  );
}

export function useLandingVariant(): LandingVariantContextValue {
  const context = useContext(LandingVariantContext);

  if (!context) {
    const variant = resolveLandingVariant(null);
    return {
      variant,
      applyHref: getApplyHref(variant.id),
    };
  }

  return context;
}
