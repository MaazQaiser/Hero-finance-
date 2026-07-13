"use client";

interface AnimatedProgressProps {
  value: number;
  label?: string;
  className?: string;
}

export function AnimatedProgress({ value, label, className = "" }: AnimatedProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`h-1.5 overflow-hidden rounded-full bg-mist ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? "Progress"}
    >
      <div
        className="motion-progress-bar h-full rounded-full bg-gradient-to-r from-green to-green-bright"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
