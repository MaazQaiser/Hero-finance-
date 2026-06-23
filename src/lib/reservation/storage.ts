export interface ReservationResult {
  reservationId: string;
  paymentReference: string;
  vehicleId: string;
  depositAmount: number;
  paidAt: string;
}

const RESERVATION_KEY = "hero-reservation-result";

export function generateReservationId(): string {
  return `RES-${Date.now().toString(36).toUpperCase().slice(-8)}`;
}

export function generatePaymentReference(): string {
  return `pi_${Date.now().toString(36)}`;
}

export function saveReservation(result: ReservationResult): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(RESERVATION_KEY, JSON.stringify(result));
}

export function loadReservation(): ReservationResult | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(RESERVATION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ReservationResult;
  } catch {
    return null;
  }
}

export const DEPOSIT_AMOUNT = 99;
