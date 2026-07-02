import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/data/vehicles";

interface VehicleStickyCtaProps {
  monthlyPayment: number;
  vehicleId: string;
}

export function VehicleStickyCta({ monthlyPayment, vehicleId }: VehicleStickyCtaProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-8 lg:px-12">
        <div className="mb-3 flex items-center justify-between md:hidden">
          <p className="text-xs text-muted">From</p>
          <p className="text-lg font-medium text-green-deep">
            {formatPrice(monthlyPayment)}
            <span className="text-sm font-normal text-muted">/mo</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" fullWidth size="lg" href={`/cars/${vehicleId}/reserve`}>
            Reserve (£99)
          </Button>
          <Button fullWidth size="lg" href={`/apply?vehicle=${vehicleId}`}>
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}
