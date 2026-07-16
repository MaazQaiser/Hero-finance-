"use client";

import { AnimatedProgress } from "@/components/motion/AnimatedProgress";
import { saveContinueContent } from "@/config/saveContinueContent";

export interface ApplicationProgressProps {
  completedSteps: number;
  totalSteps: number;
  progressPercent: number;
  lastSavedLabel?: string;
  estimatedMinutesRemaining?: number;
}

export function ApplicationProgress({
  completedSteps,
  totalSteps,
  progressPercent,
  lastSavedLabel,
  estimatedMinutesRemaining,
}: ApplicationProgressProps) {
  return (
    <div className="save-resume-card motion-card hero-fade-up-delay rounded-[var(--radius-card)] border border-line bg-paper p-5">
      <p className="text-xs font-medium tracking-wide text-muted">
        {saveContinueContent.resume.progressLabel}
      </p>

      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-lg font-medium text-ink">
          Step {completedSteps} of {totalSteps}
        </p>
        <p className="text-lg font-medium text-green-deep">{progressPercent}% Complete</p>
      </div>

      <AnimatedProgress
        value={progressPercent}
        label="Saved application progress"
        className="mt-4 h-2"
      />

      <dl className="mt-4 space-y-2 text-sm">
        {estimatedMinutesRemaining != null ? (
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Estimated Time Remaining</dt>
            <dd className="font-medium text-ink">{estimatedMinutesRemaining} minutes</dd>
          </div>
        ) : null}
        {lastSavedLabel ? (
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Last Saved</dt>
            <dd className="font-medium text-ink">{lastSavedLabel}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}
