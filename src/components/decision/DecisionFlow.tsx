"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ApprovedDecision } from "@/components/decision/ApprovedDecision";
import { DeclinedDecision } from "@/components/decision/DeclinedDecision";
import { PendingDecision } from "@/components/decision/PendingDecision";
import { DecisionStickyFooter } from "@/components/decision/DecisionStickyFooter";
import {
  type DecisionState,
  type FinanceDecision,
  loadDecision,
  parseDecisionState,
} from "@/lib/apply/decision";

interface DecisionFlowProps {
  stateOverride?: string;
}

export function DecisionFlow({ stateOverride }: DecisionFlowProps) {
  const [decision, setDecision] = useState<FinanceDecision | null>(null);

  useEffect(() => {
    const saved = loadDecision();
    const override = parseDecisionState(stateOverride);

    if (saved) {
      setDecision(override ? { ...saved, state: override } : saved);
      return;
    }

    if (override) {
      setDecision({
        state: override,
        referenceId: "HF-DEMO01",
        applicantName: "there",
        approvedAmount: 22000,
        apr: 9.9,
        estimatedMonthly: 289,
        termMonths: 48,
        lenderName: "Close Brothers Motor Finance",
        expectedResponseHours: 24,
      });
    }
  }, [stateOverride]);

  if (!decision) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center px-5 text-center">
        <p className="text-cream-muted">Loading your decision...</p>
      </div>
    );
  }

  const state: DecisionState = decision.state;

  return (
    <>
      <header className="border-b border-cream/10 bg-charcoal/25 px-5 py-4 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link href="/" className="text-sm text-cream-muted hover:text-cream">
            Hero Car Finance
          </Link>
          <p className="text-xs uppercase tracking-wide text-cream-muted">
            {state === "approved" ? "Approved" : state === "pending" ? "Processing" : "Under review"}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 py-8">
        {state === "approved" && <ApprovedDecision decision={decision} />}
        {state === "declined" && <DeclinedDecision decision={decision} />}
        {state === "pending" && <PendingDecision decision={decision} />}
      </main>

      <DecisionStickyFooter state={state} />
    </>
  );
}
