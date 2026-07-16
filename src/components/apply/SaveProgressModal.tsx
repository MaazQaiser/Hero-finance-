"use client";

import { Button } from "@/components/ui/Button";
import { SavedStatusBadge } from "@/components/apply/save/SavedStatusBadge";
import { AnimatedModal } from "@/components/motion/AnimatedModal";
import { saveContinueContent } from "@/config/saveContinueContent";

interface SaveProgressModalProps {
  open: boolean;
  onContinueLater: () => void;
  onReturnToApplication: () => void;
}

export function SaveProgressModal({
  open,
  onContinueLater,
  onReturnToApplication,
}: SaveProgressModalProps) {
  const { modal } = saveContinueContent;

  return (
    <AnimatedModal open={open} onClose={onReturnToApplication} labelledBy="save-progress-title">
      <div className="flex justify-center">
        <div
          className="hero-success-in flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success"
          aria-hidden
        >
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <div className="mt-5 text-center">
        <SavedStatusBadge />
        <h2 id="save-progress-title" className="mt-4 text-xl font-medium text-ink">
          {modal.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{modal.description}</p>
      </div>

      <ul className="mt-6 space-y-2.5 rounded-2xl border border-line bg-mist-2 p-4">
        {modal.checklist.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-muted">
            <span className="text-green-deep" aria-hidden>
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-3">
        <Button fullWidth size="lg" onClick={onContinueLater}>
          {modal.primaryCta}
        </Button>
        <Button fullWidth variant="secondary" size="lg" onClick={onReturnToApplication}>
          {modal.secondaryCta}
        </Button>
      </div>

      <p className="mt-5 text-center text-xs leading-relaxed text-muted">{modal.footerNote}</p>
    </AnimatedModal>
  );
}
