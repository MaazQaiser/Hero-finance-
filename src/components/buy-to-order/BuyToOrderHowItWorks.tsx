import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Tell us your requirements",
    description: "Share your ideal make, model, budget, and any must-haves.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 6h16M4 12h10M4 18h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "We source matching vehicles",
    description: "Our experts search our network for AA-inspected options that fit.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Finance and delivery arranged",
    description: "One team handles HP finance, reservation, and handover.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 9h14l-1.5 6H6.5L5 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="8" cy="17" r="1.5" fill="currentColor" />
        <circle cx="16" cy="17" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

export function BuyToOrderHowItWorks() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How it works"
          title="Your personal car sourcing concierge"
          description="A premium service designed to find exactly what you need — without the hassle."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.number} className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green/10 text-green-deep">
                  {step.icon}
                </div>
                <span className="text-4xl font-light text-line">{step.number}</span>
              </div>
              <h3 className="text-xl font-medium text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
