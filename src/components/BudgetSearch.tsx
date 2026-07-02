import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function BudgetSearch() {
  return (
    <section id="budget-search" className="section-padding bg-gradient-to-b from-paper to-mist-2">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <div>
              <SectionHeading
                eyebrow="Search by budget"
                title="See what you can afford"
                description="Set your monthly budget, deposit, and term. We'll show cars that fit — before you apply."
              />
              <ul className="mt-10 space-y-4">
                {[
                  "Finance-first search — monthly payments upfront",
                  "Filter stock to your real budget",
                  "No application needed to explore",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base font-semibold text-ink">
                    <span
                      aria-hidden
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/15 text-sm font-bold text-green-deep"
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="card-elevated relative overflow-hidden border-2 border-green/15 p-8 md:p-10">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green/60 via-green to-green/60" />

              <p className="eyebrow">Affordability calculator</p>
              <p className="headline-md mt-3">What&apos;s your monthly budget?</p>

              <div className="mt-8 space-y-5">
                <div>
                  <label htmlFor="monthly-budget" className="mb-2 block text-sm font-semibold text-ink">
                    Monthly budget
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">£</span>
                    <input
                      id="monthly-budget"
                      type="text"
                      defaultValue="250"
                      readOnly
                      className="min-h-14 w-full rounded-[14px] border border-line bg-paper pl-8 pr-4 text-2xl font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-green/30"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="deposit" className="mb-2 block text-sm font-semibold text-ink">
                      Deposit
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">£</span>
                      <input
                        id="deposit"
                        type="text"
                        defaultValue="0"
                        readOnly
                        className="min-h-12 w-full rounded-[14px] border border-line bg-paper pl-8 pr-4 text-lg font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-green/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="term" className="mb-2 block text-sm font-semibold text-ink">
                      Term
                    </label>
                    <select
                      id="term"
                      defaultValue="48"
                      className="min-h-12 w-full appearance-none rounded-[14px] border border-line bg-paper px-4 text-lg font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-green/30"
                    >
                      <option value="36">36 months</option>
                      <option value="48">48 months</option>
                      <option value="60">60 months</option>
                    </select>
                  </div>
                </div>
              </div>

              <Link href="/cars" className="btn-lime mt-8 flex w-full justify-center">
                See Cars I Can Afford
              </Link>

              <p className="mt-4 text-center text-xs text-muted">
                Representative example shown. Subject to status and affordability checks.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
