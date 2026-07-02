import { HeroEligibilityCard } from "@/components/HeroEligibilityCard";

export function HeroV2FormPanel() {
  return (
    <div id="hero-eligibility" className="scroll-mt-28 w-full min-w-0">
      <div className="hero-v2-glass-card">
        <HeroEligibilityCard variant="v2" />
      </div>
    </div>
  );
}
