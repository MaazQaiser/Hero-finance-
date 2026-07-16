"use client";

import { Button } from "@/components/ui/Button";
import { InformationTrigger } from "@/components/information/InformationTrigger";
import { vehicleTrustContent } from "@/config/vehicleTrustContent";

interface InspectionCardProps {
  onViewCertificate?: () => void;
  className?: string;
}

function ShieldCheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11 4.6-.85 8-5.75 8-11V6l-8-4z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function InspectionCard({ onViewCertificate, className = "" }: InspectionCardProps) {
  const { inspection } = vehicleTrustContent;

  return (
    <article
      className={`motion-card motion-card-interactive rounded-[var(--radius-card)] border border-line bg-paper p-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green/10 text-green-deep">
          <ShieldCheckIcon />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-semibold text-ink">{inspection.title}</h3>
            <InformationTrigger topic="aaInspection" />
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted">{inspection.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {onViewCertificate ? (
              <Button
                type="button"
                variant="secondary"
                size="md"
                className="!px-4 !py-2 text-sm"
                onClick={onViewCertificate}
              >
                {inspection.actionLabel}
              </Button>
            ) : null}
            <InformationTrigger topic="aaInspection" variant="learn-more" />
          </div>
        </div>
      </div>
    </article>
  );
}
