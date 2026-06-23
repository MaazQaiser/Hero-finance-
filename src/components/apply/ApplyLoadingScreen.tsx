"use client";

const trustItems = [
  { label: "Soft search only", icon: "🔍" },
  { label: "No impact on credit score", icon: "✓" },
  { label: "Secure application", icon: "🔒" },
];

export function ApplyLoadingScreen() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-cream/10 border-t-coral" />
        <div className="absolute inset-2 animate-pulse rounded-full bg-coral/10" />
      </div>

      <h1 className="mt-8 text-2xl font-medium text-cream md:text-3xl">
        Checking your eligibility...
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-muted">
        This usually takes just a few seconds.
      </p>

      <div className="mt-12 w-full max-w-sm rounded-[var(--radius-card)] border border-cream/10 bg-surface/60 p-5">
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-cream-muted">
          What&apos;s happening
        </p>
        <ul className="space-y-3">
          {trustItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 text-left text-sm text-cream"
            >
              <span
                aria-hidden
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/10 text-sm"
              >
                {item.icon}
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
