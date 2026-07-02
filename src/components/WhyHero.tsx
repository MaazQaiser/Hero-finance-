import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const images = [
  { src: "/images/stock/used-car-1.jpg", alt: "AA-inspected used car from Hero stock" },
  { src: "/images/how-it-works/choose-your-car.jpg", alt: "Used cars on a dealership forecourt" },
  { src: "/images/dealer/customer-keys.jpg", alt: "Hero customer receiving keys to their car" },
];

const advantages = [
  {
    number: "01",
    title: "Stock you can reserve",
    description:
      "Unlike traditional brokers, Hero owns the vehicles. Browse AA-inspected cars, see your monthly HP payment, and reserve online — all in one place.",
  },
  {
    number: "02",
    title: "One team, one journey",
    description:
      "From soft-search eligibility to approval and handover, a single team handles everything. No back-and-forth between a broker and a dealer.",
  },
  {
    number: "03",
    title: "Soft search approval",
    description:
      "Check where you stand with a soft search that won't affect your credit score. Get a quick, clear decision with transparent terms and no hidden broker fees.",
  },
];

export function WhyHero() {
  return (
    <section id="why-hero" className="section-padding bg-paper">
      <div className="container-site">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16 xl:gap-20">
          <ScrollReveal>
            <div>
              <span className="inline-flex items-center rounded-full bg-mist px-4 py-2 text-[13px] font-bold text-muted">
                Why Hero
              </span>

              <div className="mt-6 flex flex-col gap-3">
                {images.map((image) => (
                  <div
                    key={image.src}
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px]"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 360px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div>
              <h2 className="font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.5rem] lg:text-[2.75rem] xl:text-[3rem]">
                We pride ourselves on offering a unique and stress-free car finance experience
              </h2>

              <div className="mt-12 divide-y divide-line lg:mt-14">
                {advantages.map((item) => (
                  <article key={item.number} className="py-8 first:pt-0 last:pb-0">
                    <h3 className="font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl">
                      <span className="mr-3 text-muted/50">{item.number}</span>
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted md:text-[17px]">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
