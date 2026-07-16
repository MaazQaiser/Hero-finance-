"use client";

import { ELIGIBILITY_STATE_FADE_MS } from "@/config/loadingMessages";

interface LoadingStatusProps {
  title: string;
  description: string;
  visible: boolean;
}

export function LoadingStatus({ title, description, visible }: LoadingStatusProps) {
  return (
    <div
      className={`mx-auto max-w-sm transition-all ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
      style={{ transitionDuration: `${ELIGIBILITY_STATE_FADE_MS}ms` }}
      aria-live="polite"
      aria-atomic
    >
      <h1 className="text-2xl font-medium text-ink md:text-3xl">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
