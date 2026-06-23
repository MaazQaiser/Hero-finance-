"use client";

import { formatPrice } from "@/data/vehicles";

interface VehicleFinanceCalculatorProps {
  vehiclePrice: number;
  apr: number;
  deposit: number;
  termMonths: number;
  monthlyPayment: number;
  onDepositChange: (value: number) => void;
  onTermChange: (value: number) => void;
}

const termSteps = [12, 24, 36, 48, 60, 72, 84];

export function VehicleFinanceCalculator({
  vehiclePrice,
  apr,
  deposit,
  termMonths,
  monthlyPayment,
  onDepositChange,
  onTermChange,
}: VehicleFinanceCalculatorProps) {
  const maxDeposit = Math.round(vehiclePrice * 0.5);

  return (
    <section className="px-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[var(--radius-card)] border border-cream/10 bg-cream p-5 text-charcoal shadow-lg shadow-black/10 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-charcoal/50">
                HP finance calculator
              </p>
              <h2 className="mt-1 text-xl font-medium">Adjust your monthly payment</h2>
            </div>
            <p className="rounded-full bg-coral/10 px-3 py-1 text-xs font-medium text-coral">
              HP only
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label htmlFor="deposit-slider" className="text-sm font-medium">
                  Deposit
                </label>
                <span className="text-lg font-medium text-coral">{formatPrice(deposit)}</span>
              </div>
              <input
                id="deposit-slider"
                type="range"
                min={0}
                max={maxDeposit}
                step={250}
                value={deposit}
                onChange={(event) => onDepositChange(Number(event.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-charcoal/10 accent-coral"
              />
              <div className="mt-2 flex justify-between text-xs text-charcoal/50">
                <span>£0</span>
                <span>{formatPrice(maxDeposit)}</span>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <label htmlFor="term-slider" className="text-sm font-medium">
                  Term
                </label>
                <span className="text-lg font-medium text-coral">{termMonths} months</span>
              </div>
              <input
                id="term-slider"
                type="range"
                min={0}
                max={termSteps.length - 1}
                step={1}
                value={termSteps.indexOf(termMonths)}
                onChange={(event) =>
                  onTermChange(termSteps[Number(event.target.value)] ?? 48)
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-charcoal/10 accent-coral"
              />
              <div className="mt-2 flex justify-between text-xs text-charcoal/50">
                <span>12 mo</span>
                <span>84 mo</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-charcoal/10 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-charcoal/50">
              Your estimated monthly payment
            </p>
            <p className="mt-1 text-3xl font-medium text-charcoal transition-all duration-300">
              {formatPrice(monthlyPayment)}
              <span className="text-base font-normal text-charcoal/50">/mo</span>
            </p>
            <p className="mt-2 text-xs text-charcoal/50">
              {apr}% representative APR · Hire Purchase · Subject to status
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
