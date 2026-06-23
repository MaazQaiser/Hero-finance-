import { Button } from "@/components/ui/Button";
import { type FinanceDecision } from "@/lib/apply/decision";
import { DecisionSupportCard } from "@/components/decision/DecisionSupportCard";
import { DecisionTrustStrip } from "@/components/decision/DecisionTrustStrip";

interface DeclinedDecisionProps {
  decision: FinanceDecision;
}

const steps = [
  {
    title: "Our team reviews your details",
    description: "A specialist looks at your application personally.",
  },
  {
    title: "We explore more finance options",
    description: "We work with a panel of lenders to find alternatives.",
  },
  {
    title: "We contact you directly",
    description: "You'll hear from us with clear next steps — no jargon.",
  },
];

export function DeclinedDecision({ decision }: DeclinedDecisionProps) {
  return (
    <div className="space-y-8 pb-36">
      <section className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-coral/10 text-3xl text-coral">
          ○
        </div>
        <h1 className="mt-6 text-3xl font-medium text-cream">
          We&apos;re reviewing your application
        </h1>
        <p className="mx-auto mt-3 max-w-md text-cream-muted">
          Our team will take a closer look and get back to you. Reference{" "}
          <span className="font-medium text-cream">{decision.referenceId}</span>.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-medium text-cream">What happens next</h2>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex gap-4 rounded-[var(--radius-card)] border border-cream/10 bg-surface p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral/15 text-sm font-medium text-coral">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-cream">{step.title}</p>
                <p className="mt-1 text-sm text-cream-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[var(--radius-card)] border border-cream/10 bg-surface/60 p-6 text-center">
        <h2 className="text-lg font-medium text-cream">You can still browse cars</h2>
        <p className="mt-2 text-sm text-cream-muted">
          While we review your options, explore our AA-inspected stock — many customers find
          the right car before we call back.
        </p>
        <Button size="lg" href="/cars" className="mt-5">
          Browse Available Cars
        </Button>
      </section>

      <section className="rounded-[var(--radius-card)] border border-cream/10 bg-surface p-6 text-center">
        <h2 className="text-lg font-medium text-cream">Need help?</h2>
        <p className="mt-2 text-sm text-cream-muted">Speak with our team — we&apos;re here to help.</p>
        <Button variant="secondary" size="lg" className="mt-5">
          Talk to an Expert
        </Button>
      </section>

      <DecisionTrustStrip />
      <DecisionSupportCard />
    </div>
  );
}
