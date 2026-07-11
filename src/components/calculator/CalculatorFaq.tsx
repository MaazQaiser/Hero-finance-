"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const faqs = [
  {
    question: "How much can I borrow?",
    answer:
      "It depends on your income, credit profile, and affordability. Our calculator gives an estimate based on representative APR — a soft search will show your actual options without affecting your credit score.",
  },
  {
    question: "Will this affect my credit score?",
    answer:
      "No. Using this calculator won't affect your credit score. When you apply, we use a soft search first — it won't leave a visible mark on your credit file.",
  },
  {
    question: "Can I get finance with bad credit?",
    answer:
      "Many customers with imperfect credit are approved through our lender panel. We consider your full circumstances, not just a score. Check your eligibility with a soft search to see your options.",
  },
  {
    question: "What deposit do I need?",
    answer:
      "Deposits vary by lender and vehicle. Some customers qualify with little or no deposit. Use our Maximum Deposit mode to see what you'd need for a specific car at your monthly budget.",
  },
  {
    question: "What's the difference between HP and PCP?",
    answer:
      "Hire Purchase (HP) spreads the full cost into fixed monthly payments — you own the car at the end. PCP typically has lower monthly payments with a balloon payment if you want to keep the car. Hero primarily offers HP with clear, fixed payments.",
  },
];

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden
    >
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export function CalculatorFaq() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="calculator-faqs" className="section-padding bg-paper">
      <div className="container-site max-w-4xl">
        <ScrollReveal>
          <p className="text-xl text-ink">Calculator questions</p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="mt-8 border-y border-line">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="group border-b border-line bg-paper transition-colors duration-300 last:border-b-0 hover:bg-green-bright"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-4 py-6 text-left transition-all duration-300 group-hover:px-8 md:py-7 md:group-hover:px-10"
                  >
                    <span className="font-display text-lg font-extrabold tracking-tight text-ink md:text-xl">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen ? "bg-ink text-white" : "bg-mist text-ink"
                      }`}
                      aria-hidden
                    >
                      <PlusIcon className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-6 text-base leading-relaxed text-ink/75 md:pb-7 md:text-[17px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
