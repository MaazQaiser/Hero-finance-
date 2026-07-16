"use client";

import { Button } from "@/components/ui/Button";
import { AmbientTrust } from "@/components/apply/AmbientTrust";
import { getTrustMessage, type TrustMessageKey } from "@/config/trustMessages";

interface ApplyStickyFooterProps {
  onContinue: () => void;
  onSave: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  saving?: boolean;
  networkError?: string;
  trustKey?: TrustMessageKey | null;
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
        {trustKey ? (
          <AmbientTrust message={getTrustMessage(trustKey)} className="mb-3" />
        ) : null}
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
          className="motion-button min-h-11 w-full rounded-full border border-green/25 bg-green/10 text-sm font-semibold text-green-deep hover:border-green/40 hover:bg-green/15 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save & Continue Later"}
        </button>
      </div>
    </div>
  );
}
