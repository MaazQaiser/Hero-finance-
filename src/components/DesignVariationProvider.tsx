"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  type DesignVariation,
  DESIGN_VARIATION_STORAGE_KEY,
  getStoredDesignVariation,
} from "@/lib/design-variation";

interface DesignVariationContextValue {
  variation: DesignVariation;
  ready: boolean;
  setVariation: (variation: DesignVariation) => void;
  toggleVariation: () => void;
}

const DesignVariationContext = createContext<DesignVariationContextValue | null>(null);

export function DesignVariationProvider({ children }: { children: ReactNode }) {
  const [variation, setVariationState] = useState<DesignVariation>("v1");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setVariationState(getStoredDesignVariation());
    setReady(true);
  }, []);

  const setVariation = useCallback((next: DesignVariation) => {
    setVariationState(next);
    try {
      window.localStorage.setItem(DESIGN_VARIATION_STORAGE_KEY, next);
    } catch {
      // Ignore storage failures (private browsing, etc.)
    }
    document.documentElement.dataset.designVariation = next;
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.designVariation = variation;
  }, [ready, variation]);

  const toggleVariation = useCallback(() => {
    setVariation(variation === "v1" ? "v2" : "v1");
  }, [setVariation, variation]);

  const value = useMemo(
    () => ({ variation, ready, setVariation, toggleVariation }),
    [variation, ready, setVariation, toggleVariation],
  );

  return (
    <DesignVariationContext.Provider value={value}>{children}</DesignVariationContext.Provider>
  );
}

export function useDesignVariation() {
  const context = useContext(DesignVariationContext);
  if (!context) {
    throw new Error("useDesignVariation must be used within DesignVariationProvider");
  }
  return context;
}
