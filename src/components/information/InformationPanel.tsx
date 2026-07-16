"use client";

import { type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { InformationSection } from "@/components/information/InformationSection";

export interface InformationPanelProps {
  title: string;
  icon: ReactNode;
  description: string;
  benefits: string[];
  exclusions?: string[];
  exclusionsTitle?: string;
  cta?: { label: string; href?: string; onClick?: () => void };
  onClose?: () => void;
  titleId?: string;
}

export function InformationPanel({
  title,
  icon,
  description,
  benefits,
  exclusions,
  exclusionsTitle = "What's Not Covered",
  cta,
  onClose,
  titleId = "information-panel-title",
}: InformationPanelProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green/10 text-green-deep">
            {icon}
          </div>
          <div>
            <h2 id={titleId} className="text-lg font-medium text-ink">
              {title}
            </h2>
          </div>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="motion-button -mr-1 rounded-full p-2 text-muted hover:bg-mist hover:text-ink"
            aria-label="Close information panel"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        ) : null}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <p className="text-sm leading-relaxed text-muted">{description}</p>

        <InformationSection
          title="Benefits"
          items={benefits}
          variant="positive"
          className="mt-5 rounded-2xl border border-line bg-mist-2 p-4"
        />

        {exclusions && exclusions.length > 0 ? (
          <InformationSection
            title={exclusionsTitle}
            items={exclusions}
            variant="neutral"
            className="mt-4 rounded-2xl border border-line bg-paper p-4"
          />
        ) : null}
      </div>

      {cta ? (
        <div className="border-t border-line px-5 py-4">
          {cta.href ? (
            <Button fullWidth size="lg" href={cta.href} onClick={cta.onClick}>
              {cta.label}
            </Button>
          ) : (
            <Button fullWidth size="lg" onClick={cta.onClick ?? onClose}>
              {cta.label}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
