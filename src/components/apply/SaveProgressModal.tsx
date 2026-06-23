"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ApplyInput } from "@/components/apply/ApplyField";

interface SaveProgressModalProps {
  open: boolean;
  mobile: string;
  onMobileChange: (value: string) => void;
  onSendResume: () => void;
  onContinue: () => void;
  sending?: boolean;
  mobileError?: string;
}

export function SaveProgressModal({
  open,
  mobile,
  onMobileChange,
  onSendResume,
  onContinue,
  sending = false,
  mobileError,
}: SaveProgressModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-charcoal/70 p-5 backdrop-blur-sm md:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-progress-title"
        className="w-full max-w-md rounded-[var(--radius-card)] border border-cream/10 bg-surface p-6 shadow-2xl"
      >
        <h2 id="save-progress-title" className="text-xl font-medium text-cream">
          Save your progress and continue anytime.
        </h2>
        <p className="mt-2 text-sm text-cream-muted">
          We&apos;ll send a secure link so you can pick up right where you left off.
        </p>

        <div className="mt-6">
          <ApplyInput
            id="save-mobile"
            label="Mobile number"
            required
            type="tel"
            inputMode="tel"
            value={mobile}
            onChange={(e) => onMobileChange(e.target.value)}
            error={mobileError}
            placeholder="07XXX XXXXXX"
            autoComplete="tel"
          />
        </div>

        <div className="mt-6 space-y-3">
          <Button fullWidth size="lg" onClick={onSendResume} disabled={sending}>
            {sending ? "Sending..." : "Send Resume Link"}
          </Button>
          <Button fullWidth variant="secondary" size="lg" onClick={onContinue}>
            Continue Application
          </Button>
        </div>

        <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-cream-muted">
          <span aria-hidden className="text-success">
            ✓
          </span>
          Your information is securely saved.
        </p>
      </div>
    </div>
  );
}
