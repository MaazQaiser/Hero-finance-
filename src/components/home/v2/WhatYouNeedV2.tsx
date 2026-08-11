import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function WhatYouNeedV2() {
  return (
    <section id="what-you-need" className="bg-mist-2 py-16 md:py-20 lg:py-24">
      <div className="w-full px-5">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-[2.5rem]">
              What you need to apply for car finance
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              The baseline is simple. You are at least 18, you hold a valid driving licence, and you
              have a regular monthly income. Provisional UK, EU, European and international licences
              are all accepted. The eligibility check runs a soft search, so you see what you can
              afford before anything touches your credit score. If you decide to go ahead, the
              lender may run a full check before you sign the finance agreement.
            </p>
            <Link
              href="/apply"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-paper px-8 text-base font-semibold text-ink transition-colors hover:border-green/30 hover:bg-mist"
            >
              Begin my application
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
