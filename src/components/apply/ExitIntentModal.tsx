"use client";

import { Button } from "@/components/ui/Button";

interface ExitIntentModalProps {
  open: boolean;
  onSendResume: () => void;
  onContinue: () => void;
  onLeave: () => void;
  sending?: boolean;
}

export function ExitIntentModal({
  open,
  onSendResume,
  onContinue,
  onLeave,
  sending = false,
}: ExitIntentModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-charcoal/70 p-5 backdrop-blur-sm md:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        className="w-full max-w-md rounded-[var(--radius-card)] border border-cream/10 bg-surface p-6 shadow-2xl"
      >
        <h2 id="exit-intent-title" className="text-xl font-medium text-cream">
          Before you go...
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-cream-muted">
          Your progress can be saved so you can continue later.
        </p>

        <div className="mt-6 space-y-3">
          <Button fullWidth size="lg" onClick={onSendResume} disabled={sending}>
            {sending ? "Sending..." : "Send Me a Resume Link"}
          </Button>
          <Button fullWidth variant="secondary" size="lg" onClick={onContinue}>
            Keep Going
          </Button>
          <button
            type="button"
            onClick={onLeave}
            className="min-h-11 w-full text-sm text-cream-muted transition-colors hover:text-cream"
          >
            Leave Anyway
          </button>
        </div>
      </div>
    </div>
  );
}
