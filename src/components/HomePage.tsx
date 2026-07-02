"use client";

import { DesignVariationSwitcher } from "@/components/DesignVariationSwitcher";
import { useDesignVariation } from "@/components/DesignVariationProvider";
import { HomeV1 } from "@/components/home/HomeV1";
import { HomeV2 } from "@/components/home/HomeV2";

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
