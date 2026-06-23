import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[var(--radius-image)] border border-coral/20 bg-surface px-8 py-16 text-center md:px-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-coral/15 via-coral/5 to-transparent" />

          <div className="relative z-10">
            <p className="eyebrow mb-4 text-coral/80">Get started today</p>
            <h2 className="headline-lg mx-auto max-w-2xl text-cream">
              Check your eligibility in minutes
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-cream-muted">
              Soft search. No impact on your credit score.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" href="/apply" className="min-w-[220px] shadow-lg shadow-coral/20">
                Start Application
              </Button>
              <Button size="lg" variant="ghost" href="/cars" className="text-cream/80 hover:text-cream">
                Browse Cars
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream-muted">
              <span className="flex items-center gap-2">
                <span className="text-success">✓</span> FCA regulated
              </span>
              <span className="flex items-center gap-2">
                <span className="text-success">✓</span> Soft search only
              </span>
              <span className="flex items-center gap-2">
                <span className="text-success">✓</span> AA inspected stock
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
