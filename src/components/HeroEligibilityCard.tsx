"use client";

import Link from "next/link";
import { SECTIONS } from "@/lib/apply/sections";

interface HeroEligibilityCardProps {
  variant?: "default" | "floating" | "cyclix" | "v2";
  introHeadline?: string;
  introBody?: string;
  ctaLabel?: string;
  trustMessage?: string;
  applyHref?: string;
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

/** Compact journey preview — same segmented model as the apply flow. */
function JourneyStartPreview() {
  return (
    <div className="mb-5">
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <span className="text-xs font-semibold text-ink">{SECTIONS[0].name}</span>
        <span className="text-xs font-medium text-muted">Takes about 60 seconds to begin</span>
      </div>
      <div className="flex gap-1" aria-hidden>
        {SECTIONS.map((section, i) => (
          <div
            key={section.name}
            className="h-1 flex-1 overflow-hidden rounded-full bg-mist"
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                i === 0
                  ? "w-[28%] bg-gradient-to-r from-green to-green-bright"
                  : "w-0 bg-green"
              }`}
            />
          </div>
        ))}
      </div>
      <p className="mt-2.5 text-xs font-medium text-muted">Starts with a few quick questions</p>
    </div>
  );
}

export function HeroEligibilityCard({
  variant = "default",
  introHeadline = "Check your eligibility in minutes",
  introBody = "A few quick questions, then a soft search that won't affect your credit score.",
  ctaLabel = "See what you can afford",
  trustMessage = "Soft search only · no impact on your credit file",
  applyHref = "/apply",
}: HeroEligibilityCardProps) {
  const isCyclix = variant === "cyclix";
  const isV2 = variant === "v2";
  const isFloating = variant === "floating";

  const shellClass = isV2
    ? "relative overflow-hidden rounded-[24px] border border-line bg-paper p-5 shadow-[0_20px_56px_rgba(30,22,53,0.18)] sm:p-6"
    : isCyclix
      ? "glass-form-card relative"
      : isFloating
        ? "overflow-hidden rounded-[20px] border border-line bg-paper shadow-[0_24px_64px_rgba(30,22,53,0.18)]"
        : "hero-glass-card relative overflow-hidden p-5 md:p-6 lg:p-7";

  return (
    <div className={`${shellClass} relative`}>
      {!isV2 && (
        <div className={isCyclix ? "mb-6" : isFloating ? "border-b border-line/60 px-5 py-4 md:px-6" : "mb-5"}>
          {isFloating && !isCyclix && (
            <div className="flex items-center gap-4 bg-green px-5 py-4">
              <p className="font-display text-sm font-extrabold tracking-wide text-white">
                Takes about 60 seconds to begin
              </p>
            </div>
          )}

          <div className={isFloating && !isCyclix ? "p-5 md:p-6" : ""}>
            {isCyclix && (
              <p className="mb-3 text-xs font-semibold tracking-wide text-green-deep">
                Quick Start
              </p>
            )}

            <JourneyStartPreview />
          </div>
        </div>
      )}

      <div className={isFloating && !isCyclix && !isV2 ? "px-5 pb-5 md:px-6 md:pb-6" : ""}>
        {isV2 && <JourneyStartPreview />}

        <h3 className={`font-display font-bold text-ink ${isV2 ? "text-xl" : "text-lg"}`}>
          {introHeadline}
        </h3>
        <p className={`mt-2 text-muted ${isV2 ? "text-sm leading-relaxed" : "text-sm"}`}>
          {introBody}
        </p>

        <Link
          href={applyHref}
          className={
            isV2
              ? "mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-green-bright py-4 text-base font-bold text-ink transition-colors hover:bg-green-bright/90"
              : isCyclix
                ? "cyclix-cta mt-6"
                : "font-display mt-5 flex w-full items-center justify-center gap-2 rounded-[14px] bg-green px-4 py-3.5 text-base font-bold text-white shadow-[0_8px_20px_rgba(91,43,212,0.32)] transition-[transform,background-color] hover:bg-green-deep active:scale-[0.98]"
          }
        >
          {ctaLabel}
          <ArrowIcon className="h-[18px] w-[18px]" />
        </Link>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs font-semibold text-muted">
          <ShieldIcon className="h-3.5 w-3.5 shrink-0 text-green" />
          {trustMessage}
        </p>
      </div>
    </div>
  );
}
