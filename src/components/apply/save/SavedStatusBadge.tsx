"use client";

interface SavedStatusBadgeProps {
  label?: string;
}

export function SavedStatusBadge({ label = "Securely saved" }: SavedStatusBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-green/20 bg-green/10 px-3 py-1 text-xs font-medium text-green-deep">
      <span aria-hidden>✓</span>
      {label}
    </span>
  );
}
