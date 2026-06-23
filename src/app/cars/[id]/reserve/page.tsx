import { notFound } from "next/navigation";
import { ReserveConfirmation } from "@/components/reserve/ReserveConfirmation";
import { getVehicleById } from "@/data/vehicles";

interface ReservePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ReservePageProps) {
  const { id } = await params;
  const vehicle = getVehicleById(id);

  return {
    title: vehicle
      ? `Reserve ${vehicle.make} ${vehicle.model} | Hero Car Finance`
      : "Reserve Vehicle | Hero Car Finance",
  };
}

export default async function ReservePage({ params }: ReservePageProps) {
  const { id } = await params;
  const vehicle = getVehicleById(id);

  if (!vehicle) notFound();

  return <ReserveConfirmation vehicle={vehicle} />;
}
