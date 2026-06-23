import { type ReactNode } from "react";

interface TrustBadgeProps {
  icon: ReactNode;
  label: string;
}

export function TrustBadge({ icon, label }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-cream/10 bg-charcoal/40 px-4 py-3 backdrop-blur-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream/10 text-coral">
        {icon}
      </div>
      <span className="text-sm font-medium leading-snug text-cream">{label}</span>
    </div>
  );
}
