"use client";

import { type FinanceDecision } from "@/lib/apply/decision";
import { ApprovalHeader } from "@/components/decision/approval/ApprovalHeader";
import { FinanceSummaryCard } from "@/components/decision/approval/FinanceSummaryCard";
import { NextStepsCard } from "@/components/decision/approval/NextStepsCard";
import { RecommendedCarsSection } from "@/components/decision/recommended/RecommendedCarsSection";
import { DealerAdvantageCard } from "@/components/trust/DealerAdvantageCard";
import { useJourneyVariant } from "@/components/apply/JourneyVariantProvider";
import { approvalContent } from "@/config/approvalContent";

interface ApprovedDecisionProps {
  decision: FinanceDecision;
  onOpenWarranty?: () => void;
}

export function ApprovedDecision({ decision, onOpenWarranty }: ApprovedDecisionProps) {
  const journey = useJourneyVariant();

  return (
    <div className="approval-experience space-y-6 pb-36">
      <ApprovalHeader
        description={journey.approvalDescription || approvalContent.description}
        applicantName={decision.applicantName}
      />

      <FinanceSummaryCard
        approvedAmount={decision.approvedAmount ?? 0}
        estimatedMonthly={decision.estimatedMonthly ?? 0}
        apr={decision.apr ?? 0}
        financeType="Hire Purchase"
        lenderName={decision.lenderName}
      />

      <RecommendedCarsSection
        approvedAmount={decision.approvedAmount}
        onOpenWarranty={onOpenWarranty}
      />

      <DealerAdvantageCard />

      <NextStepsCard />
    </div>
  );
}
