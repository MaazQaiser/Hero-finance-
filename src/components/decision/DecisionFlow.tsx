"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ApprovedDecision } from "@/components/decision/ApprovedDecision";
import { DeclinedDecision } from "@/components/decision/DeclinedDecision";
import { PendingDecision } from "@/components/decision/PendingDecision";
import { DecisionStickyFooter } from "@/components/decision/DecisionStickyFooter";
import { WarrantySelection } from "@/components/decision/warranty/WarrantySelection";
import { AnimatedPage } from "@/components/motion/AnimatedPage";
import {
  type DecisionState,
  type FinanceDecision,
  loadDecision,
  parseDecisionState,
} from "@/lib/apply/decision";

interface DecisionFlowProps {
  stateOverride?: string;
}

type ApprovedStage = "summary" | "warranty";

export function DecisionFlow({ stateOverride }: DecisionFlowProps) {
  const router = useRouter();
  const [decision, setDecision] = useState<FinanceDecision | null>(null);
  const [approvedStage, setApprovedStage] = useState<ApprovedStage>("summary");

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
        <p className="text-muted">Loading your decision...</p>
      </div>
    );
  }

  const state: DecisionState = decision.state;
  const showWarranty = state === "approved" && approvedStage === "warranty";

  const handleWarrantyContinue = () => {
    // Frontend prototype only — selection is not persisted or charged
    router.push("/cars");
  };

  return (
    <>
      <header className="border-b border-line bg-paper/90 px-5 py-4 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link href="/" className="text-sm text-muted hover:text-ink">
            Hero Car Finance
          </Link>
          <p className="text-xs tracking-wide text-muted">
            {showWarranty
              ? "Protection"
              : state === "approved"
                ? "Approved"
                : state === "pending"
                  ? "Processing"
                  : "Under review"}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 py-8">
        <AnimatedPage pageKey={`${state}-${approvedStage}`}>
          {state === "approved" && approvedStage === "summary" && (
            <ApprovedDecision
              decision={decision}
              onOpenWarranty={() => setApprovedStage("warranty")}
            />
          )}
          {showWarranty && <WarrantySelection onContinue={handleWarrantyContinue} />}
          {state === "declined" && <DeclinedDecision decision={decision} />}
          {state === "pending" && <PendingDecision decision={decision} />}
        </AnimatedPage>
      </main>

      <DecisionStickyFooter
        state={state}
        hide={showWarranty}
        onApprovedContinue={
          state === "approved" && approvedStage === "summary"
            ? () => setApprovedStage("warranty")
            : undefined
        }
      />
    </>
  );
}
