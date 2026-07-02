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
    <div className="border-b border-line bg-mist px-5 py-3 md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto">
        <span className="shrink-0 text-xs font-medium tracking-wide text-muted">
          Active
        </span>
        <div className="flex gap-2">
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => onRemoveChip(chip.key)}
              className="flex shrink-0 items-center gap-2 rounded-full border border-green/30 bg-green/10 px-3 py-1.5 text-xs font-medium text-green-deep"
            >
              {chip.label}
              <span aria-hidden>×</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClearAll}
          className="shrink-0 text-xs text-muted underline-offset-2 hover:text-ink hover:underline"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}
