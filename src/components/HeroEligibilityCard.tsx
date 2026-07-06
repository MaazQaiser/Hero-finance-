"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { initialApplicationData } from "@/lib/apply/types";
import { saveProgress } from "@/lib/apply/storage";

const ukMobileRegex = /^(\+44|0)7\d{9}$/;
const TOTAL_STEPS = 5;

interface HeroEligibilityCardProps {
  variant?: "default" | "floating" | "cyclix" | "v2";
}

function cleanMobile(value: string): string {
  return value.replace(/\s+/g, "");
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ProgressGauge({ active }: { active: boolean }) {
  const circumference = 2 * Math.PI * 48;

  return (
    <div className="relative mb-6 h-28 w-28" aria-hidden>
      <svg className="h-full w-full -rotate-90" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r="48" fill="none" stroke="#EAF6EF" strokeWidth="6" />
        <circle
          cx="56"
          cy="56"
          r="48"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          className="transition-[stroke-dashoffset] duration-[1000ms] ease-out"
          style={{ strokeDashoffset: active ? circumference * 0.15 : circumference }}
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A65A" />
            <stop offset="100%" stopColor="#2FD480" />
          </linearGradient>
        </defs>
      </svg>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          active ? "scale-100 opacity-100 delay-700" : "scale-50 opacity-0"
        }`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green text-white shadow-[0_8px_24px_rgba(91,43,212,0.4)]">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function HeroEligibilityCard({ variant = "default" }: HeroEligibilityCardProps) {
  const isCyclix = variant === "cyclix";
  const isV2 = variant === "v2";
  const isFloating = variant === "floating";

  const [firstName, setFirstName] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState<{ firstName?: string; mobile?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [gaugeActive, setGaugeActive] = useState(false);
  const decisionRef = useRef<HTMLDivElement>(null);

  const validate = useCallback(() => {
    const next: { firstName?: string; mobile?: string } = {};
    if (!firstName.trim()) next.firstName = "Please enter your first name";
    const cleaned = cleanMobile(mobile);
    if (!cleaned) next.mobile = "Please enter your mobile number";
    else if (!ukMobileRegex.test(cleaned)) next.mobile = "Please enter a valid UK mobile number";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [firstName, mobile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    saveProgress(
      { ...initialApplicationData, firstName: firstName.trim(), mobile: cleanMobile(mobile) },
      "basic-details",
    );
    await new Promise((resolve) => setTimeout(resolve, 700));
    setShowDecision(true);
    requestAnimationFrame(() => setGaugeActive(true));
    setSubmitting(false);
  };

  useEffect(() => {
    if (showDecision && decisionRef.current) decisionRef.current.focus();
  }, [showDecision]);

  const displayName = firstName.trim() || "there";

  const shellClass = isV2
    ? "relative"
    : isCyclix
      ? "glass-form-card relative"
      : isFloating
        ? "overflow-hidden rounded-[20px] border border-line bg-paper shadow-[0_24px_64px_rgba(30,22,53,0.18)]"
        : "hero-glass-card relative overflow-hidden p-5 md:p-6 lg:p-7";

  const inputClass = isV2
    ? (hasError: boolean) =>
        `w-full rounded-xl border bg-white px-4 py-3.5 text-base text-ink placeholder:text-muted/60 focus:border-ink/20 focus:outline-none focus:ring-2 focus:ring-green/15 ${
          hasError ? "border-coral" : "border-line"
        }`
    : isCyclix
      ? (hasError: boolean) => `cyclix-input ${hasError ? "ring-2 ring-coral/40" : ""}`
      : (hasError: boolean) =>
          `w-full rounded-[13px] border-[1.5px] bg-[#fcfdfc] px-3.5 py-3 text-base text-ink placeholder:text-muted/60 focus:border-green focus:outline-none focus:ring-[3px] focus:ring-green/15 ${
            hasError ? "border-coral" : "border-line"
          }`;

  return (
    <div className={`${shellClass} relative`}>
      {!showDecision && !isV2 && (
        <div className={isCyclix ? "mb-6" : isFloating ? "border-b border-line/60 px-5 py-4 md:px-6" : "mb-5"}>
          {isFloating && !isCyclix && (
            <div className="flex items-center gap-4 bg-green px-5 py-4">
              <p className="font-display text-sm font-extrabold tracking-wide text-white">
                Get approved in 60 seconds
              </p>
            </div>
          )}

          <div className={isFloating && !isCyclix ? "p-5 md:p-6" : ""}>
            {isCyclix && (
              <p className="mb-3 text-xs font-semibold tracking-wide text-green-deep">
                Quick eligibility check
              </p>
            )}

            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-xs font-bold text-green-deep">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
                </span>
                Step 1 of {TOTAL_STEPS}
              </span>
              <span className="text-xs font-semibold text-muted">~60 seconds</span>
            </div>

            <div
              className="h-1.5 overflow-hidden rounded-full bg-mist"
              role="progressbar"
              aria-valuenow={1}
              aria-valuemin={0}
              aria-valuemax={TOTAL_STEPS}
              aria-label="Application progress"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-green to-green-bright transition-all duration-700"
                style={{ width: `${(1 / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className={isFloating && !isCyclix && !isV2 && !showDecision ? "px-5 pb-5 md:px-6 md:pb-6" : isV2 ? "pt-2" : ""}>
        <form onSubmit={handleSubmit} className={showDecision ? "invisible" : ""} noValidate>
          {isV2 && !showDecision && (
            <>
              <div className="mb-4 flex items-center justify-between gap-3 text-xs font-semibold text-muted">
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
                  </span>
                  Step 1 of {TOTAL_STEPS}
                </span>
                <span>~60 seconds</span>
              </div>
              <div
                className="mb-6 h-1.5 overflow-hidden rounded-full bg-mist"
                role="progressbar"
                aria-valuenow={1}
                aria-valuemin={0}
                aria-valuemax={TOTAL_STEPS}
                aria-label="Application progress"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green to-green-bright transition-all duration-700"
                  style={{ width: `${(1 / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </>
          )}

          <div className={isCyclix || isV2 ? "mb-5" : "mb-3"}>
            <label
              htmlFor="hero-first-name"
              className={`mb-2 block font-semibold text-ink ${isV2 ? "text-[13px]" : "text-sm"}`}
            >
              First name
            </label>
            <input
              id="hero-first-name"
              type="text"
              autoComplete="given-name"
              placeholder="e.g. Jordan"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
              }}
              className={inputClass(!!errors.firstName)}
            />
            {errors.firstName && <p className="mt-1.5 text-xs text-coral">{errors.firstName}</p>}
          </div>

          <div className={isCyclix || isV2 ? "mb-6" : "mb-4"}>
            <label
              htmlFor="hero-mobile"
              className={`mb-2 block font-semibold text-ink ${isV2 ? "text-[13px]" : "text-sm"}`}
            >
              Mobile number
            </label>
            <input
              id="hero-mobile"
              type="tel"
              autoComplete="tel"
              placeholder="07…"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: undefined }));
              }}
              className={inputClass(!!errors.mobile)}
            />
            <p className="mt-2 text-xs text-muted">We&apos;ll text your decision — no spam, ever.</p>
            {errors.mobile && <p className="mt-1.5 text-xs text-coral">{errors.mobile}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={
              isV2
                ? "flex w-full items-center justify-center gap-2 rounded-full bg-green-bright py-4 text-base font-bold text-ink transition-colors hover:bg-green-bright/90 disabled:opacity-70"
                : isCyclix
                  ? "cyclix-cta"
                  : "font-display flex w-full items-center justify-center gap-2 rounded-[14px] bg-green px-4 py-3.5 text-base font-bold text-white shadow-[0_8px_20px_rgba(91,43,212,0.32)] transition-[transform,background-color] hover:bg-green-deep active:scale-[0.98] disabled:opacity-70"
            }
          >
            {submitting ? "Checking…" : "Check my eligibility"}
            {!submitting && <ArrowIcon className="h-[18px] w-[18px]" />}
          </button>

          {!isV2 && (
            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs font-semibold text-muted">
              <ShieldIcon className="h-3.5 w-3.5 shrink-0 text-green" />
              Soft search only · no impact on your credit file
            </p>
          )}
        </form>
      </div>

      <div
        ref={decisionRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hero-decision-title"
        aria-hidden={!showDecision}
        className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all duration-500 ${
          isCyclix ? "rounded-[24px]" : isV2 ? "rounded-[20px]" : "rounded-[20px]"
        } ${
          showDecision
            ? isV2
              ? "pointer-events-auto bg-white/92 opacity-100 backdrop-blur-sm"
              : "pointer-events-auto bg-white/90 opacity-100 backdrop-blur-xl"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`w-full max-w-sm rounded-[20px] p-8 shadow-[0_0_60px_rgba(91,43,212,0.15)] ${
            isV2
              ? "border border-line/80 bg-white"
              : "border border-green/20 bg-white/90"
          }`}
        >
          <ProgressGauge active={gaugeActive} />
          <h3 id="hero-decision-title" className="font-display mb-2 text-2xl font-bold text-ink">
            Good news, {displayName}!
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-muted">
            Based on what you&apos;ve told us, you look likely to be accepted. Let&apos;s finish the quick bits and match you to a car.
          </p>
          <Link href="/apply?resume=true" className="cyclix-cta">
            Continue my application
            <ArrowIcon className="h-[18px] w-[18px]" />
          </Link>
          <p className="mt-4 text-[11.5px] leading-snug text-muted">
            This is an eligibility indication based on a soft search, not a guaranteed offer.
          </p>
        </div>
      </div>
    </div>
  );
}
