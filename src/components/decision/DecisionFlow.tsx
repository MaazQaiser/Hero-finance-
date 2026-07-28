"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ApprovedDecision } from "@/components/decision/ApprovedDecision";
import { DeclinedDecision } from "@/components/decision/DeclinedDecision";
import { PendingDecision } from "@/components/decision/PendingDecision";
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
        budgetBand: "£200 to £300",
        depositBand: "None",
        carType: "Family car or estate",
        purchaseTimeframe: "Within a month",
      });
    }
  }, [stateOverride]);

  if (!decision) {
    return (
      <div
        className="apply-shell-outer"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <p style={{ color: "#5C6B64", fontSize: 15 }}>Loading your decision…</p>
      </div>
    );
  }

  const state: DecisionState = decision.state;

  return (
    <div className="apply-shell-outer">
      <div
        className="apply-shell"
        style={{
          "--a-tint":
            state === "approved" ? "#FAFCFA" : state === "pending" ? "#FAFCFA" : "#FDF2F1",
        } as React.CSSProperties}
      >
        {/* Header */}
        <header
          style={{
            padding: "16px 20px 12px",
            borderBottom: "1px solid #E2E8E4",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/"
            style={{
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "-0.02em",
              textDecoration: "none",
              color: "#12211B",
            }}
          >
            Her<span style={{ color: "#0E7A4F" }}>o</span>
          </Link>
          <span style={{ fontSize: 12, color: "#5C6B64", letterSpacing: "0.04em" }}>
            {state === "approved"
              ? "Approved in principle"
              : state === "pending"
                ? "Processing"
                : "Under review"}
          </span>
        </header>

        {/* Decision content */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {state === "approved" && <ApprovedDecision decision={decision} />}
          {state === "declined" && <DeclinedDecision decision={decision} />}
          {state === "pending" && <PendingDecision decision={decision} />}
        </div>
      </div>
    </div>
  );
}
