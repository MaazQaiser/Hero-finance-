"use client";

interface ApplyProgressHeaderProps {
  stepNumber: number;
  totalSteps: number;
  onBack: () => void;
  canGoBack: boolean;
}

export function ApplyProgressHeader({
  stepNumber,
  totalSteps,
  onBack,
  canGoBack,
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
            className="flex min-h-11 items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-green-deep disabled:opacity-30"
          >
            <span aria-hidden>←</span> Back
          </button>
          <p className="text-sm text-muted">
            Step <span className="font-medium text-ink">{stepNumber}</span> of {totalSteps}
          </p>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-cream/10">
          <div
            className="h-full rounded-full bg-green transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </header>
  );
}
