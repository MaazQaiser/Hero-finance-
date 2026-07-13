"use client";

import { Button } from "@/components/ui/Button";
import { ResumeApplicationCard } from "@/components/apply/save/ResumeApplicationCard";
import { type MockSavedApplication } from "@/lib/apply/mockSaveProgress";

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
  if (!saved.hasSavedApplication) {
    return (
      <div className="flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
        <div className="hero-fade-up w-full max-w-md space-y-5">
          <h1 className="text-2xl font-medium text-ink md:text-3xl">No saved application found.</h1>
          <p className="text-sm leading-relaxed text-muted">
            Start a new finance application whenever you&apos;re ready. Soft search only — no
            impact on your credit score.
          </p>
          <Button fullWidth size="lg" onClick={onStartNew ?? onStartAgain}>
            Start a new application
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
