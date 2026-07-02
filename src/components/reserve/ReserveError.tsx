import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ReserveErrorProps {
  vehicleId: string;
}

export function ReserveError({ vehicleId }: ReserveErrorProps) {
  return (
    <div className="flex min-h-[100svh] flex-col">
      <header className="border-b border-line px-5 py-4">
        <div className="mx-auto max-w-lg">
          <Link
            href={`/cars/${vehicleId}/reserve`}
            className="text-sm text-muted hover:text-ink"
          >
            ← Back
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-lg flex-1 flex-col justify-center px-5 py-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green/10 text-3xl text-green-deep">
          !
        </div>
        <h1 className="mt-6 text-2xl font-medium text-ink">Payment unsuccessful</h1>
        <p className="mt-3 text-muted">
          Your card wasn&apos;t charged. You can try again or contact our team for help.
        </p>

        <div className="mt-8 space-y-3">
          <Button fullWidth size="lg" href={`/cars/${vehicleId}/reserve/payment`}>
            Try Again
          </Button>
          <Button fullWidth size="lg" variant="secondary">
            Contact Support
          </Button>
        </div>
      </main>
    </div>
  );
}
