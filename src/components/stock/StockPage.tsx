"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { type SearchMode, vehicles } from "@/data/vehicles";
import { StockActiveFilters } from "@/components/stock/StockActiveFilters";
import { StockBudgetBar } from "@/components/stock/StockBudgetBar";
import { StockEmptyState } from "@/components/stock/StockEmptyState";
import { StockFilterSheet } from "@/components/stock/StockFilterSheet";
import { StockFinanceCta } from "@/components/stock/StockFinanceCta";
import { StockLoadingGrid } from "@/components/stock/StockLoadingSkeleton";
import { StockPriceBar } from "@/components/stock/StockPriceBar";
import { StockSearchHeader } from "@/components/stock/StockSearchHeader";
import { StockSortSheet } from "@/components/stock/StockSortSheet";
import { StockVehicleCard } from "@/components/stock/StockVehicleCard";
import {
  type BudgetSearch,
  type SortOption,
  type StockFilters,
  applyStockFilters,
  countActiveFilters,
  defaultBudgetSearch,
  defaultFilters,
  sortVehicles,
} from "@/lib/stock/filters";

const PAGE_SIZE = 6;

export function StockPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>("monthly");
  const [sortBy, setSortBy] = useState<SortOption>("monthly-asc");
  const [filters, setFilters] = useState<StockFilters>(defaultFilters);
  const [budget, setBudget] = useState<BudgetSearch>(defaultBudgetSearch);
  const [budgetApplied, setBudgetApplied] = useState(false);
  const [maxPrice, setMaxPrice] = useState(25000);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredVehicles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let list = applyStockFilters(
      vehicles,
      filters,
      budgetApplied ? budget : undefined,
      searchMode === "monthly" && budgetApplied,
    );

    if (searchMode === "price" && maxPrice > 0) {
      list = list.filter((vehicle) => vehicle.price <= maxPrice);
    }

    if (query) {
      list = list.filter((vehicle) => {
        const haystack = `${vehicle.make} ${vehicle.model}`.toLowerCase();
        return haystack.includes(query);
      });
    }

    return sortVehicles(list, sortBy);
  }, [searchQuery, sortBy, filters, budget, budgetApplied, searchMode, maxPrice]);

  const visibleVehicles = filteredVehicles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVehicles.length;
  const activeFilterCount = countActiveFilters(filters);

  const handleRemoveChip = (key: string) => {
    setFilters((current) => {
      const next = { ...current };
      if (key.startsWith("make-")) {
        const make = key.replace("make-", "");
        next.makes = next.makes.filter((item) => item !== make);
      } else if (key.startsWith("model-")) {
        const model = key.replace("model-", "");
        next.models = next.models.filter((item) => item !== model);
      } else if (key.startsWith("fuel-")) {
        const fuel = key.replace("fuel-", "");
        next.fuelTypes = next.fuelTypes.filter((item) => item !== fuel);
      } else if (key.startsWith("trans-")) {
        const transmission = key.replace("trans-", "");
        next.transmissions = next.transmissions.filter((item) => item !== transmission);
      } else if (key === "year") {
        next.yearMin = defaultFilters.yearMin;
        next.yearMax = defaultFilters.yearMax;
      } else if (key === "mileage") {
        next.mileageMin = defaultFilters.mileageMin;
        next.mileageMax = defaultFilters.mileageMax;
      } else if (key === "price") {
        next.priceMin = defaultFilters.priceMin;
        next.priceMax = defaultFilters.priceMax;
      } else if (key === "monthly") {
        next.monthlyBudgetMax = defaultFilters.monthlyBudgetMax;
      }
      return next;
    });
    setVisibleCount(PAGE_SIZE);
  };

  const handleBudgetApply = () => {
    setBudgetApplied(true);
    setFilters((current) => ({ ...current, monthlyBudgetMax: budget.monthly }));
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="min-h-[100svh] bg-mist-2">
      <StockSearchHeader
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setVisibleCount(PAGE_SIZE);
        }}
        searchMode={searchMode}
        onSearchModeChange={(mode) => {
          setSearchMode(mode);
          setBudgetApplied(false);
          setVisibleCount(PAGE_SIZE);
        }}
        onFilterOpen={() => setFilterOpen(true)}
        onSortOpen={() => setSortOpen(true)}
        resultCount={filteredVehicles.length}
        activeFilterCount={activeFilterCount}
      />

      <StockActiveFilters
        filters={filters}
        onRemoveChip={handleRemoveChip}
        onClearAll={() => {
          setFilters(defaultFilters);
          setVisibleCount(PAGE_SIZE);
        }}
      />

      {searchMode === "monthly" ? (
        <StockBudgetBar
          budget={budget}
          onChange={setBudget}
          onApply={handleBudgetApply}
        />
      ) : (
        <StockPriceBar
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          onApply={() => setVisibleCount(PAGE_SIZE)}
        />
      )}

      <section className="px-5 py-6 pb-32 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <StockLoadingGrid />
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {visibleVehicles.map((vehicle) => (
                  <StockVehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    searchMode={searchMode}
                  />
                ))}
              </div>

              {filteredVehicles.length === 0 && (
                <StockEmptyState onAdjustFilters={() => setFilterOpen(true)} />
              )}

              {hasMore && (
                <div className="mt-8 flex justify-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <StockFinanceCta />

      <StockFilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onApply={(next) => {
          setFilters(next);
          setVisibleCount(PAGE_SIZE);
        }}
        onClear={() => {
          setFilters(defaultFilters);
          setVisibleCount(PAGE_SIZE);
        }}
      />

      <StockSortSheet
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        selected={sortBy}
        onApply={(value) => {
          setSortBy(value);
          setVisibleCount(PAGE_SIZE);
        }}
      />
    </div>
  );
}
