"use client";

import { Button } from "@/components/ui/Button";
import { ResumeApplicationCard } from "@/components/apply/save/ResumeApplicationCard";
import { type MockSavedApplication } from "@/lib/apply/mockSaveProgress";
import { saveContinueContent } from "@/config/saveContinueContent";

interface ResumeApplicationScreenProps {
  saved: MockSavedApplication;
  onResume: () => void;
  onStartAgain: () => void;
  onStartNew?: () => void;
}

export function ResumeApplicationScreen({
  saved,
  onResume,
  onStartAgain,
  onStartNew,
}: ResumeApplicationScreenProps) {
  const { empty } = saveContinueContent;

  if (!saved.hasSavedApplication) {
    return (
      <div className="flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
        <div className="save-resume-card hero-fade-up w-full max-w-md space-y-5">
          <h1 className="text-2xl font-medium text-ink md:text-3xl">{empty.title}</h1>
          <p className="text-sm leading-relaxed text-muted">{empty.description}</p>
          <Button fullWidth size="lg" onClick={onStartNew ?? onStartAgain}>
            {empty.cta}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] bg-paper px-5 py-10">
      <div className="mx-auto max-w-lg">
        <ResumeApplicationCard saved={saved} onResume={onResume} onStartAgain={onStartAgain} />
      </div>
    </div>
  );
}
