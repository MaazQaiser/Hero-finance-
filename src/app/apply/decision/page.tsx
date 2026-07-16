import { DecisionFlow } from "@/components/decision/DecisionFlow";
import { JourneyVariantProvider } from "@/components/apply/JourneyVariantProvider";

export const metadata = {
  title: "Finance Decision | Hero Car Finance",
  description: "Your finance application result from Hero Car Finance.",
};

interface DecisionPageProps {
  searchParams: Promise<{ state?: string }>;
}

export default async function DecisionPage({ searchParams }: DecisionPageProps) {
  const { state } = await searchParams;

  return (
    <JourneyVariantProvider>
      <DecisionFlow stateOverride={state} />
    </JourneyVariantProvider>
  );
}
