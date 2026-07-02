import { ScrollReveal } from "@/components/ui/ScrollReveal";

const metrics = [
  {
    value: "4.8★",
    label: "Trustpilot",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    value: "8.9%",
    label: "Rates from APR",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2v20M17 7H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "AA",
    label: "Assured cars",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    value: "10,000+",
    label: "Drivers financed",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 11h5M18.5 8.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
