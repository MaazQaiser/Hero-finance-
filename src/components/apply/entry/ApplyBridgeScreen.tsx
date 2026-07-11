"use client";

import { ApplyPrimaryButton } from "@/components/apply/entry/ApplyPrimaryButton";

interface ApplyBridgeScreenProps {
  onContinue: () => void;
}

function BridgeIllustration() {
  return (
    <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center" aria-hidden>
      <div className="absolute inset-0 rounded-full bg-green/10" />
      <div className="absolute inset-3 rounded-full border-2 border-green/20" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green to-green-deep text-white shadow-[0_12px_32px_rgba(91,43,212,0.28)]">
        <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2" />
          <circle cx="7.5" cy="17" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="16.5" cy="17" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      </div>
    </div>
  );
}

export function ApplyBridgeScreen({ onContinue }: ApplyBridgeScreenProps) {
  return (
    <div className="bg-paper">
      <main className="mx-auto flex max-w-lg flex-col justify-center px-5 pb-12 pt-8 text-center md:px-8">
        <BridgeIllustration />

        <h1 className="headline-md">You&apos;re in the right place.</h1>
        <p className="body-lg mx-auto mt-4 max-w-md">
          Most people we help have been turned down elsewhere. Let&apos;s complete the remaining
          details.
        </p>

        <div className="mt-8">
          <ApplyPrimaryButton
            onClick={onContinue}
            reassurance="Soft search only • No impact on your credit score"
          >
            Continue Application
          </ApplyPrimaryButton>
        </div>
      </main>
    </div>
  );
}
