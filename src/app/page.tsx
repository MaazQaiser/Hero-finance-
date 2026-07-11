import { Suspense } from "react";
import { DesignVariationProvider } from "@/components/DesignVariationProvider";
import { HomePage } from "@/components/HomePage";
import { LandingVariantProvider } from "@/components/landing/LandingVariantProvider";

export default function Home() {
  return (
    <DesignVariationProvider>
      <Suspense fallback={<div className="min-h-[100svh] bg-paper" aria-busy="true" />}>
        <LandingVariantProvider>
          <HomePage />
        </LandingVariantProvider>
      </Suspense>
    </DesignVariationProvider>
  );
}
