"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { type SortOption, sortOptions } from "@/lib/stock/filters";

interface StockSortSheetProps {
  open: boolean;
  onClose: () => void;
  selected: SortOption;
  onApply: (value: SortOption) => void;
}

export function StockSortSheet({
  open,
  onClose,
  selected,
  onApply,
}: StockSortSheetProps) {
  const [draft, setDraft] = useState<SortOption>(selected);

  useEffect(() => {
    if (open) setDraft(selected);
  }, [open, selected]);

  const footer = (
    <Button
      fullWidth
      size="lg"
      onClick={() => {
        onApply(draft);
        onClose();
      }}
    >
      Apply Sort
    </Button>
  );

  return (
    <BottomSheet open={open} onClose={onClose} title="Sort by" footer={footer}>
      <div className="space-y-2 pb-2" role="radiogroup" aria-label="Sort options">
        {sortOptions.map((option) => {
          const isSelected = draft === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setDraft(option.value)}
              className={`flex min-h-12 w-full items-center justify-between rounded-2xl border px-4 text-left text-sm transition-colors ${
                isSelected
                  ? "border-coral bg-coral/10 text-cream"
                  : "border-cream/10 bg-charcoal/30 text-cream-muted hover:border-cream/20 hover:text-cream"
              }`}
            >
              <span>{option.label}</span>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  isSelected ? "border-coral bg-coral" : "border-cream/30"
                }`}
              >
                {isSelected && <span className="h-2 w-2 rounded-full bg-cream" />}
              </span>
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
}
