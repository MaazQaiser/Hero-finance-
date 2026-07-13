"use client";

const defaultItems = [
  "Soft search completed",
  "FCA regulated dealership",
  "Hundreds of inspected cars",
  "Trusted finance specialists",
];

interface ApprovalChecklistProps {
  items?: string[];
}

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

export function ApprovalChecklist({ items = defaultItems }: ApprovalChecklistProps) {
  return (
    <section className="hero-fade-up-delay-4 border-t border-line pt-6">
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm text-ink">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/10 text-green-deep">
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
            <span className="leading-snug text-muted">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
