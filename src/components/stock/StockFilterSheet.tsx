"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Chip } from "@/components/ui/Chip";
import { RangeSlider, SingleSlider } from "@/components/stock/RangeSlider";
import { filterOptions } from "@/data/vehicles";
import {
  MONTHLY_MAX,
  MONTHLY_MIN,
  MILEAGE_MAX,
  PRICE_MAX,
  YEAR_MAX,
  YEAR_MIN,
  type StockFilters,
  defaultFilters,
  getModelsForMakes,
} from "@/lib/stock/filters";

interface StockFilterSheetProps {
  open: boolean;
  onClose: () => void;
  filters: StockFilters;
  onApply: (filters: StockFilters) => void;
  onClear: () => void;
}

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function StockFilterSheet({
  open,
  onClose,
  filters,
  onApply,
  onClear,
}: StockFilterSheetProps) {
  const [draft, setDraft] = useState<StockFilters>(filters);

  useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);

  const availableModels = useMemo(() => getModelsForMakes(draft.makes), [draft.makes]);

  const updateDraft = (updates: Partial<StockFilters>) => {
    setDraft((current) => {
      const next = { ...current, ...updates };
      if (updates.makes) {
        const models = getModelsForMakes(updates.makes);
        next.models = next.models.filter((model) => models.includes(model));
      }
      return next;
    });
  };

  const footer = (
    <div className="flex gap-3">
      <Button
        variant="secondary"
        fullWidth
        onClick={() => {
          setDraft(defaultFilters);
          onClear();
        }}
      >
        Clear All
      </Button>
      <Button
        fullWidth
        onClick={() => {
          onApply(draft);
          onClose();
        }}
      >
        Apply Filters
      </Button>
    </div>
  );

  return (
    <BottomSheet open={open} onClose={onClose} title="Filters" footer={footer}>
      <div className="space-y-6 pb-2">
        <div>
          <p className="mb-3 text-sm font-medium text-ink">Make</p>
          <div className="flex flex-wrap gap-2">
            {filterOptions.makes.map((make) => (
              <Chip
                key={make}
                label={make}
                selected={draft.makes.includes(make)}
                onClick={() => updateDraft({ makes: toggleValue(draft.makes, make) })}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-ink">Model</p>
          {availableModels.length === 0 ? (
            <p className="text-sm text-muted">Select a make to see models</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {availableModels.map((model) => (
                <Chip
                  key={model}
                  label={model}
                  selected={draft.models.includes(model)}
                  onClick={() => updateDraft({ models: toggleValue(draft.models, model) })}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-ink">Fuel type</p>
          <div className="flex flex-wrap gap-2">
            {filterOptions.fuelTypes.map((fuel) => (
              <Chip
                key={fuel}
                label={fuel}
                selected={draft.fuelTypes.includes(fuel)}
                onClick={() => updateDraft({ fuelTypes: toggleValue(draft.fuelTypes, fuel) })}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-ink">Transmission</p>
          <div className="flex flex-wrap gap-2">
            {filterOptions.transmissions.map((transmission) => (
              <Chip
                key={transmission}
                label={transmission}
                selected={draft.transmissions.includes(transmission)}
                onClick={() =>
                  updateDraft({
                    transmissions: toggleValue(draft.transmissions, transmission),
                  })
                }
              />
            ))}
          </div>
        </div>

        <RangeSlider
          label="Year range"
          min={YEAR_MIN}
          max={YEAR_MAX}
          valueMin={draft.yearMin}
          valueMax={draft.yearMax}
          formatMin={(value) => String(value)}
          formatMax={(value) => String(value)}
          onChange={(yearMin, yearMax) => updateDraft({ yearMin, yearMax })}
        />

        <RangeSlider
          label="Mileage range"
          min={0}
          max={MILEAGE_MAX}
          step={1000}
          valueMin={draft.mileageMin}
          valueMax={draft.mileageMax}
          formatMin={(value) => `${(value / 1000).toFixed(0)}k`}
          formatMax={(value) => `${(value / 1000).toFixed(0)}k`}
          onChange={(mileageMin, mileageMax) => updateDraft({ mileageMin, mileageMax })}
        />

        <SingleSlider
          label="Monthly budget"
          min={MONTHLY_MIN}
          max={MONTHLY_MAX}
          step={10}
          value={draft.monthlyBudgetMax}
          format={(value) => `£${value}/mo`}
          onChange={(monthlyBudgetMax) => updateDraft({ monthlyBudgetMax })}
          highlight
        />

        <RangeSlider
          label="Vehicle price range"
          min={0}
          max={PRICE_MAX}
          step={500}
          valueMin={draft.priceMin}
          valueMax={draft.priceMax}
          formatMin={(value) => `£${(value / 1000).toFixed(0)}k`}
          formatMax={(value) => `£${(value / 1000).toFixed(0)}k`}
          onChange={(priceMin, priceMax) => updateDraft({ priceMin, priceMax })}
        />
      </div>
    </BottomSheet>
  );
}
