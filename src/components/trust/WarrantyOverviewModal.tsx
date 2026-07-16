"use client";

import { Button } from "@/components/ui/Button";
import { AnimatedModal } from "@/components/motion/AnimatedModal";
import { CoverageList } from "@/components/decision/warranty/CoverageList";
import { WarrantyCard } from "@/components/decision/warranty/WarrantyCard";
import { vehicleTrustContent } from "@/config/vehicleTrustContent";
import { coverageHighlights, warrantyPlans } from "@/lib/warranty/plans";
import { useState } from "react";
import { type WarrantyPlanId } from "@/lib/warranty/plans";

interface WarrantyOverviewModalProps {
  open: boolean;
  onClose: () => void;
}

export function WarrantyOverviewModal({ open, onClose }: WarrantyOverviewModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<WarrantyPlanId>("essential");
  const { warranty } = vehicleTrustContent;

  return (
    <AnimatedModal open={open} onClose={onClose} labelledBy="warranty-overview-title">
      <div className="max-h-[85vh] overflow-y-auto rounded-[var(--radius-card)] border border-line bg-paper p-5">
        <h2 id="warranty-overview-title" className="text-lg font-medium text-ink">
          {warranty.modalTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{warranty.modalDescription}</p>

        <div className="mt-5 space-y-3">
          {warrantyPlans.map((plan) => (
            <WarrantyCard
              key={plan.id}
              plan={plan}
              selected={selectedPlan === plan.id}
              onSelect={setSelectedPlan}
            />
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-line bg-mist-2 p-4">
          <CoverageList title="Coverage highlights" items={coverageHighlights} />
        </div>

        <Button fullWidth size="lg" className="mt-5" onClick={onClose}>
          Close
        </Button>
      </div>
    </AnimatedModal>
  );
}
