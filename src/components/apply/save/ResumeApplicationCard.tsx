"use client";

import { Button } from "@/components/ui/Button";
import { ApplicationProgressCard } from "@/components/apply/save/ApplicationProgressCard";
import { SavedStatusBadge } from "@/components/apply/save/SavedStatusBadge";
import { type MockSavedApplication } from "@/lib/apply/mockSaveProgress";

interface ResumeApplicationCardProps {
  saved: MockSavedApplication;
  onResume: () => void;
  onStartAgain: () => void;
}

export function ResumeApplicationCard({
  saved,
  onResume,
  onStartAgain,
}: ResumeApplicationCardProps) {
  return (
    <div className="hero-fade-up space-y-5">
      <div className="text-center">
        <SavedStatusBadge label="We'll remember where you left off" />
        <h1 className="mt-4 text-2xl font-medium text-ink md:text-3xl">
          Continue your application
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          You&apos;ve already completed {saved.completedSteps} of {saved.totalSteps} steps.
          Continue whenever you&apos;re ready — no pressure.
        </p>
      </div>

      <ApplicationProgressCard
        completedSteps={saved.completedSteps}
        totalSteps={saved.totalSteps}
        progressPercent={saved.progressPercent}
        lastSavedLabel={saved.lastSavedLabel}
        estimatedMinutesRemaining={saved.estimatedMinutesRemaining}
      />

      <div className="space-y-3">
        <Button fullWidth size="lg" onClick={onResume}>
          Resume application
        </Button>
        <Button fullWidth variant="secondary" size="lg" onClick={onStartAgain}>
          Start again
        </Button>
      </div>

      <p className="text-center text-xs leading-relaxed text-muted">
        Your progress is securely saved. We&apos;ll pick up exactly where you stopped.
      </p>
    </div>
  );
}
