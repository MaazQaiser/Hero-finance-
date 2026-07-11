"use client";

import { type ReactNode } from "react";
import { type FinanceDecision } from "@/lib/apply/decision";
import { formatPrice } from "@/data/vehicles";

interface ApprovedDecisionProps {
  decision: FinanceDecision;
}

function TrustRowIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const trustRows = [
  {
    icon: (
      <TrustRowIcon>
        <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />
      </TrustRowIcon>
    ),
    title: "Every vehicle is AA inspected.",
    description: "Checked before you collect.",
  },
  {
    icon: (
      <TrustRowIcon>
        <path d="M13 2L3 14h9l-1 8 11-12h-9l1-8z" />
      </TrustRowIcon>
    ),
    title: "Battery health verified on EVs.",
    description: "Know exactly what you're buying.",
  },
  {
    icon: (
      <TrustRowIcon>
        <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2" />
      </TrustRowIcon>
    ),
    title: "Free delivery within 30 miles.",
    description: "Delivered to your door.",
  },
  {
    icon: (
      <TrustRowIcon>
        <path d="M5 13l4 4L19 7" />
      </TrustRowIcon>
    ),
    title: "14-day money-back guarantee.",
    description: "Buy with confidence.",
  },
];

const staggerClasses = [
  "hero-fade-up-delay-4",
  "hero-fade-up-delay-5",
  "hero-fade-up-delay-6",
  "hero-fade-up-delay-7",
];

export function ApprovedDecision({ decision }: ApprovedDecisionProps) {
  return (
    <div className="space-y-8 pb-36">
      <section className="text-center">
        <div
          className="hero-success-in mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-success"
          aria-hidden
        >
          <svg
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="hero-fade-up-delay mt-6 text-3xl font-medium text-ink">You&apos;re approved.</h1>
        <p className="hero-fade-up-delay-2 mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          Great news{decision.applicantName ? `, ${decision.applicantName}` : ""}. We&apos;ve found
          finance options and we&apos;ve got real cars ready for you.
        </p>
      </section>

      <section className="hero-fade-up-delay-3 rounded-[var(--radius-card)] border border-green/30 bg-gradient-to-br from-green to-green-deep p-6 text-white">
        <div className="grid gap-5">
          <div>
            <p className="text-xs tracking-wide text-white/70">Approved amount</p>
            <p className="mt-1 text-2xl font-medium text-white">
              {formatPrice(decision.approvedAmount ?? 0)}
            </p>
          </div>
          <div>
            <p className="text-xs tracking-wide text-white/70">Estimated monthly payment</p>
            <p className="mt-1 text-2xl font-medium text-green-bright">
              {formatPrice(decision.estimatedMonthly ?? 0)}
              <span className="text-sm font-normal text-white/70">/mo</span>
            </p>
          </div>
          <div>
            <p className="text-xs tracking-wide text-white/70">Representative APR</p>
            <p className="mt-1 text-xl font-medium text-white">{decision.apr}% fixed</p>
          </div>
        </div>

        {decision.lenderName && (
          <p className="mt-5 text-xs text-white/60">
            Finance partner: <span className="text-white/80">{decision.lenderName}</span>
          </p>
        )}
      </section>

      <section className="space-y-5 border-t border-line pt-6">
        {trustRows.map((row, index) => (
          <div key={row.title} className={`flex gap-3 ${staggerClasses[index]}`}>
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green/10 text-green-deep">
              {row.icon}
            </span>
            <div className="min-w-0 text-left">
              <p className="text-sm font-medium text-ink">{row.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">{row.description}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
