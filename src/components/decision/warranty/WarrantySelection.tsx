"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { WarrantyCard } from "@/components/decision/warranty/WarrantyCard";
import { CoverageList } from "@/components/decision/warranty/CoverageList";
import { ProtectionSection } from "@/components/decision/warranty/ProtectionSection";
import {
  coverageHighlights,
  warrantyPlans,
  type WarrantyPlanId,
} from "@/lib/warranty/plans";

interface WarrantySelectionProps {
  onContinue: (planId: WarrantyPlanId | null) => void;
}

export function WarrantySelection({ onContinue }: WarrantySelectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<WarrantyPlanId | null>("essential");

  return (
    <div className="space-y-7 pb-36">
      <section className="hero-fade-up text-center">
        <p className="eyebrow">Optional protection</p>
        <h1 className="mt-3 text-2xl font-medium text-ink md:text-3xl">
          Protect your vehicle from day one
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          Add optional protection for extra peace of mind after you drive away. You can continue
          without it — no pressure.
        </p>
      </section>

      <section className="hero-fade-up-delay space-y-3">
        {warrantyPlans.map((plan) => (
          <WarrantyCard
            key={plan.id}
            plan={plan}
            selected={selectedPlan === plan.id}
            onSelect={setSelectedPlan}
          />
        ))}
      </section>

      <section className="hero-fade-up-delay-2 rounded-[var(--radius-card)] border border-line bg-mist-2 p-5">
        <CoverageList title="Coverage highlights" items={coverageHighlights} />
      </section>

      <div className="hero-fade-up-delay-3">
        <ProtectionSection />
      </div>

      <section className="hero-fade-up-delay-4 space-y-3">
        <Button
          fullWidth
          size="lg"
          disabled={!selectedPlan}
          onClick={() => onContinue(selectedPlan)}
        >
          Add Warranty
        </Button>
        <Button
          variant="secondary"
          fullWidth
          size="lg"
          onClick={() => onContinue(null)}
        >
          Continue Without Warranty
        </Button>
        <p className="text-center text-xs leading-relaxed text-muted">
          Warranty is optional. Either choice takes you to matching cars.
        </p>
      </section>
    </div>
  );
}
