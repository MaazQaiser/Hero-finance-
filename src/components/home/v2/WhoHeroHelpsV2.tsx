import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function WhoHeroHelpsV2() {
  return (
    <section id="who-hero-helps" className="bg-mist-2 py-16 md:py-20 lg:py-24">
      <div className="w-full px-5">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-[2.5rem]">
              Who Hero helps with car finance
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              Hero is built for the situations other lenders decline. That includes bad credit,
              CCJs, IVAs, defaults and drivers refused elsewhere. It includes people without three
              years of UK address history, such as recent arrivals to the UK and returning expats.
              It includes drivers in negative equity on a current car, and the self-employed,
              students and provisional licence holders. The panel includes lenders who specialise in
              these circumstances, so a profile that gets an automatic no elsewhere gets a proper
              look here. The soft search shows where you stand with no impact on your credit score.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
