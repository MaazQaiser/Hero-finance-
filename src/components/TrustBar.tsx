import { ScrollReveal } from "@/components/ui/ScrollReveal";

const metrics = [
  {
    value: "4.8★",
    label: "Google Reviews",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    value: "Soft",
    label: "Search only",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "AA",
    label: "Inspected Vehicles",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    value: "FCA",
    label: "Regulated",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export function TrustBar() {
  return (
    <section id="trust-bar" className="section-padding !py-12 lg:!py-16">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {metrics.map((metric, i) => (
            <ScrollReveal key={metric.label} delay={i * 80}>
              <div className="card-elevated flex h-full flex-col items-center px-5 py-8 text-center lg:px-6 lg:py-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-green-deep">
                  {metric.icon}
                </div>
                <p className="font-display text-3xl font-extrabold text-ink lg:text-4xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-xs font-bold tracking-wide text-muted">
                  {metric.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
