"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ResumeLinkSentProps {
  onContinue: () => void;
}

export function ResumeLinkSent({ onContinue }: ResumeLinkSentProps) {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-success/10" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
          <svg
            className="h-8 w-8 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h1 className="text-2xl font-medium text-cream md:text-3xl">
        Your resume link has been sent.
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-muted">
        Check your phone and continue where you left off.
      </p>

      <div className="mt-10 w-full max-w-sm space-y-3">
        <Button fullWidth size="lg" onClick={onContinue}>
          Continue Now
        </Button>
        <Button fullWidth variant="secondary" size="lg" href="/cars">
          Browse Cars
        </Button>
      </div>

      <p className="mt-8 text-xs text-cream-muted">
        Didn&apos;t receive it?{" "}
        <Link href="mailto:support@herocarfinance.co.uk" className="text-coral hover:underline">
          Contact support
        </Link>
      </p>
    </div>
  );
}
