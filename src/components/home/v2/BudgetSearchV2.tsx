import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function BudgetSearchV2() {
  return (
    <section id="budget-search" className="relative overflow-hidden bg-mist-2">
      <div className="relative h-[clamp(260px,38vh,420px)] w-full">
        <Image
          src="/images/how-it-works/choose-your-car.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-mist-2" />
      </div>

      <div className="relative px-5 pb-16 pt-6 lg:pb-24 lg:pt-0">
        <div className="grid lg:grid-cols-2 lg:items-start lg:gap-10">
          <ScrollReveal>
            <div className="max-w-xl lg:pt-10 xl:pt-16">
              <p className="text-2xl font-normal text-green-deep md:text-3xl lg:text-4xl">
                Search by budget
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-[2.75rem]">
                See what you can afford
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
                Set your monthly budget, deposit, and term. We&apos;ll show AA-inspected cars that
                fit — before you apply. Finance-first search with real monthly payments upfront.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="relative mt-8 lg:-mt-[min(320px,34vh)]">
              <div className="rounded-[24px] bg-paper p-6 shadow-[0_24px_80px_rgba(30,22,53,0.12)] md:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="v2-monthly-budget" className="mb-2 block text-sm font-semibold text-ink">
                      Monthly budget
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">£</span>
                      <input
                        id="v2-monthly-budget"
                        type="text"
                        defaultValue="250"
                        readOnly
                        className="min-h-12 w-full rounded-xl border-0 bg-mist-2 px-4 pl-8 text-base font-semibold text-ink"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="v2-deposit" className="mb-2 block text-sm font-semibold text-ink">
                      Deposit
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">£</span>
                      <input
                        id="v2-deposit"
                        type="text"
                        defaultValue="0"
                        readOnly
                        className="min-h-12 w-full rounded-xl border-0 bg-mist-2 px-4 pl-8 text-base font-semibold text-ink"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="v2-term" className="mb-2 block text-sm font-semibold text-ink">
                      Term
                    </label>
                    <select
                      id="v2-term"
                      defaultValue="48"
                      className="min-h-12 w-full appearance-none rounded-xl border-0 bg-mist-2 px-4 text-base font-semibold text-ink"
                    >
                      <option value="36">36 months</option>
                      <option value="48">48 months</option>
                      <option value="60">60 months</option>
                    </select>
                  </div>
                </div>

                <Link
                  href="/cars"
                  className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-green px-8 text-base font-bold text-white transition-colors hover:bg-green-deep"
                >
                  See cars I can afford
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
