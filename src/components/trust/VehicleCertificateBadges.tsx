import Image from "next/image";
import { type Vehicle } from "@/data/vehicles";

interface VehicleCertificateBadgesProps {
  vehicle: Pick<Vehicle, "aaPass" | "batteryHealth" | "fuel">;
  /** Overlay on photo vs inline under title */
  variant?: "overlay" | "inline";
  /** Homepage trust claim; certificate pages may keep product wording */
  aaLabel?: string;
  className?: string;
}

function AvilooMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path d="M4 20L12 4l8 16H4z" fill="#1B4F9C" />
      <path d="M8.5 20L12 10.5 15.5 20H8.5z" fill="#3A7BD5" />
      <path d="M11 20l1-4 1 4h-2z" fill="#6BA3E8" />
    </svg>
  );
}

/**
 * AA Pass + Aviloo battery certificates — shown next to every car.
 * Aviloo only appears for EV / hybrid stock.
 */
export function VehicleCertificateBadges({
  vehicle,
  variant = "overlay",
  aaLabel = "AA Pass",
  className = "",
}: VehicleCertificateBadgesProps) {
  const showAviloo = Boolean(vehicle.batteryHealth);
  const soh = vehicle.batteryHealth?.sohPercent;

  const isOverlay = variant === "overlay";

  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 ${
        isOverlay ? "pointer-events-none" : ""
      } ${className}`}
      aria-label="Vehicle certificates"
    >
      {vehicle.aaPass ? (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/95 font-semibold text-ink shadow-sm backdrop-blur-sm ${
            isOverlay ? "px-2 py-1 text-[11px]" : "px-2.5 py-1.5 text-xs"
          }`}
        >
          <Image
            src="/images/aa-approved-dealer.png"
            alt=""
            width={18}
            height={18}
            className="h-[18px] w-[18px] rounded-full object-cover object-center"
          />
          {aaLabel}
        </span>
      ) : null}

      {showAviloo ? (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-[#1B4F9C]/20 bg-white/95 font-semibold text-[#1B4F9C] shadow-sm backdrop-blur-sm ${
            isOverlay ? "px-2 py-1 text-[11px]" : "px-2.5 py-1.5 text-xs"
          }`}
        >
          <AvilooMark />
          Aviloo{soh != null ? ` ${soh.toFixed(1)}%` : ""}
        </span>
      ) : null}
    </div>
  );
}
