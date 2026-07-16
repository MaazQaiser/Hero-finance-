import { type CSSProperties } from "react";

interface TrustBadgeProps {
  label: string;
  className?: string;
  style?: CSSProperties;
}

export function TrustBadge({ label, className = "", style }: TrustBadgeProps) {
  return (
    <span
      style={style}
      className={`motion-trust-badge inline-flex items-center gap-1.5 rounded-full border border-green/25 bg-green/10 px-2.5 py-1 text-xs font-medium text-green-deep ${className}`}
    >
      <span aria-hidden className="text-[10px] leading-none">
        ✓
      </span>
      {label}
    </span>
  );
}
