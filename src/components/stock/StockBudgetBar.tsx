"use client";

import { Button } from "@/components/ui/Button";
import { type BudgetSearch } from "@/lib/stock/filters";

interface StockBudgetBarProps {
  budget: BudgetSearch;
  onChange: (budget: BudgetSearch) => void;
  onApply: () => void;
}

export function StockBudgetBar({ budget, onChange, onApply }: StockBudgetBarProps) {
  return (
    <section className="border-b border-line bg-mist px-5 py-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[var(--radius-card)] border border-green/20 bg-cream p-5 text-charcoal shadow-lg shadow-black/10 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-wide text-charcoal/50">
                Affordability-first search
              </p>
              <h2 className="mt-1 text-xl font-medium md:text-2xl">
                Find cars within your monthly budget
              </h2>
              <p className="mt-2 text-sm text-charcoal/60">
                Monthly payment is what matters most — set your budget and we&apos;ll show
                matching cars.
              </p>
            </div>
            <div className="hidden rounded-full bg-green/10 px-3 py-1 text-xs font-medium text-green-deep md:block">
              HP finance
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="stock-monthly" className="mb-2 block text-sm font-medium">
                Monthly budget
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50">£</span>
                <input
                  id="stock-monthly"
                  type="number"
                  inputMode="numeric"
                  min={150}
                  max={900}
                  value={budget.monthly}
                  onChange={(event) =>
                    onChange({ ...budget, monthly: Number(event.target.value) || 0 })
                  }
                  className="min-h-12 w-full rounded-2xl border border-charcoal/10 bg-white pl-8 pr-4 text-lg font-medium"
                />
              </div>
            </div>
            <div>
              <label htmlFor="stock-deposit" className="mb-2 block text-sm font-medium">
                Deposit
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50">£</span>
                <input
                  id="stock-deposit"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={budget.deposit}
                  onChange={(event) =>
                    onChange({ ...budget, deposit: Number(event.target.value) || 0 })
                  }
                  className="min-h-12 w-full rounded-2xl border border-charcoal/10 bg-white pl-8 pr-4 text-lg font-medium"
                />
              </div>
            </div>
            <div>
              <label htmlFor="stock-term" className="mb-2 block text-sm font-medium">
                Term
              </label>
              <select
                id="stock-term"
                value={budget.term}
                onChange={(event) =>
                  onChange({ ...budget, term: Number(event.target.value) })
                }
                className="min-h-12 w-full rounded-2xl border border-charcoal/10 bg-white px-4 text-lg font-medium"
              >
                <option value={36}>36 months</option>
                <option value={48}>48 months</option>
                <option value={60}>60 months</option>
              </select>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-charcoal/10 bg-white p-4">
            <p className="text-xs tracking-wide text-charcoal/50">Example</p>
            <p className="mt-1 text-sm text-charcoal">
              Monthly budget: <strong>£{budget.monthly}</strong> · Deposit:{" "}
              <strong>£{budget.deposit.toLocaleString("en-GB")}</strong> · Term:{" "}
              <strong>{budget.term} months</strong>
            </p>
          </div>

          <Button fullWidth size="lg" className="mt-5" onClick={onApply}>
            Show Cars I Can Afford
          </Button>
        </div>
      </div>
    </section>
  );
}
