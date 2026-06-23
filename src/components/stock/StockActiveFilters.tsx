"use client";

import { type StockFilters, getActiveFilterChips } from "@/lib/stock/filters";

interface StockActiveFiltersProps {
  filters: StockFilters;
  onRemoveChip: (key: string) => void;
  onClearAll: () => void;
}

export function StockActiveFilters({
  filters,
  onRemoveChip,
  onClearAll,
}: StockActiveFiltersProps) {
  const chips = getActiveFilterChips(filters);

  if (chips.length === 0) return null;

  return (
    <div className="border-b border-cream/10 bg-charcoal/40 px-5 py-3 md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto">
        <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-cream-muted">
          Active
        </span>
        <div className="flex gap-2">
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => onRemoveChip(chip.key)}
              className="flex shrink-0 items-center gap-2 rounded-full border border-coral/30 bg-coral/10 px-3 py-1.5 text-xs font-medium text-coral"
            >
              {chip.label}
              <span aria-hidden>×</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClearAll}
          className="shrink-0 text-xs text-cream-muted underline-offset-2 hover:text-cream hover:underline"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}
