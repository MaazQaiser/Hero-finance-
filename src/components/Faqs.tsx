import { SectionHeading } from "@/components/ui/SectionHeading";

const faqs = [
  {
    question: "Can I get car finance with bad credit?",
    answer:
      "We work with a panel of lenders who consider a range of credit profiles. Our soft search lets you check eligibility without affecting your credit score, so you can see your options before committing.",
  },
  {
    question: "Do you offer no deposit finance?",
    answer:
      "Yes, in many cases we can offer finance with little or no deposit. Your eligibility and terms depend on your individual circumstances and the vehicle you choose.",
  },
  {
    question: "What is a soft search?",
    answer:
      "A soft search is a preliminary credit check that doesn't leave a visible mark on your credit file. It helps us understand which finance options may be available to you before a full application.",
  },
  {
    question: "Can self-employed people apply?",
    answer:
      "Absolutely. We accept applications from self-employed individuals. You may need to provide additional documentation such as bank statements or accounts to verify your income.",
  },
  {
    question: "Can I get finance with a CCJ?",
    answer:
      "A CCJ doesn't automatically rule you out. We assess each application individually and work with specialist lenders who may be able to help depending on your circumstances.",
  },
];

export function Faqs() {
  return (
    <section id="faqs" className="section-padding bg-surface/30">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQs"
          title="Common questions"
          description="Everything you need to know before you start your application."
          align="center"
        />

        <div className="mt-14 divide-y divide-cream/10 overflow-hidden rounded-[var(--radius-card)] border border-cream/10 bg-surface">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex min-h-[4.25rem] cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left text-base font-medium text-cream transition-colors hover:bg-cream/[0.03] md:px-8 md:py-6 md:text-lg [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/15 bg-charcoal/60 text-xl text-coral transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="border-t border-cream/10 bg-charcoal/30 px-6 pb-6 pt-5 md:px-8 md:pb-7">
                <p className="text-base leading-relaxed text-cream-muted">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
