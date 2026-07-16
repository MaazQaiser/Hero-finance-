"use client";

import { Button } from "@/components/ui/Button";
import { ApplicationProgress } from "@/components/apply/save/ApplicationProgress";
import { SavedStatusBadge } from "@/components/apply/save/SavedStatusBadge";
import { type MockSavedApplication } from "@/lib/apply/mockSaveProgress";
import { saveContinueContent } from "@/config/saveContinueContent";

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
  const { resume } = saveContinueContent;

  return (
    <div className="save-resume-card hero-fade-up space-y-5">
      <div className="text-center">
        <SavedStatusBadge label="We'll remember where you left off" />
        <h1 className="mt-4 text-2xl font-medium text-ink md:text-3xl">{resume.title}</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">{resume.subtitle}</p>
      </div>

      <ApplicationProgress
        completedSteps={saved.completedSteps}
        totalSteps={saved.totalSteps}
        progressPercent={saved.progressPercent}
        lastSavedLabel={saved.lastSavedLabel}
        estimatedMinutesRemaining={saved.estimatedMinutesRemaining}
      />

      <div className="space-y-3">
        <Button fullWidth size="lg" onClick={onResume}>
          {resume.primaryCta}
        </Button>
        <Button fullWidth variant="secondary" size="lg" onClick={onStartAgain}>
          {resume.secondaryCta}
        </Button>
      </div>

      <p className="text-center text-xs leading-relaxed text-muted">{resume.footerNote}</p>
    </div>
  );
}
