"use client";

import { approvalContent } from "@/config/approvalContent";

interface HeroTrustChecklistProps {
  items?: string[];
}

const staggerDelays = ["0ms", "60ms", "120ms", "180ms", "240ms"];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function HeroTrustChecklist({
  items = approvalContent.trustChecklist,
}: HeroTrustChecklistProps) {
  return (
    <section className="border-t border-line pt-5" aria-label="Why Hero">
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li
            key={item}
            className="approval-trust-item flex items-start gap-2.5 text-sm"
            style={{ animationDelay: staggerDelays[index] ?? "240ms" }}
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green/10 text-green-deep">
              <CheckIcon className="h-3 w-3" />
            </span>
            <span className="leading-snug text-muted">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
