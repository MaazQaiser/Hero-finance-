"use client";

import { type FinanceDecision } from "@/lib/apply/decision";
import { ApprovalHeader } from "@/components/decision/approval/ApprovalHeader";
import { FinanceSummaryCard } from "@/components/decision/approval/FinanceSummaryCard";
import { ApprovalChecklist } from "@/components/decision/approval/ApprovalChecklist";
import { NextStepCard } from "@/components/decision/approval/NextStepCard";
import { AmbientTrust } from "@/components/apply/AmbientTrust";
import { RecommendedCarsSection } from "@/components/decision/recommended/RecommendedCarsSection";

interface ApprovedDecisionProps {
  decision: FinanceDecision;
}

export function ApprovedDecision({ decision }: ApprovedDecisionProps) {
  return (
    <div className="space-y-7 pb-36">
      <ApprovalHeader applicantName={decision.applicantName} />

      <FinanceSummaryCard
        approvedAmount={decision.approvedAmount ?? 0}
        estimatedMonthly={decision.estimatedMonthly ?? 0}
        apr={decision.apr ?? 0}
        financeType="Hire Purchase"
        lenderName={decision.lenderName}
      />

      <ApprovalChecklist />

      <NextStepCard />

      <AmbientTrust messageKey="approval" />

      <RecommendedCarsSection approvedAmount={decision.approvedAmount} limit={4} />
    </div>
  );
}
