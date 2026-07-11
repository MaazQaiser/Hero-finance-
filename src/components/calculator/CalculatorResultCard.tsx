"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/data/vehicles";
import { useAnimatedNumber } from "@/components/calculator/useAnimatedNumber";
import { type CalculatorMode } from "@/components/calculator/CalculatorModeSwitcher";

interface ResultRow {
  label: string;
  value: string;
  highlight?: boolean;
}

interface CalculatorResultCardProps {
  mode: CalculatorMode;
  headlineLabel: string;
  headlineValue: number;
  apr: number;
  rows: ResultRow[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function CalculatorResultCard({
  mode,
  headlineLabel,
  headlineValue,
  apr,
  rows,
  primaryCta,
  secondaryCta,
}: CalculatorResultCardProps) {
  const animatedHeadline = useAnimatedNumber(headlineValue);
  const animatedApr = useAnimatedNumber(apr, 300);
  const isMonthlyHeadline = mode === "monthly";

  return (
    <div
      className="calculator-result-enter rounded-[var(--radius-card)] border border-green/20 bg-gradient-to-br from-green to-green-deep p-6 text-white md:p-8"
    >
      <p className="text-xs font-medium tracking-wide text-white/70">{headlineLabel}</p>
      <p className="mt-2 font-display text-4xl font-medium tracking-tight text-white md:text-5xl">
        {formatPrice(Math.round(animatedHeadline))}
        {isMonthlyHeadline && (
          <span className="text-lg font-normal text-white/70 md:text-xl">/mo</span>
        )}
      </p>

      <p className="mt-3 text-sm text-white/75 transition-opacity duration-300">
        <span className="font-medium text-green-bright">{animatedApr.toFixed(1)}%</span>{" "}
        representative APR
      </p>

      <div className="mt-6 space-y-3 border-t border-white/15 pt-6">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 text-sm">
            <span className="text-white/70">{row.label}</span>
            <span className={`font-medium ${row.highlight ? "text-green-bright" : "text-white"}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-white/10 p-4 text-xs leading-relaxed text-white/75">
        <p className="font-semibold text-white">Representative example</p>
        <p className="mt-2">
          Hire Purchase. Subject to status and affordability. Terms and conditions apply. Hero Car
          Finance is a credit broker, not a lender.
        </p>
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs font-medium text-white/80">
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />
        </svg>
        Soft search only · no impact on your credit score
      </p>

      <div className="mt-6 hidden space-y-3 md:block">
        {secondaryCta && (
          <Button variant="secondary" fullWidth size="lg" href={secondaryCta.href} className="border-white/20 bg-white/10 text-white hover:bg-white/20">
            {secondaryCta.label}
          </Button>
        )}
        <Button fullWidth size="lg" href={primaryCta.href} className="bg-green-bright text-ink hover:bg-green-bright/90">
          {primaryCta.label}
        </Button>
      </div>

      <div className="mt-4 md:hidden">
        <Link href={primaryCta.href} className="text-sm font-semibold text-green-bright hover:underline">
          {primaryCta.label} →
        </Link>
      </div>
    </div>
  );
}
