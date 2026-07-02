import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

const benefits = [
  {
    title: "Wider stock network",
    description: "Access vehicles beyond our current showroom — sourced to your spec.",
  },
  {
    title: "AA inspected vehicles",
    description: "Every car is independently checked before we present it to you.",
  },
  {
    title: "Finance and car, one team",
    description: "No broker runaround — HP finance and sourcing under one roof.",
  },
  {
    title: "Personal sourcing experts",
    description: "A dedicated specialist guides you from brief to keys in hand.",
  },
];

export function BuyToOrderBenefits() {
  return (
    <section className="section-padding bg-mist">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why Hero"
          title="Why use Hero for sourcing"
          description="A concierge experience backed by finance expertise and trusted inspections."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <Card key={benefit.title} variant="elevated">
              <h3 className="text-lg font-medium text-ink">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
