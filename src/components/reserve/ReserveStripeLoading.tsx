"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DEPOSIT_AMOUNT,
  generatePaymentReference,
  generateReservationId,
  saveReservation,
} from "@/lib/reservation/storage";

interface ReserveStripeLoadingProps {
  vehicleId: string;
}

export function ReserveStripeLoading({ vehicleId }: ReserveStripeLoadingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const simulateFail = searchParams.get("simulate") === "fail";

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (simulateFail) {
        router.replace(`/cars/${vehicleId}/reserve/error`);
        return;
      }

      const result = {
        reservationId: generateReservationId(),
        paymentReference: generatePaymentReference(),
        vehicleId,
        depositAmount: DEPOSIT_AMOUNT,
        paidAt: new Date().toISOString(),
      };

      saveReservation(result);
      router.replace(`/cars/${vehicleId}/reserve/success`);
    }, 2800);

    return () => window.clearTimeout(timeout);
  }, [router, simulateFail, vehicleId]);

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-cream/10 border-t-coral" />
      </div>

      <h1 className="mt-8 text-xl font-medium text-cream">Secure payment powered by Stripe</h1>
      <p className="mt-3 max-w-sm text-sm text-cream-muted">
        Please don&apos;t close this window. You&apos;ll be redirected automatically.
      </p>

      <div className="mt-10 flex items-center gap-2 rounded-full border border-cream/10 bg-surface px-4 py-2 text-xs text-cream-muted">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 11V8a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        Encrypted · PCI compliant
      </div>
    </div>
  );
}
