import Image from "next/image";
import { HowItWorksStockImages } from "@/components/HowItWorksStockImages";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const stepTags = [
  { label: "Check", position: "left-4 top-4" },
  { label: "Approve", position: "right-6 top-1/2 -translate-y-1/2" },
  { label: "Reserve", position: "left-6 bottom-4" },
];

const customers = [
  { name: "Sarah M.", avatar: "/images/avatars/sarah.jpg" },
  { name: "James T.", avatar: "/images/avatars/james.jpg" },
  { name: "Priya K.", avatar: "/images/avatars/priya.jpg" },
  { name: "Emma L.", avatar: "/images/avatars/emma.jpg" },
  { name: "David R.", avatar: "/images/avatars/david.jpg" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-paper">
      <div className="container-site">
        <div className="grid gap-4 lg:gap-5">
          <ScrollReveal>
            <div className="grid overflow-hidden rounded-[28px] bg-green-bright lg:grid-cols-[1fr_auto] lg:items-stretch lg:gap-10">
              <div className="flex flex-col p-8 lg:p-10 lg:pr-4">
                <span className="inline-flex w-fit items-center rounded-full border border-white/80 bg-white px-4 py-2 text-[13px] font-bold text-ink shadow-[0_4px_16px_rgba(30,22,53,0.08)]">
                  How it works
                </span>
                <h2 className="cyclix-headline mt-6 max-w-[640px] text-ink">
                  Three simple steps to your next car — finance and stock under one roof
                </h2>
              </div>

              <HowItWorksStockImages />
            </div>
          </ScrollReveal>

          <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
            <ScrollReveal delay={100}>
              <div className="flex h-full flex-col overflow-hidden rounded-[28px] bg-ink p-8 lg:p-10">
                <p className="font-display text-2xl font-extrabold leading-snug tracking-tight text-white md:text-[1.75rem] lg:text-[2rem]">
                  Soft-search eligibility, fast approval, and AA-inspected stock — one seamless
                  journey from enquiry to reserved car.
                </p>

                <div className="relative mt-8 flex-1 overflow-hidden rounded-[20px]">
                  <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
                    <Image
                      src="/images/dealer/customer-keys.jpg"
                      alt="Hero customer receiving keys on the forecourt"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  {stepTags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`absolute ${tag.position} rounded-full bg-ink/90 px-4 py-2 text-sm font-bold text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur-sm`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="flex h-full flex-col justify-between overflow-hidden rounded-[28px] bg-green-bright p-8 lg:p-10">
                <div>
                  <h3 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
                    Ready to find out where you stand?
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-ink/75 md:text-lg">
                    Start with a soft search that won&apos;t affect your credit score — then browse
                    stock matched to your budget.
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2.5">
                      {customers.map((customer) => (
                        <span
                          key={customer.name}
                          className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-green-bright"
                        >
                          <Image
                            src={customer.avatar}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </span>
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-ink/80">
                      10,000+
                      <span className="block text-xs font-medium text-ink/60">drivers financed</span>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
