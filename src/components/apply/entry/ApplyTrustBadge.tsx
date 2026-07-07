import { type ReactNode } from "react";

interface ApplyTrustBadgeProps {
  icon?: ReactNode;
  label: string;
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

export function ApplyTrustBadge({ icon, label }: ApplyTrustBadgeProps) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-line bg-paper px-3.5 py-2.5 shadow-[0_2px_12px_rgba(91,43,212,0.04)]">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green/10 text-green-deep">
        {icon ?? <CheckIcon className="h-3.5 w-3.5" />}
      </span>
      <span className="text-[13px] font-semibold leading-tight text-ink">{label}</span>
    </div>
  );
}
