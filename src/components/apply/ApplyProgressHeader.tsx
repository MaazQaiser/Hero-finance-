"use client";

import { AnimatedProgress } from "@/components/motion/AnimatedProgress";
import { BackNavigationNotice } from "@/components/apply/save/BackNavigationNotice";
import { formatTimeRemaining } from "@/lib/apply/sections";

interface ApplyProgressHeaderProps {
  stepNumber: number;
  totalSteps: number;
  onBack: () => void;
  canGoBack: boolean;
  backNotice?: string | null;
  sectionName?: string;
}

export function ApplyProgressHeader({
  stepNumber,
  totalSteps,
  onBack,
  canGoBack,
  backNotice,
  sectionName = "Quick Start",
}: ApplyProgressHeaderProps) {
  const progress = (stepNumber / Math.max(totalSteps, 1)) * 100;
  const stepsRemaining = Math.max(totalSteps - stepNumber, 0);
  const timeLabel = formatTimeRemaining(stepsRemaining);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto max-w-lg px-5 py-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={!canGoBack}
            className="motion-button flex min-h-11 items-center gap-2 text-sm font-medium text-ink hover:text-green-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green disabled:opacity-30"
          >
            <span aria-hidden>←</span> Back
          </button>
          <p className="text-sm font-semibold text-ink">{sectionName}</p>
        </div>

        <p className="mb-2 text-xs text-muted">{timeLabel}</p>

        <AnimatedProgress value={progress} label="Application progress" />

        {backNotice ? <BackNavigationNotice message={backNotice} className="mt-3" /> : null}
      </div>
    </header>
  );
}
