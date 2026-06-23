import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function BudgetSearch() {
  return (
    <section id="budget-search" className="section-padding bg-surface/30">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Search by budget"
              title="See what you can afford"
              description="Set your monthly budget, deposit, and term. We'll show cars that fit — before you apply."
            />
            <ul className="mt-8 space-y-3">
              {[
                "Finance-first search — monthly payments upfront",
                "Filter stock to your real budget",
                "No application needed to explore",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-cream-muted">
                  <span aria-hidden className="text-coral">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Card
            variant="light"
            className="relative overflow-hidden border-2 border-coral/20 shadow-2xl shadow-black/20"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-coral/60 via-coral to-coral/60" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
              Affordability calculator
            </p>
            <p className="mt-2 text-2xl font-medium text-charcoal">What&apos;s your monthly budget?</p>

            <div className="mt-8 space-y-5">
              <div>
                <label htmlFor="monthly-budget" className="mb-2 block text-sm font-medium text-charcoal">
                  Monthly budget
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50">£</span>
                  <input
                    id="monthly-budget"
                    type="text"
                    defaultValue="250"
                    readOnly
                    className="min-h-14 w-full rounded-2xl border border-charcoal/10 bg-white pl-8 pr-4 text-2xl font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/30"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="deposit" className="mb-2 block text-sm font-medium text-charcoal">
                    Deposit
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50">£</span>
                    <input
                      id="deposit"
                      type="text"
                      defaultValue="0"
                      readOnly
                      className="min-h-12 w-full rounded-2xl border border-charcoal/10 bg-white pl-8 pr-4 text-lg font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/30"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="term" className="mb-2 block text-sm font-medium text-charcoal">
                    Term
                  </label>
                  <select
                    id="term"
                    defaultValue="48"
                    className="min-h-12 w-full appearance-none rounded-2xl border border-charcoal/10 bg-white px-4 text-lg font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/30"
                  >
                    <option value="36">36 months</option>
                    <option value="48">48 months</option>
                    <option value="60">60 months</option>
                  </select>
                </div>
              </div>
            </div>

            <Button fullWidth size="lg" href="/cars" className="mt-8">
              See Cars I Can Afford
            </Button>

            <p className="mt-4 text-center text-xs text-charcoal/50">
              Representative example shown. Subject to status and affordability checks.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
