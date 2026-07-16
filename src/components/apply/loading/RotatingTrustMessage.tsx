"use client";

import { useEffect, useState } from "react";
import {
  TRUST_FADE_DURATION_MS,
  TRUST_ROTATE_INTERVAL_MS,
} from "@/config/loadingMessages";

interface RotatingTrustMessageProps {
  messages: string[];
  intervalMs?: number;
  fadeMs?: number;
  className?: string;
}

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

export function RotatingTrustMessage({
  messages,
  intervalMs = TRUST_ROTATE_INTERVAL_MS,
  fadeMs = TRUST_FADE_DURATION_MS,
  className = "",
}: RotatingTrustMessageProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (messages.length <= 1) return;

    const interval = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((current) => (current + 1) % messages.length);
        setVisible(true);
      }, fadeMs);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [fadeMs, intervalMs, messages.length]);

  if (messages.length === 0) return null;

  return (
    <div
      className={`flex min-h-[3.25rem] w-full max-w-sm items-start justify-center gap-2.5 transition-opacity duration-[250ms] ease-out motion-reduce:transition-none ${className}`}
      style={{ opacity: visible ? 1 : 0 }}
      aria-live="polite"
      aria-atomic
    >
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/10 text-green-deep">
        <CheckIcon className="h-3.5 w-3.5" />
      </span>
      <p className="text-left text-[13px] leading-snug text-muted">{messages[index]}</p>
    </div>
  );
}
