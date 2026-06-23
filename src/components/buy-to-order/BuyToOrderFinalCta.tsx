import { Button } from "@/components/ui/Button";

export function BuyToOrderFinalCta() {
  return (
    <section className="section-padding pb-32 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[var(--radius-image)] border border-cream/10 bg-surface px-8 py-16 text-center md:px-16">
          <div className="absolute inset-0 bg-gradient-to-br from-coral/10 via-transparent to-transparent" />
          <div className="relative z-10">
            <h2 className="text-2xl font-medium text-cream md:text-3xl">
              Looking for something specific?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-cream-muted">
              Let our team source it for you — premium vehicles, AA inspected, with finance
              arranged in one place.
            </p>
            <Button size="lg" href="#request-form" className="mt-8">
              Start Your Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
