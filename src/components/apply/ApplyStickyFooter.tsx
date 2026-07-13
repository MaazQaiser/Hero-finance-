"use client";

import { Button } from "@/components/ui/Button";
import { AmbientTrust } from "@/components/apply/AmbientTrust";
import { type AmbientTrustKey } from "@/lib/apply/ambientTrustMessages";

interface ApplyStickyFooterProps {
  onContinue: () => void;
  onSave: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  saving?: boolean;
  networkError?: string;
  trustKey?: AmbientTrustKey | null;
}

export function ApplyStickyFooter({
  onContinue,
  onSave,
  continueLabel = "Continue",
  continueDisabled = false,
  saving = false,
  networkError,
  trustKey,
}: ApplyStickyFooterProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-2xl">
      <div className="mx-auto max-w-lg px-5 py-4">
        {networkError && (
          <p className="motion-error-in mb-3 rounded-2xl border border-green/30 bg-green/10 px-4 py-3 text-sm text-green-deep">
            {networkError}
          </p>
        )}
        {trustKey && <AmbientTrust messageKey={trustKey} className="mb-3" />}
        <Button
          fullWidth
          size="lg"
          onClick={onContinue}
          disabled={continueDisabled || saving}
          loading={saving}
        >
          {continueLabel}
        </Button>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="motion-button mt-3 min-h-11 w-full text-sm font-medium text-muted hover:text-ink disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save for later"}
        </button>
      </div>
    </div>
  );
}
