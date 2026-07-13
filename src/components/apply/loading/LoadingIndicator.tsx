"use client";

interface LoadingIndicatorProps {
  /** 0–1 visual progress through the sequence (not a fake %) */
  progress: number;
}

export function LoadingIndicator({ progress }: LoadingIndicatorProps) {
  const clamped = Math.min(1, Math.max(0, progress));
  const circumference = 2 * Math.PI * 34;
  const offset = circumference * (1 - clamped);

  return (
    <div className="relative mx-auto h-20 w-20" aria-hidden>
      <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-line"
        />
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-green transition-[stroke-dashoffset] duration-500 ease-out"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-10 w-10 animate-pulse rounded-full bg-green/10" />
        <div className="absolute flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-green opacity-40 animate-pulse [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-green opacity-70 animate-pulse [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
