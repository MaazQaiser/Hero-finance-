import { type ReactNode } from "react";

interface ApplyInfoCardProps {
  icon: ReactNode;
  title: string;
  items: string[];
  className?: string;
}

export function ApplyInfoCard({ icon, title, items, className = "" }: ApplyInfoCardProps) {
  return (
    <div
      className={`motion-card motion-card-interactive group rounded-[24px] border border-line bg-paper p-5 shadow-[0_8px_32px_rgba(91,43,212,0.06)] md:p-6 ${className}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-green/10 to-mist text-green-deep transition-colors group-hover:from-green/15">
        {icon}
      </div>

      <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-ink">{title}</h3>

      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-muted">
            <span className="h-1 w-1 shrink-0 rounded-full bg-green/40" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
