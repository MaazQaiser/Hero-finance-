import { notFound } from "next/navigation";
import { VehicleDetailPage } from "@/components/vehicle/VehicleDetailPage";
import { getVehicleById, vehicles } from "@/data/vehicles";

interface CarDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ flow?: string }>;
}

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ id: vehicle.id }));
}

export async function generateMetadata({ params }: CarDetailPageProps) {
  const { id } = await params;
  const vehicle = getVehicleById(id);

  if (!vehicle) {
    return { title: "Vehicle not found | Hero Car Finance" };
  }

  return {
    title: `${vehicle.make} ${vehicle.model} | Hero Car Finance`,
    description: `View this ${vehicle.year} ${vehicle.make} ${vehicle.model} with clear monthly HP payments from Hero Car Finance.`,
  };
}

export default async function CarDetailPage({
  params,
  searchParams,
}: CarDetailPageProps) {
  const { id } = await params;
  const { flow } = await searchParams;
  const vehicle = getVehicleById(id);

  if (!vehicle) notFound();

  return (
    <VehicleDetailPage
      vehicle={vehicle}
      fromFinanceFlow={flow === "finance"}
    />
  );
}
