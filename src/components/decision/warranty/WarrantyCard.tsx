"use client";

import { type WarrantyPlan, type WarrantyPlanId } from "@/lib/warranty/plans";

interface WarrantyCardProps {
  plan: WarrantyPlan;
  selected: boolean;
  onSelect: (id: WarrantyPlanId) => void;
}

export function WarrantyCard({ plan, selected, onSelect }: WarrantyCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(plan.id)}
      aria-pressed={selected}
      className={`motion-option w-full rounded-[var(--radius-card)] border p-5 text-left ${
        selected
          ? "border-green bg-green/5 shadow-[0_8px_24px_rgba(91,43,212,0.12)]"
          : "border-line bg-paper hover:border-green/25 hover:shadow-[0_8px_24px_rgba(30,22,53,0.06)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-ink">{plan.name}</p>
          <p className="mt-1 text-sm text-muted">{plan.duration}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-medium text-green-deep">£{plan.monthlyPrice}</p>
          <p className="text-xs text-muted">/month</p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">{plan.description}</p>

      <ul className="mt-4 space-y-2">
        {plan.benefits.map((benefit) => (
          <li key={benefit} className="flex items-center gap-2 text-sm text-ink">
            <span className="text-green-deep" aria-hidden>
              ✓
            </span>
            {benefit}
          </li>
        ))}
      </ul>

      <span
        className={`mt-5 flex min-h-11 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200 ${
          selected
            ? "bg-green text-white"
            : "bg-mist-2 text-ink"
        }`}
      >
        {selected ? "Selected" : "Select"}
      </span>
    </button>
  );
}
