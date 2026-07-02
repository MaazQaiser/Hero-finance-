import { DesignVariationProvider } from "@/components/DesignVariationProvider";
import { HomePage } from "@/components/HomePage";

export default function Home() {
  return (
    <DesignVariationProvider>
      <HomePage />
    </DesignVariationProvider>
  );
}
