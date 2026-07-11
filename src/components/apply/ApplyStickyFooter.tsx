"use client";

import { type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { ApplyStepReassurance } from "@/components/apply/ApplyStepReassurance";

interface ApplyStickyFooterProps {
  onContinue: () => void;
  onSave: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  saving?: boolean;
  networkError?: string;
  reassurance?: { icon: ReactNode; text: string } | null;
}

export function ApplyStickyFooter({
  onContinue,
  onSave,
  continueLabel = "Continue",
  continueDisabled = false,
  saving = false,
  networkError,
  reassurance,
}: ApplyStickyFooterProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-2xl">
      <div className="mx-auto max-w-lg px-5 py-4">
        {networkError && (
          <p className="mb-3 rounded-2xl border border-green/30 bg-green/10 px-4 py-3 text-sm text-green-deep">
            {networkError}
          </p>
        )}
        {reassurance && (
          <ApplyStepReassurance icon={reassurance.icon} text={reassurance.text} />
        )}
        <Button fullWidth size="lg" onClick={onContinue} disabled={continueDisabled || saving}>
          {continueLabel}
        </Button>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="mt-3 min-h-11 w-full text-sm font-medium text-muted transition-colors hover:text-ink disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save for later"}
        </button>
      </div>
    </div>
  );
}
