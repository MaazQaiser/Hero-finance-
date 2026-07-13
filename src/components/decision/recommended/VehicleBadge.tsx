"use client";

interface VehicleBadgeProps {
  label: string;
}

export function VehicleBadge({ label }: VehicleBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-line bg-paper/95 px-2.5 py-1 text-[11px] font-medium text-ink backdrop-blur-sm">
      <span className="text-green-deep" aria-hidden>
        ✓
      </span>
      {label}
    </span>
  );
}
