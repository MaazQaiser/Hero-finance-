"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ReserveDepositCard,
  ReserveStepList,
  ReserveTrustStrip,
} from "@/components/reserve/ReserveShared";
import { ReserveVehicleSummary } from "@/components/reserve/ReserveVehicleSummary";
import { type Vehicle, formatPrice } from "@/data/vehicles";
import { DEPOSIT_AMOUNT } from "@/lib/reservation/storage";

interface ReserveConfirmationProps {
  vehicle: Vehicle;
}

const nextSteps = [
  { title: "Pay £99 securely", description: "Quick checkout powered by Stripe" },
  { title: "We hold the vehicle", description: "The car is reserved for you" },
  { title: "Our team contacts you", description: "Usually within 24 hours" },
  { title: "Complete your finance journey", description: "Finalise HP and arrange collection" },
];

export function ReserveConfirmation({ vehicle }: ReserveConfirmationProps) {
  return (
    <>
      <header className="border-b border-line bg-paper/90 px-5 py-4 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link
            href={`/cars/${vehicle.id}`}
            className="flex min-h-11 items-center gap-2 text-sm font-medium text-ink hover:text-green-deep"
          >
            ← Back
          </Link>
          <p className="text-xs tracking-wide text-muted">Reservation</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-6 px-5 py-6 pb-36">
        <div>
          <p className="eyebrow">Secure your car</p>
          <h1 className="mt-2 text-2xl font-medium text-ink">Reserve this vehicle</h1>
          <p className="mt-2 text-sm text-muted">
            A quick, refundable deposit — no commitment beyond securing your car.
          </p>
        </div>

        <ReserveVehicleSummary vehicle={vehicle} />
        <ReserveDepositCard />

        <section>
          <h2 className="mb-4 text-lg font-medium text-ink">What happens next</h2>
          <ReserveStepList steps={nextSteps} />
        </section>

        <ReserveTrustStrip />
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-2xl">
        <div className="mx-auto max-w-lg px-5 py-4">
          <p className="mb-3 text-center text-xs text-muted">
            {formatPrice(DEPOSIT_AMOUNT)} refundable deposit · Secure payment
          </p>
          <Button fullWidth size="lg" href={`/cars/${vehicle.id}/reserve/payment`}>
            Pay {formatPrice(DEPOSIT_AMOUNT)} Deposit
          </Button>
        </div>
      </div>
    </>
  );
}
