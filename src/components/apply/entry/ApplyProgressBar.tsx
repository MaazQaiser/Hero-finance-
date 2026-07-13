interface ApplyProgressBarProps {
  currentStep: number;
  totalSteps: number;
  estimatedMinutes?: number;
}

export function ApplyProgressBar({
  currentStep,
  totalSteps,
  estimatedMinutes = 5,
}: ApplyProgressBarProps) {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="rounded-[24px] border border-line bg-mist-2/80 p-5 shadow-[0_4px_24px_rgba(91,43,212,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink">
            Step {currentStep} of {totalSteps}
          </p>
          <p className="mt-1 text-xs text-muted">Estimated completion</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-green-deep">{progress}%</p>
          <p className="mt-1 text-xs text-muted">Around {estimatedMinutes} minutes</p>
        </div>
      </div>

      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-line/60"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Application progress: ${progress}%`}
      >
        <div
          className="motion-progress-bar h-full rounded-full bg-gradient-to-r from-green to-green-deep"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
