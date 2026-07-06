import Image from "next/image";
import Link from "next/link";

type CardIcon = "document" | "payment" | "car";

const cards: {
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  featured: boolean;
  icon: CardIcon;
}[] = [
  {
    label: "HP basics",
    title: "What is HP?",
    description:
      "Hire Purchase lets you spread the cost over fixed monthly payments. You own the car once all payments are made.",
    image: "/images/dealer/keys-handover.jpg",
    imageAlt: "Salesperson handing over car keys to a customer",
    featured: false,
    icon: "document",
  },
  {
    label: "Fixed payments",
    title: "Know your monthly cost",
    description:
      "Your rate and term are agreed upfront — clear monthly HP payments with no broker surprises.",
    image: "/images/finance/fixed-payments.jpg",
    imageAlt: "Customer and dealer shaking hands after agreeing finance",
    featured: true,
    icon: "payment",
  },
  {
    label: "Own your car",
    title: "Yours at the end",
    description:
      "When the agreement ends, the car is yours. No balloon payment and no mileage limits.",
    image: "/images/finance/own-car.jpg",
    imageAlt: "Customer celebrating with keys on a used car forecourt",
    featured: false,
    icon: "car",
  },
];

function CardIconGlyph({ icon }: { icon: CardIcon }) {
  if (icon === "document") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M4 19V5a2 2 0 012-2h12a2 2 0 012 2v14" strokeLinecap="round" />
        <path d="M8 7h8M8 11h8M8 15h5" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "payment") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M5 17h14l-1-7H6l-1 7z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
      <path d="M3 17h18M5 10l2-4h10l2 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CardArrow() {
  return (
    <span
      aria-hidden
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-bright text-ink"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25">
        <path d="M7 17L17 7M17 7H9M17 7v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function FinanceCard({
  label,
  title,
  description,
  image,
  imageAlt,
  featured,
  icon,
}: (typeof cards)[number]) {
  return (
    <article
      className={`flex h-full flex-col rounded-[28px] p-6 md:p-7 ${
        featured
          ? "bg-green-deep text-white lg:-mt-4 lg:pb-10 lg:pt-9"
          : "bg-mist-2 text-ink"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex items-center gap-2 text-sm font-medium ${
            featured ? "text-white/70" : "text-muted"
          }`}
        >
          <span className={featured ? "text-green-bright" : "text-green-deep"}>
            <CardIconGlyph icon={icon} />
          </span>
          {label}
        </div>
        <CardArrow />
      </div>

      <h3
        className={`mt-5 font-display text-xl font-extrabold leading-snug tracking-tight md:text-[1.35rem] ${
          featured ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h3>

      <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-[20px]">
        <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>

      <p
        className={`mt-5 text-sm leading-relaxed md:text-[15px] ${
          featured ? "text-white/75" : "text-muted"
        }`}
      >
        {description}
      </p>
    </article>
  );
}

export function FinanceExplainedV2() {
  return (
    <section id="finance-explained" className="bg-paper py-16 md:py-20 lg:py-24">
      <div className="w-full px-5">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 h-px w-10 bg-green-bright" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            Finance explained
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Hire Purchase, made simple
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            A straightforward way to finance your car. No jargon, no hidden broker fees — just clear
            monthly payments and AA-inspected stock from one team.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:mt-14 md:grid-cols-3 md:items-end lg:mt-16 lg:gap-6">
          {cards.map((card) => (
            <div key={card.title} className="min-w-0">
              <FinanceCard {...card} />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 flex flex-col items-center gap-4 md:mt-12">
          <Link
            href="/apply"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-8 text-base font-bold text-white transition-colors hover:bg-ink/90"
          >
            Check eligibility
          </Link>
          <p className="max-w-2xl text-center text-xs leading-relaxed text-muted">
            Representative example: Borrowing £10,000 over 48 months at 9.9% APR would cost £251.32
            per month. Total repayable £12,063.36. Subject to status. 18+ UK residents only.
          </p>
        </div>
      </div>
    </section>
  );
}
