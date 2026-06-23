import { HeroVideoBackground } from "@/components/HeroVideoBackground";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export function HeroWithVideo() {
  return (
    <div className="relative min-h-[100svh]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <HeroVideoBackground />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-charcoal/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent" />
      </div>

      <Header />
      <div className="relative z-10 mx-auto max-w-7xl">
        <Hero />
      </div>
    </div>
  );
}
