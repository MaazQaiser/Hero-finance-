import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const points = [
  {
    number: "01",
    title: "What is HP?",
    description:
      "Hire Purchase (HP) lets you spread the cost of a car over fixed monthly payments. You own the vehicle once all payments are made.",
    image: "/images/stock/used-car-1.jpg",
    imageAlt: "Used car available on Hire Purchase",
    imageBottom: true,
    stagger: "lg:mt-0",
  },
  {
    number: "02",
    title: "Fixed payments",
    description:
      "Know exactly what you'll pay each month. Your rate and term are agreed upfront — no surprises.",
    image: "/images/finance/fixed-payments.jpg",
    imageAlt: "Customer and dealer agreeing finance in the showroom",
    imageBottom: false,
    stagger: "lg:mt-14",
  },
  {
    number: "03",
    title: "Own your car",
    description:
      "At the end of your agreement, the car is yours. No balloon payment, no mileage limits.",
    image: "/images/dealer/customer-keys.jpg",
    imageAlt: "Customer collecting keys to their used car",
    imageBottom: true,
    stagger: "lg:mt-28",
  },
];

function FinanceCard({
  number,
  title,
  description,
  image,
  imageAlt,
  imageBottom,
  stagger,
}: (typeof points)[number]) {
  const imageBlock = (
    <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-2xl border border-green/10">
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 300px, 320px"
      />
    </div>
  );

  return (
    <article
      className={`flex h-full w-[280px] shrink-0 flex-col rounded-[24px] border border-green/10 bg-mist p-6 sm:w-[300px] lg:w-auto lg:min-w-0 lg:flex-1 ${stagger}`}
    >
      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl font-extrabold leading-none text-green/30">{number}</span>
        <h3 className="font-display text-xl font-extrabold text-ink">{title}</h3>
      </div>

      {imageBottom ? (
        <>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{description}</p>
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{description}</p>
        </>
      )}
    </article>
  );
}

export function FinanceExplained() {
  return (
    <section id="finance-explained" className="section-padding bg-mist-2">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Finance explained"
            title="Hire Purchase, made simple"
            description="A straightforward way to finance your car. No jargon, no hidden fees."
            align="center"
          />
        </ScrollReveal>

        <div className="carousel-snap mt-14 flex items-start gap-5 lg:gap-6">
          {points.map((point, i) => (
            <ScrollReveal key={point.title} delay={i * 80} className="shrink-0 lg:min-w-0 lg:flex-1">
              <FinanceCard {...point} />
            </ScrollReveal>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-muted">
          Representative example: Borrowing £10,000 over 48 months at 9.9% APR would cost £251.32 per
          month. Total repayable £12,063.36. Subject to status. 18+ UK residents only.
        </p>
      </div>
    </section>
  );
}
