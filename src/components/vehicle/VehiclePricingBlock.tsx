import { formatPrice } from "@/data/vehicles";

interface VehiclePricingBlockProps {
  monthlyPayment: number;
  vehiclePrice: number;
  apr: number;
  deposit: number;
  termMonths: number;
}

export function VehiclePricingBlock({
  monthlyPayment,
  vehiclePrice,
  apr,
  deposit,
  termMonths,
}: VehiclePricingBlockProps) {
  return (
    <section className="px-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[var(--radius-card)] border border-green/20 bg-gradient-to-br from-coral/10 via-surface to-surface p-5 md:p-6">
          <p className="text-xs font-medium tracking-wide text-muted">
            Hire Purchase
          </p>

          <div className="mt-2">
            <p className="text-4xl font-medium text-green-deep md:text-5xl">
              {formatPrice(monthlyPayment)}
              <span className="text-lg font-normal text-muted">/month</span>
            </p>
            <p className="mt-2 text-xl font-medium text-ink md:text-2xl">
              {formatPrice(vehiclePrice)}{" "}
              <span className="text-sm font-normal text-muted">total price</span>
            </p>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5">
            <div>
              <p className="text-[11px] tracking-wide text-muted">APR</p>
              <p className="mt-1 text-sm font-medium text-ink">{apr}% fixed</p>
            </div>
            <div>
              <p className="text-[11px] tracking-wide text-muted">Deposit</p>
              <p className="mt-1 text-sm font-medium text-ink">{formatPrice(deposit)}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-wide text-muted">Term</p>
              <p className="mt-1 text-sm font-medium text-ink">{termMonths} months</p>
            </div>
          </div>

          <p className="mt-5 text-[11px] leading-relaxed text-muted">
            Representative HP example: {formatPrice(vehiclePrice)} vehicle price,{" "}
            {formatPrice(deposit)} deposit, {termMonths} monthly payments of{" "}
            {formatPrice(monthlyPayment)}. {apr}% APR representative. Total amount payable may
            vary. Subject to status. FCA regulated. 18+ UK residents only.
          </p>
        </div>
      </div>
    </section>
  );
}
