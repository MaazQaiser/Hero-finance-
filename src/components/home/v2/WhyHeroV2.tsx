import Image from "next/image";
import Link from "next/link";
import { TrustpilotWidget } from "@/components/TrustpilotWidget";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function WhyHeroV2() {
  return (
    <section id="why-hero" className="bg-paper py-16 md:py-20 lg:py-24">
      <div className="w-full px-5">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-green-bright px-4 py-2 text-sm font-semibold text-ink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Serving UK drivers since 2010
          </span>

          <h2 className="mt-8 max-w-5xl font-display text-3xl font-normal leading-[1.4] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.45] xl:text-5xl">
            We are a finance-first dealer focused on creating a stress-free path to your next car.
            Our work supports soft-search eligibility, owned stock, and one team from approval to
            keys.
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-12 lg:gap-6">
          <ScrollReveal delay={80}>
            <div className="flex h-full min-h-[240px] flex-col justify-between rounded-[28px] bg-paper p-6 shadow-[0_8px_32px_rgba(11,41,32,0.06)] sm:min-h-[280px] md:min-h-[320px] md:p-8">
              <div>
                <p className="text-base font-semibold text-ink">Customer satisfaction</p>
                <div className="mt-4">
                  <TrustpilotWidget />
                </div>
              </div>

              <div>
                <p className="font-display text-6xl font-extrabold tracking-tight text-ink md:text-7xl">
                  4.8★
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Rated highly by thousands of UK drivers who chose Hero for finance and stock under
                  one roof.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <div className="relative flex h-full min-h-[240px] flex-col justify-end overflow-hidden rounded-[28px] p-6 sm:min-h-[280px] md:min-h-[320px] md:p-8">
              <Image
                src="/images/v2/hero-owner-car.jpg"
                alt="Hero customers on a dealership forecourt"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/35 to-ink/10"
              />

              <div className="relative z-10">
                <p className="font-display text-6xl font-extrabold tracking-tight text-white md:text-7xl">
                  10,000+
                </p>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/85">
                  Drivers financed through Hero — with AA-inspected stock and clear monthly HP
                  payments.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex h-full min-h-[240px] flex-col justify-between rounded-[28px] bg-gradient-to-br from-green to-green-deep p-6 sm:min-h-[280px] md:min-h-[320px] md:p-8">
              <div>
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-white">
                  What we do best
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/85">
                  Unlike traditional brokers, Hero owns the stock, runs soft-search eligibility, and
                  manages your journey from check to keys.
                </p>
              </div>

              <Link
                href="/apply"
                className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-6 text-base font-bold text-green-deep transition-colors hover:bg-white/90"
              >
                Check eligibility
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
