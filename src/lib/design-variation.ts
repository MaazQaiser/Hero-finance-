export type DesignVariation = "v1" | "v2";

export const DESIGN_VARIATION_STORAGE_KEY = "hero-design-variation";

export const designVariations: { id: DesignVariation; label: string }[] = [
  { id: "v1", label: "V1" },
  { id: "v2", label: "V2" },
];

export function isDesignVariation(value: string | null): value is DesignVariation {
  return value === "v1" || value === "v2";
}

export function getStoredDesignVariation(): DesignVariation {
  if (typeof window === "undefined") return "v1";

  const stored = window.localStorage.getItem(DESIGN_VARIATION_STORAGE_KEY);
  return isDesignVariation(stored) ? stored : "v1";
}
