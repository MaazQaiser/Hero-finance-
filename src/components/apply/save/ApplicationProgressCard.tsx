"use client";

import { AnimatedProgress } from "@/components/motion/AnimatedProgress";

interface ApplicationProgressCardProps {
  completedSteps: number;
  totalSteps: number;
  progressPercent: number;
  lastSavedLabel?: string;
  estimatedMinutesRemaining?: number;
}

export function ApplicationProgressCard({
  completedSteps,
  totalSteps,
  progressPercent,
  lastSavedLabel,
  estimatedMinutesRemaining,
}: ApplicationProgressCardProps) {
  return (
    <div className="motion-card hero-fade-up-delay rounded-[var(--radius-card)] border border-line bg-paper p-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted">Application progress</p>
          <p className="mt-1 text-2xl font-medium text-ink">{progressPercent}%</p>
        </div>
        <p className="text-sm font-medium text-muted">
          Step {completedSteps} of {totalSteps}
        </p>
      </div>

      <AnimatedProgress
        value={progressPercent}
        label="Saved application progress"
        className="mt-4 h-2"
      />

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {lastSavedLabel ? <span>Last saved · {lastSavedLabel}</span> : null}
        {estimatedMinutesRemaining != null ? (
          <span>About {estimatedMinutesRemaining} minutes remaining</span>
        ) : null}
      </div>
    </div>
  );
}
