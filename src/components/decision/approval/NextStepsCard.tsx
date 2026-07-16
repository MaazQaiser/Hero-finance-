"use client";

import { approvalContent } from "@/config/approvalContent";
import { vehicleTrustContent } from "@/config/vehicleTrustContent";

interface NextStepsCardProps {
  title?: string;
  steps?: string[];
}

const staggerDelays = ["0ms", "60ms", "120ms", "180ms"];

export function NextStepsCard({
  title = vehicleTrustContent.nextSteps.title,
  steps = approvalContent.nextSteps.steps ?? vehicleTrustContent.nextSteps.steps,
}: NextStepsCardProps) {
  return (
    <section className="motion-card approval-next-steps rounded-[var(--radius-card)] border border-line bg-mist-2 p-5">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-3 space-y-2">
        {steps.map((step, index) => (
          <li
            key={step}
            className="approval-trust-item flex items-start gap-2.5 text-sm text-muted"
            style={{ animationDelay: staggerDelays[index] ?? "180ms" }}
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green/10 text-xs font-medium text-green-deep">
              {index + 1}
            </span>
            <span className="leading-snug">{step}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
