import { SECTIONS } from "@/lib/apply/sections";

interface ApplyProgressBarProps {
  currentStep: number;
  totalSteps: number;
  estimatedMinutes?: number;
  sectionName?: string;
}

export function ApplyProgressBar({
  currentStep,
  totalSteps,
  estimatedMinutes = 5,
  sectionName = SECTIONS[0].name,
}: ApplyProgressBarProps) {
  const progress = Math.round((currentStep / Math.max(totalSteps, 1)) * 100);
  const timeLabel =
    estimatedMinutes <= 1
      ? "About a minute remaining"
      : `About ${estimatedMinutes} minutes remaining`;

  return (
    <div className="rounded-[24px] border border-line bg-mist-2/80 p-5 shadow-[0_4px_24px_rgba(91,43,212,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink">{sectionName}</p>
          <p className="mt-1 text-xs text-muted">Starts with a few quick questions</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-green-deep">{timeLabel}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-1" aria-hidden>
        {SECTIONS.map((section, i) => (
          <div key={section.name} className="h-1.5 flex-1 overflow-hidden rounded-full bg-line/60">
            <div
              className={`h-full rounded-full bg-gradient-to-r from-green to-green-deep transition-all duration-500 ${
                i === 0 ? "w-[28%]" : "w-0"
              }`}
            />
          </div>
        ))}
      </div>

      <div
        className="sr-only"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Application progress: ${sectionName}. ${timeLabel}`}
      />
    </div>
  );
}
