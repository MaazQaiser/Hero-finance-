"use client";

import { AnimatedProgress } from "@/components/motion/AnimatedProgress";
import { formatTimeRemaining } from "@/lib/apply/sections";
import { saveContinueContent } from "@/config/saveContinueContent";

export interface ApplicationProgressProps {
  completedSteps: number;
  totalSteps: number;
  progressPercent: number;
  lastSavedLabel?: string;
  estimatedMinutesRemaining?: number;
  sectionName?: string;
}

export function ApplicationProgress({
  completedSteps,
  totalSteps,
  progressPercent,
  lastSavedLabel,
  estimatedMinutesRemaining,
  sectionName = "Your application",
}: ApplicationProgressProps) {
  const stepsRemaining = Math.max(totalSteps - completedSteps, 0);
  const timeLabel =
    estimatedMinutesRemaining != null
      ? estimatedMinutesRemaining <= 1
        ? "About a minute remaining"
        : `About ${estimatedMinutesRemaining} minutes remaining`
      : formatTimeRemaining(stepsRemaining);

  return (
    <div className="save-resume-card motion-card hero-fade-up-delay rounded-[var(--radius-card)] border border-line bg-paper p-5">
      <p className="text-xs font-medium tracking-wide text-muted">
        {saveContinueContent.resume.progressLabel}
      </p>

      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-lg font-medium text-ink">{sectionName}</p>
        <p className="text-sm font-medium text-muted">{timeLabel}</p>
      </div>

      <AnimatedProgress
        value={progressPercent}
        label="Saved application progress"
        className="mt-4 h-2"
      />

      <dl className="mt-4 space-y-2 text-sm">
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
