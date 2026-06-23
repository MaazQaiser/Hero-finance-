import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, sourcedExamples } from "@/data/sourcing";

export function BuyToOrderRecent() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Recently sourced"
          title="Cars we&apos;ve found for customers"
          description="Real examples from our sourcing team — inspected, financed, and delivered."
        />

        <div className="carousel-snap mt-10 -mx-5 px-5 md:-mx-8 md:px-8">
          {sourcedExamples.map((vehicle) => (
            <article
              key={vehicle.id}
              className="w-[85vw] shrink-0 snap-center sm:w-[300px]"
            >
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-cream/10 bg-surface shadow-lg shadow-black/10">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={vehicle.image}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge variant="success">Sourced</Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-cream">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="mt-1 text-xs text-cream-muted">{vehicle.sourcedFor}</p>
                  <div className="mt-3 flex items-baseline justify-between">
                    <p className="text-lg font-medium text-cream">{formatPrice(vehicle.price)}</p>
                    <p className="text-lg font-medium text-coral">
                      {formatPrice(vehicle.monthlyHp)}
                      <span className="text-sm font-normal text-cream-muted">/mo</span>
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
