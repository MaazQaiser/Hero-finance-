"use client";

import { useEffect, useState } from "react";

const trustMessages = [
  "Every car is AA inspected before collection.",
  "Hundreds of cars ready to drive away.",
  "Soft search only. No impact on your credit score.",
  "Finance and your car from one trusted team.",
  "Battery health verified on every EV.",
  "FCA regulated dealer.",
];

const ROTATE_MS = 2500;
const FADE_MS = 400;

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function ApplyLoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setMessageIndex((index) => (index + 1) % trustMessages.length);
        setVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-line border-t-green" />
        <div className="absolute inset-2 animate-pulse rounded-full bg-green/10" />
      </div>

      <h1 className="mt-8 text-2xl font-medium text-ink md:text-3xl">
        Checking your eligibility...
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
        This usually takes a few seconds.
      </p>

      <div
        className="mt-14 flex min-h-[3.5rem] w-full max-w-sm items-center justify-center gap-2.5 transition-opacity duration-[400ms] ease-in-out"
        style={{ opacity: visible ? 1 : 0 }}
        aria-live="polite"
        aria-atomic
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green/10 text-green-deep">
          <CheckIcon className="h-3.5 w-3.5" />
        </span>
        <p className="text-left text-sm leading-snug text-muted">{trustMessages[messageIndex]}</p>
      </div>
    </div>
  );
}
