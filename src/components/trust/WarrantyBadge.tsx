"use client";

import { InformationTrigger } from "@/components/information/InformationTrigger";
import { vehicleTrustContent } from "@/config/vehicleTrustContent";

interface WarrantyBadgeProps {
  onClick?: () => void;
  className?: string;
}

export function WarrantyBadge({ onClick, className = "" }: WarrantyBadgeProps) {
  const { warranty } = vehicleTrustContent;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className="motion-trust-badge inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink shadow-sm transition-colors hover:border-green/30 hover:bg-green/5"
        >
          <span className="text-green-deep" aria-hidden>
            ✓
          </span>
          {warranty.label}
        </button>
      ) : (
        <span className="motion-trust-badge inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink">
          <span className="text-green-deep" aria-hidden>
            ✓
          </span>
          {warranty.label}
        </span>
      )}
      <InformationTrigger topic="warranty" />
    </div>
  );
}
