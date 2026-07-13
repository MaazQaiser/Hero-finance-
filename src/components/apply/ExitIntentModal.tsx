"use client";

import { Button } from "@/components/ui/Button";
import { AnimatedModal } from "@/components/motion/AnimatedModal";

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
  return (
    <AnimatedModal open={open} onClose={onContinue} labelledBy="exit-intent-title">
      <h2 id="exit-intent-title" className="text-xl font-medium text-ink">
        Before you go...
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Your progress can be saved so you can continue later.
      </p>

      <div className="mt-6 space-y-3">
        <Button fullWidth size="lg" onClick={onSendResume} loading={sending}>
          {sending ? "Sending..." : "Send Me a Resume Link"}
        </Button>
        <Button fullWidth variant="secondary" size="lg" onClick={onContinue}>
          Keep Going
        </Button>
        <button
          type="button"
          onClick={onLeave}
          className="motion-button min-h-11 w-full text-sm text-muted hover:text-ink"
        >
          Leave Anyway
        </button>
      </div>
    </AnimatedModal>
  );
}
