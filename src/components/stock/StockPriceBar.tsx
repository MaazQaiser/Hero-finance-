"use client";

import { Button } from "@/components/ui/Button";

interface StockPriceBarProps {
  maxPrice: number;
  onMaxPriceChange: (value: number) => void;
  onApply: () => void;
}

export function StockPriceBar({
  maxPrice,
  onMaxPriceChange,
  onApply,
}: StockPriceBarProps) {
  return (
    <section className="border-b border-line bg-mist px-5 py-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[var(--radius-card)] border border-line bg-cream p-5 text-charcoal shadow-lg shadow-black/10 md:p-6">
          <p className="text-xs font-medium tracking-wide text-charcoal/50">
            Price search
          </p>
          <h2 className="mt-1 text-xl font-medium md:text-2xl">
            Browse by total vehicle price
          </h2>

          <div className="mt-5">
            <label htmlFor="stock-max-price" className="mb-2 block text-sm font-medium">
              Max vehicle price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50">£</span>
              <input
                id="stock-max-price"
                type="number"
                inputMode="numeric"
                value={maxPrice}
                onChange={(event) => onMaxPriceChange(Number(event.target.value) || 0)}
                className="min-h-12 w-full rounded-2xl border border-charcoal/10 bg-white pl-8 pr-4 text-lg font-medium"
              />
            </div>
          </div>

          <Button fullWidth size="lg" className="mt-5" onClick={onApply}>
            Show Cars
          </Button>
        </div>
      </div>
    </section>
  );
}
