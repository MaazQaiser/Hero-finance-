import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const lenders = ["Close Brothers", "Black Horse", "Santander", "MotoNovo"];

const stats = [
  { value: "10,000+", label: "Drivers financed" },
  { value: "15+", label: "Years in business" },
  { value: "4.8★", label: "Customer rating" },
];

const reviews = [
  {
    quote:
      "The soft search gave me confidence to apply. Approved the same day and I reserved my car online.",
    name: "Sarah M.",
    location: "Manchester",
  },
  {
    quote:
      "One team handled everything — finance and the car. No back and forth with brokers.",
    name: "James T.",
    location: "Birmingham",
  },
  {
    quote:
      "Clear monthly payments, AA inspected car, and a smooth process from start to finish.",
    name: "Priya K.",
    location: "Leeds",
  },
];

export function TrustReviews() {
  return (
    <section id="trust-reviews" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Trust & reviews"
          title="Trusted by thousands of UK drivers"
          description="Regulated, lender-backed, and rated highly by our customers."
          align="center"
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-[var(--radius-card)] border border-cream/10 bg-surface px-6 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-coral/30 bg-coral/10 text-sm font-bold text-coral">
              FCA
            </div>
            <p className="mt-4 text-sm font-medium text-cream">FCA regulated</p>
            <p className="mt-2 text-xs leading-relaxed text-cream-muted">
              Authorised and regulated by the Financial Conduct Authority. Firm reference: 123456.
            </p>
          </div>

          <div className="flex flex-col items-center rounded-[var(--radius-card)] border border-cream/10 bg-surface px-6 py-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream-muted">
              Lender panel
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {lenders.map((partner) => (
                <span
                  key={partner}
                  className="rounded-full border border-cream/10 bg-charcoal/60 px-4 py-2 text-xs font-medium text-cream-muted"
                >
                  {partner}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-cream-muted">Partnered with leading UK lenders</p>
          </div>

          <div className="flex flex-col items-center rounded-[var(--radius-card)] border border-cream/10 bg-surface px-6 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-success/30 bg-success/10 text-lg font-bold text-success">
              AA
            </div>
            <p className="mt-4 text-sm font-medium text-cream">AA inspected vehicles</p>
            <p className="mt-2 text-xs leading-relaxed text-cream-muted">
              Every car in our stock is independently inspected for your peace of mind.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-light text-coral md:text-5xl">{stat.value}</p>
              <p className="mt-2 text-sm text-cream-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.name}>
              <div className="mb-4 flex gap-1 text-coral" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-cream-muted">&ldquo;{review.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-medium text-cream">{review.name}</p>
              <p className="text-xs text-cream-muted">{review.location}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
