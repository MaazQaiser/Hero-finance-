"use client";

import { designVariations } from "@/lib/design-variation";
import { useDesignVariation } from "@/components/DesignVariationProvider";

export function DesignVariationSwitcher() {
  const { variation, setVariation } = useDesignVariation();

  return (
    <div
      className="pointer-events-auto fixed bottom-24 right-4 z-[9999] md:bottom-6 md:right-6"
      aria-label="Design variation switcher"
    >
      <div className="flex items-center gap-1 rounded-full border border-line/80 bg-white/95 p-1 shadow-[0_12px_40px_rgba(11,41,32,0.18)] backdrop-blur-md">
        {designVariations.map((item) => {
          const isActive = variation === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setVariation(item.id)}
              aria-pressed={isActive}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-ink text-white shadow-sm"
                  : "text-muted hover:bg-mist hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
