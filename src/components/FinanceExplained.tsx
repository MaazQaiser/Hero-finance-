import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const points = [
  {
    title: "What is HP?",
    description:
      "Hire Purchase (HP) lets you spread the cost of a car over fixed monthly payments. You own the vehicle once all payments are made.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Fixed payments",
    description:
      "Know exactly what you'll pay each month. Your rate and term are agreed upfront — no surprises.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Own your car",
    description:
      "At the end of your agreement, the car is yours. No balloon payment, no mileage limits.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 15l-3-3h6l-3 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M5 9h14l-1.5 6H6.5L5 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function FinanceExplained() {
  return (
    <section id="finance-explained" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Finance explained"
          title="Hire Purchase, made simple"
          description="A straightforward way to finance your car. No jargon, no hidden fees."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {points.map((point) => (
            <Card key={point.title} className="text-center md:text-left">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-coral/10 text-coral md:mx-0">
                {point.icon}
              </div>
              <h3 className="text-xl font-medium text-cream">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-muted">
                {point.description}
              </p>
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-cream-muted">
          Representative example: Borrowing £10,000 over 48 months at 9.9% APR
          would cost £251.32 per month. Total repayable £12,063.36. Subject to
          status. 18+ UK residents only.
        </p>
      </div>
    </section>
  );
}
