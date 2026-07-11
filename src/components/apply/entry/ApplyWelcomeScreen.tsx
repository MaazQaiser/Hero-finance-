"use client";

import { ApplyEntryHeader } from "@/components/apply/entry/ApplyEntryHeader";
import { ApplyPrimaryButton } from "@/components/apply/entry/ApplyPrimaryButton";
import { ApplyTrustBadge } from "@/components/apply/entry/ApplyTrustBadge";
import { TrustpilotWidget } from "@/components/TrustpilotWidget";

interface ApplyWelcomeScreenProps {
  onContinue: () => void;
  onSaveLater: () => void;
  headline?: string;
  body?: string;
  ctaLabel?: string;
  trustMessage?: string;
}

function BadgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

export function ApplyWelcomeScreen({
  onContinue,
  onSaveLater,
  headline = "Every credit story deserves a fair hearing.",
  body = "At Hero, we consider every credit story — not just a score. A few quick questions help us understand your situation before we run a soft search.",
  ctaLabel = "Start my application",
  trustMessage = "Soft search only",
}: ApplyWelcomeScreenProps) {
  return (
    <div className="min-h-[100svh] bg-paper">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 saas-glow" aria-hidden />

      <ApplyEntryHeader onSaveLater={onSaveLater} />

      <main className="relative mx-auto max-w-lg px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-12">
        <section className="hero-fade-up text-center">
          <p className="eyebrow">Finance application</p>
          <h1 className="headline-lg mt-4">{headline}</h1>
          <p className="body-lg mx-auto mt-4 max-w-md">{body}</p>

          <div className="mt-8">
            <ApplyPrimaryButton onClick={onContinue} reassurance="">
              {ctaLabel}
            </ApplyPrimaryButton>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium text-muted">
            <span>Takes around 60 seconds</span>
            <span aria-hidden className="text-line">
              •
            </span>
            <span>{trustMessage}</span>
          </div>
        </section>

        <section className="hero-fade-up-delay mt-10">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            <ApplyTrustBadge icon={<BadgeIcon className="h-3.5 w-3.5" />} label="FCA regulated" />
            <div className="flex items-center justify-center rounded-2xl border border-line bg-paper px-3.5 py-2.5 shadow-[0_2px_12px_rgba(91,43,212,0.04)]">
              <TrustpilotWidget />
            </div>
            <ApplyTrustBadge icon={<SearchIcon className="h-3.5 w-3.5" />} label="Soft Search" />
          </div>
        </section>
      </main>
    </div>
  );
}
