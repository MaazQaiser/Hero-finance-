"use client";

import Link from "next/link";
import { type SearchMode } from "@/data/vehicles";

interface StockSearchHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchMode: SearchMode;
  onSearchModeChange: (mode: SearchMode) => void;
  onFilterOpen: () => void;
  onSortOpen: () => void;
  resultCount: number;
  activeFilterCount?: number;
}

export function StockSearchHeader({
  searchQuery,
  onSearchChange,
  searchMode,
  onSearchModeChange,
  onFilterOpen,
  onSortOpen,
  resultCount,
  activeFilterCount = 0,
}: StockSearchHeaderProps) {
  return (
    <div className="sticky top-0 z-40 border-b border-line bg-paper/90 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-paper/20">
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-8 lg:px-12">
        <div className="mb-3 flex items-center justify-between gap-3">
          <Link href="/" className="text-sm text-muted transition-colors hover:text-ink">
            ← Home
          </Link>
          <p className="text-sm text-muted">
            <span className="font-medium text-ink">{resultCount}</span> cars
          </p>
        </div>

        <div className="flex gap-2">
          <div className="relative min-h-11 flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search make or model"
              className="min-h-11 w-full rounded-full border border-line bg-paper/50 pl-11 pr-4 text-sm text-ink placeholder:text-muted focus:border-green/50 focus:outline-none focus:ring-2 focus:ring-green/20"
            />
          </div>

          <button
            type="button"
            onClick={onFilterOpen}
            aria-label="Open filters"
            className="relative flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-paper/50 px-4 text-sm font-medium text-ink transition-colors hover:border-line"
          >
            <span className="hidden sm:inline">Filters</span>
            <svg className="sm:ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 7h16M7 12h10M10 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {activeFilterCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-green px-1 text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onSortOpen}
            aria-label="Open sort options"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-paper/50 px-4 text-sm font-medium text-ink transition-colors hover:border-line"
          >
            <span className="hidden sm:inline">Sort</span>
            <svg className="sm:ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M8 9l4-4 4 4M8 15l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="mt-3 flex rounded-full border border-line bg-mist p-1">
          <button
            type="button"
            onClick={() => onSearchModeChange("price")}
            className={`min-h-10 flex-1 rounded-full px-3 text-sm font-medium transition-colors ${
              searchMode === "price"
                ? "bg-cream text-charcoal"
                : "text-muted hover:text-ink"
            }`}
          >
            Search by Price
          </button>
          <button
            type="button"
            onClick={() => onSearchModeChange("monthly")}
            className={`min-h-10 flex-1 rounded-full px-3 text-sm font-medium transition-colors ${
              searchMode === "monthly"
                ? "bg-cream text-charcoal"
                : "text-muted hover:text-ink"
            }`}
          >
            Search by Monthly Budget
          </button>
        </div>
      </div>
    </div>
  );
}
