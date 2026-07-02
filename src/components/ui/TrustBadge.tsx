import { type ReactNode } from "react";

interface TrustBadgeProps {
  icon: ReactNode;
  label: string;
}

export function TrustBadge({ icon, label }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-mist px-4 py-3 backdrop-blur-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green/10 text-green-deep">
        {icon}
      </div>
      <span className="text-sm font-medium leading-snug text-ink">{label}</span>
    </div>
  );
}
