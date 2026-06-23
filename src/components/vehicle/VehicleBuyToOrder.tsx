import { Button } from "@/components/ui/Button";

export function VehicleBuyToOrder() {
  return (
    <section className="px-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[var(--radius-card)] border border-cream/10 bg-surface/60 p-6 text-center md:p-8">
          <h2 className="text-xl font-medium text-cream">Looking for something else?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-cream-muted">
            We can source and finance the exact car you need — tell us your preferences and
            we&apos;ll do the rest.
          </p>
          <Button size="lg" href="/buy-to-order" className="mt-5">
            Tell us what you need
          </Button>
        </div>
      </div>
    </section>
  );
}
