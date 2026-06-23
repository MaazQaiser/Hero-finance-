import { notFound } from "next/navigation";
import { ReserveError } from "@/components/reserve/ReserveError";
import { getVehicleById } from "@/data/vehicles";

interface ReserveErrorPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReserveErrorPage({ params }: ReserveErrorPageProps) {
  const { id } = await params;
  const vehicle = getVehicleById(id);

  if (!vehicle) notFound();

  return <ReserveError vehicleId={id} />;
}
