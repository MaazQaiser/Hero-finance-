import { notFound } from "next/navigation";
import { ReserveSuccess } from "@/components/reserve/ReserveSuccess";
import { getVehicleById } from "@/data/vehicles";

interface ReserveSuccessPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReserveSuccessPage({ params }: ReserveSuccessPageProps) {
  const { id } = await params;
  const vehicle = getVehicleById(id);

  if (!vehicle) notFound();

  return <ReserveSuccess vehicleId={id} />;
}
