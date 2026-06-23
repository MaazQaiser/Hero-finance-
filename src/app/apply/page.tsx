import { ApplyFlow } from "@/components/apply/ApplyFlow";

export const metadata = {
  title: "Apply for Finance | Hero Car Finance",
  description:
    "Check your eligibility for car finance with a soft search. Simple guided application in minutes.",
};

interface ApplyPageProps {
  searchParams: Promise<{
    vehicle?: string;
    resume?: string;
    session?: string;
    simulate?: string;
  }>;
}

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  const { vehicle, resume, session, simulate } = await searchParams;

  return (
    <ApplyFlow
      vehicleId={vehicle}
      resume={resume === "true"}
      sessionExpired={session === "expired"}
      simulateNetworkError={simulate === "network-error"}
    />
  );
}
