"use client";

import { useEffect, useState } from "react";

const DEFAULT_MESSAGES = [
  "Soft search only — your credit score isn't affected.",
  "You're applying directly with a trusted dealer.",
  "Hundreds of inspected cars are ready to drive away.",
  "FCA regulated and fully secure.",
  "Your information is encrypted and protected.",
];

const ROTATE_MS = 2200;
const FADE_MS = 300;

interface LoadingMessageProps {
  messages?: string[];
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

export function LoadingMessage({ messages = DEFAULT_MESSAGES }: LoadingMessageProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (messages.length <= 1) return;

    const interval = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((current) => (current + 1) % messages.length);
        setVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);

    return () => window.clearInterval(interval);
  }, [messages]);

  return (
    <div
      className="flex min-h-[3.25rem] w-full max-w-sm items-start justify-center gap-2.5 transition-opacity duration-300 ease-out"
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
