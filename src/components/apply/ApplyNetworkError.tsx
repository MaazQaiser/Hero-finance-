"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ApplyNetworkErrorProps {
  onRetry: () => void;
}

export function ApplyNetworkError({ onRetry }: ApplyNetworkErrorProps) {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-green/20 bg-green/10">
        <svg
          className="h-7 w-7 text-green-deep"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-medium text-ink md:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
        We couldn&apos;t complete your application right now. Your progress is safe — please try again in a moment.
      </p>

      <div className="mt-10 w-full max-w-sm space-y-3">
        <Button fullWidth size="lg" onClick={onRetry}>
          Try Again
        </Button>
        <Button fullWidth variant="secondary" size="lg" href="mailto:support@herocarfinance.co.uk">
          Contact Support
        </Button>
      </div>

      <p className="mt-8 text-xs text-muted">
        Or email us at{" "}
        <Link href="mailto:support@herocarfinance.co.uk" className="text-green-deep hover:underline">
          support@herocarfinance.co.uk
        </Link>
      </p>
    </div>
  );
}
