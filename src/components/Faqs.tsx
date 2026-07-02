"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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

export function Faqs() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="faqs" className="section-padding bg-paper">
      <div className="container-site max-w-4xl">
        <ScrollReveal>
          <p className="text-xl text-ink">Common questions</p>
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
                    <span className="font-display text-lg font-extrabold tracking-tight text-ink md:text-xl lg:text-[1.35rem]">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 md:h-11 md:w-11 ${
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
                      <p className="px-4 pb-6 text-base leading-relaxed text-ink/75 transition-all duration-300 group-hover:px-8 md:pb-7 md:text-[17px] md:group-hover:px-10">
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
