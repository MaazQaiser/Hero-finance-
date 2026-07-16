"use client";

import { Button } from "@/components/ui/Button";
import { InformationTrigger } from "@/components/information/InformationTrigger";
import { vehicleTrustContent } from "@/config/vehicleTrustContent";

interface BatteryCardProps {
  onViewReport?: () => void;
  className?: string;
}

function BatteryIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 11v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 11h4M6 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function BatteryCard({ onViewReport, className = "" }: BatteryCardProps) {
  const { battery } = vehicleTrustContent;

  return (
    <article
      className={`motion-card motion-card-interactive rounded-[var(--radius-card)] border border-line bg-paper p-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green/10 text-green-deep">
          <BatteryIcon />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-semibold text-ink">{battery.title}</h3>
            <InformationTrigger topic="batteryHealth" />
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted">{battery.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {onViewReport ? (
              <Button
                type="button"
                variant="secondary"
                size="md"
                className="!px-4 !py-2 text-sm"
                onClick={onViewReport}
              >
                {battery.actionLabel}
              </Button>
            ) : null}
            <InformationTrigger topic="batteryHealth" variant="learn-more" />
          </div>
        </div>
      </div>
    </article>
  );
}
