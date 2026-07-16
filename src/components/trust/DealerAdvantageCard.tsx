"use client";

import { vehicleTrustContent } from "@/config/vehicleTrustContent";

interface DealerAdvantageCardProps {
  className?: string;
}

const staggerDelays = ["0ms", "50ms", "100ms", "150ms", "200ms"];

export function DealerAdvantageCard({ className = "" }: DealerAdvantageCardProps) {
  const { dealerAdvantages } = vehicleTrustContent;

  return (
    <section
      className={`motion-card rounded-[var(--radius-card)] border border-line bg-mist-2 p-5 ${className}`}
      aria-label={dealerAdvantages.title}
    >
      <p className="text-sm font-semibold text-ink">{dealerAdvantages.title}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted">{dealerAdvantages.subtitle}</p>
      <ul className="mt-4 space-y-2">
        {dealerAdvantages.items.map((item, index) => (
          <li
            key={item}
            className="approval-trust-item flex items-start gap-2.5 text-sm text-muted"
            style={{ animationDelay: staggerDelays[index] ?? "200ms" }}
          >
            <span className="mt-0.5 text-green-deep" aria-hidden>
              ✓
            </span>
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
