"use client";

import dynamic from "next/dynamic";
import { DesignVariationSwitcher } from "@/components/DesignVariationSwitcher";
import { useDesignVariation } from "@/components/DesignVariationProvider";

const HomeV1 = dynamic(
  () => import("@/components/home/HomeV1").then((mod) => mod.HomeV1),
  { ssr: true },
);

const HomeV2 = dynamic(
  () => import("@/components/home/HomeV2").then((mod) => mod.HomeV2),
  { ssr: true },
);

export function HomePage() {
  const { variation, ready } = useDesignVariation();

  return (
    <>
      {variation === "v2" && ready ? (
        <HomeV2 key="home-v2" />
      ) : (
        <HomeV1 key="home-v1" />
      )}
      <DesignVariationSwitcher />
    </>
  );
}
