"use client";

import { Button } from "@/components/ui/Button";

interface ApplySessionTimeoutProps {
  onResume: () => void;
  onStartAgain: () => void;
}

export function ApplySessionTimeout({ onResume, onStartAgain }: ApplySessionTimeoutProps) {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-line bg-paper">
        <svg
          className="h-7 w-7 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-medium text-ink md:text-3xl">
        Your session has expired
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
        Don&apos;t worry — your progress has been saved.
      </p>

      <div className="mt-10 w-full max-w-sm space-y-3">
        <Button fullWidth size="lg" onClick={onResume}>
          Resume Application
        </Button>
        <Button fullWidth variant="secondary" size="lg" onClick={onStartAgain}>
          Start Again
        </Button>
      </div>

      <p className="mt-8 flex items-center justify-center gap-2 text-xs text-muted">
        <span aria-hidden className="text-success">
          ✓
        </span>
        Your information is securely saved.
      </p>
    </div>
  );
}
