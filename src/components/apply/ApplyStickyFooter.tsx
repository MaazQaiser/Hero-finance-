"use client";

import { Button } from "@/components/ui/Button";

interface ApplyStickyFooterProps {
  onContinue: () => void;
  onSave: () => void;
  continueLabel?: string;
  saving?: boolean;
  networkError?: string;
}

export function ApplyStickyFooter({
  onContinue,
  onSave,
  continueLabel = "Continue",
  saving = false,
  networkError,
}: ApplyStickyFooterProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-2xl">
      <div className="mx-auto max-w-lg px-5 py-4">
        {networkError && (
          <p className="mb-3 rounded-2xl border border-green/30 bg-green/10 px-4 py-3 text-sm text-green-deep">
            {networkError}
          </p>
        )}
        <Button fullWidth size="lg" onClick={onContinue}>
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
