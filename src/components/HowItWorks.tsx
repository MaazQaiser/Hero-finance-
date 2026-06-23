import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const steps = [
  {
    number: "1",
    title: "Check eligibility",
    description:
      "Tell us about your budget and circumstances. We run a soft search that won't affect your credit score.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 9h10M7 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Get approved",
    description:
      "Receive a quick decision from our finance team. Clear terms, no hidden broker fees.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Choose & reserve your car",
    description:
      "Browse our AA-inspected stock, see your monthly HP payment, and reserve online.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 16l2-6h12l2 6M6 16h12M8 10l1-3h6l1 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="17" r="1.5" fill="currentColor" />
        <circle cx="16" cy="17" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How it works"
          title="Three simple steps to your next car"
          description="A streamlined finance journey designed to get you approved and driving — without the broker runaround."
        />

        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-[16.666%] right-[16.666%] top-10 hidden h-px bg-gradient-to-r from-transparent via-coral/40 to-transparent md:block"
          />

          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-center md:items-stretch">
                {index < steps.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-10 hidden h-full w-px -translate-x-1/2 bg-cream/10 md:hidden"
                  />
                )}

                <div className="relative z-10 mb-6 flex flex-col items-center md:mb-8">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-coral/30 bg-charcoal text-3xl font-light text-coral shadow-lg shadow-coral/10">
                    {step.number}
                  </div>
                  <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-coral/10 text-coral">
                    {step.icon}
                  </div>
                </div>

                <Card className="flex flex-1 flex-col text-center md:text-left">
                  <h3 className="text-xl font-medium text-cream">{step.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-cream-muted">
                    {step.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
