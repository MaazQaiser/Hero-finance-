"use client";

import { AnimatedProgress } from "@/components/motion/AnimatedProgress";
import { BackNavigationNotice } from "@/components/apply/save/BackNavigationNotice";
import { ProgressHint } from "@/components/apply/form/ProgressHint";

interface ApplyProgressHeaderProps {
  stepNumber: number;
  totalSteps: number;
  onBack: () => void;
  canGoBack: boolean;
  backNotice?: string | null;
}

export function ApplyProgressHeader({
  stepNumber,
  totalSteps,
  onBack,
  canGoBack,
  backNotice,
}: ApplyProgressHeaderProps) {
  const progress = (stepNumber / totalSteps) * 100;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto max-w-lg px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={!canGoBack}
            className="motion-button flex min-h-11 items-center gap-2 text-sm font-medium text-ink hover:text-green-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green disabled:opacity-30"
          >
            <span aria-hidden>←</span> Back
          </button>
          <p className="text-sm text-muted">
            Step <span className="font-medium text-ink">{stepNumber}</span> of {totalSteps}
          </p>
        </div>

        <ProgressHint stepNumber={stepNumber} totalSteps={totalSteps} className="mb-2" />

        <AnimatedProgress value={progress} label="Application progress" />

        {backNotice ? <BackNavigationNotice message={backNotice} className="mt-3" /> : null}
      </div>
    </header>
  );
}
