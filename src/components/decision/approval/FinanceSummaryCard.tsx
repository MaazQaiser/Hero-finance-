"use client";

import { formatPrice } from "@/data/vehicles";
import { approvalContent } from "@/config/approvalContent";

interface FinanceSummaryCardProps {
  approvedAmount: number;
  estimatedMonthly: number;
  apr: number;
  financeType?: string;
  lenderName?: string;
}

export function FinanceSummaryCard({
  approvedAmount,
  estimatedMonthly,
  apr,
  financeType = "Hire Purchase",
  lenderName,
}: FinanceSummaryCardProps) {
  return (
    <section className="approval-finance-summary motion-card hero-fade-up-delay-3 rounded-[var(--radius-card)] border border-green/30 bg-gradient-to-br from-green to-green-deep p-6 text-white">
      <p className="text-xs font-medium tracking-wide text-white/70">
        {approvalContent.financeSummaryLabel}
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-xs tracking-wide text-white/70">Approved amount</p>
          <p className="mt-1 text-2xl font-medium text-white">{formatPrice(approvedAmount)}</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-white/70">Estimated monthly payment</p>
          <p className="mt-1 text-2xl font-medium text-green-bright">
            {formatPrice(estimatedMonthly)}
            <span className="text-sm font-normal text-white/70">/mo</span>
          </p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-white/70">Representative APR</p>
          <p className="mt-1 text-xl font-medium text-white">{apr}% fixed</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-white/70">Finance type</p>
          <p className="mt-1 text-xl font-medium text-white">{financeType}</p>
        </div>
      </div>

      {lenderName ? (
        <p className="mt-5 text-xs text-white/60">
          Finance partner: <span className="text-white/80">{lenderName}</span>
        </p>
      ) : null}
    </section>
  );
}
