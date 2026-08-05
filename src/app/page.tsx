import { Suspense } from "react";
import { HomePage } from "@/components/HomePage";
import { LandingVariantProvider } from "@/components/landing/LandingVariantProvider";

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-[100svh] bg-paper" aria-busy="true" />}>
      <LandingVariantProvider>
        <HomePage />
      </LandingVariantProvider>
    </Suspense>
  );
}
