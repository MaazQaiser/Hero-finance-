"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ReserveStepList } from "@/components/reserve/ReserveShared";
import { getRelatedVehicles, getVehicleById, formatPrice } from "@/data/vehicles";
import { type ReservationResult, loadReservation } from "@/lib/reservation/storage";

interface ReserveSuccessProps {
  vehicleId: string;
}

const timeline = [
  { title: "Hero team contacts you", description: "Within 24 hours to confirm details" },
  { title: "Finalise finance", description: "Complete your HP agreement" },
  { title: "Arrange collection", description: "Pick up your car or arrange delivery" },
];

export function ReserveSuccess({ vehicleId }: ReserveSuccessProps) {
  const [reservation, setReservation] = useState<ReservationResult | null>(null);
  const vehicle = getVehicleById(vehicleId);
  const related = vehicle ? getRelatedVehicles(vehicle, 4) : [];

  useEffect(() => {
    setReservation(loadReservation());
  }, []);

  if (!vehicle) return null;

  return (
    <>
      <header className="border-b border-line px-5 py-4">
        <div className="mx-auto max-w-lg text-center">
          <Link href="/" className="text-sm text-muted hover:text-ink">
            Hero Car Finance
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-6 px-5 py-6 pb-12">
        <section className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-3xl text-success">
            ✓
          </div>
          <h1 className="mt-6 text-3xl font-medium text-ink">Your vehicle is reserved</h1>
          <p className="mt-3 text-muted">
            We&apos;ve received your deposit and secured your vehicle.
          </p>
        </section>

        <section className="rounded-[var(--radius-card)] border border-green/20 bg-gradient-to-br from-coral/10 via-surface to-surface p-6">
          <p className="text-xs tracking-wide text-muted">Reservation summary</p>
          <h2 className="mt-2 text-xl font-medium text-ink">
            {vehicle.make} {vehicle.model}
          </h2>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Deposit paid</span>
              <span className="font-medium text-ink">
                {formatPrice(reservation?.depositAmount ?? 99)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Payment reference</span>
              <span className="font-mono text-xs text-ink">
                {reservation?.paymentReference ?? "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Reservation ID</span>
              <span className="font-medium text-ink">
                {reservation?.reservationId ?? "—"}
              </span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-medium text-ink">What happens next</h2>
          <ReserveStepList steps={timeline} />
        </section>

        <section className="rounded-[var(--radius-card)] border border-line bg-paper p-5">
          <p className="font-medium text-ink">Need help?</p>
          <p className="mt-1 text-sm text-muted">Contact our team anytime.</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <Button variant="secondary" fullWidth>
              Call
            </Button>
            <Button variant="secondary" fullWidth>
              WhatsApp
            </Button>
            <Button variant="secondary" fullWidth>
              Email
            </Button>
          </div>
        </section>

        {related.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-medium text-ink">Browse similar cars</h2>
            <div className="carousel-snap -mx-5 px-5">
              {related.map((car) => (
                <article
                  key={car.id}
                  className="w-[72vw] shrink-0 snap-center sm:w-[240px]"
                >
                  <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={car.images[0]}
                        alt={`${car.make} ${car.model}`}
                        fill
                        className="object-cover"
                        sizes="240px"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-ink">
                        {car.make} {car.model}
                      </p>
                      <p className="text-sm text-green-deep">{formatPrice(car.monthlyHp)}/mo</p>
                      <Link href={`/cars/${car.id}`} className="mt-3 block">
                        <Button variant="secondary" fullWidth size="md">
                          View Car
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <Button fullWidth size="lg" href={`/cars/${vehicleId}`}>
          Back to vehicle
        </Button>
      </main>
    </>
  );
}
