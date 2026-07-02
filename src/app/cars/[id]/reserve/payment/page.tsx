import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ReserveStripeLoading } from "@/components/reserve/ReserveStripeLoading";
import { getVehicleById } from "@/data/vehicles";

interface ReservePaymentPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReservePaymentPage({ params }: ReservePaymentPageProps) {
  const { id } = await params;
  const vehicle = getVehicleById(id);

  if (!vehicle) notFound();

  return (
    <Suspense fallback={<div className="min-h-[100svh] bg-paper" />}>
      <ReserveStripeLoading vehicleId={id} />
    </Suspense>
  );
}
