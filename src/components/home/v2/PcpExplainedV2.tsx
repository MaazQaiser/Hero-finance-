import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PcpExplainedV2() {
  return (
    <section id="pcp" className="bg-paper py-16 md:py-20 lg:py-24">
      <div className="w-full px-5">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <p className="text-2xl font-normal text-green-deep md:text-3xl">Finance options</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-[2.5rem]">
              Personal Contract Purchase
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              PCP keeps your monthly payments lower than Hire Purchase by holding back part of the
              car&apos;s value as an optional final payment at the end of the agreement. Terms run
              up to 5 years. When the agreement ends you choose: pay the final payment and keep the
              car, hand it back, or put any equity toward your next one. It suits drivers who want a
              lower monthly payment, or who like to change car every few years.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
