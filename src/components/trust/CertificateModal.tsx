"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { AnimatedModal } from "@/components/motion/AnimatedModal";
import { type CertificateType, vehicleTrustContent } from "@/config/vehicleTrustContent";

interface CertificateModalProps {
  open: boolean;
  type: CertificateType;
  vehicleLabel?: string;
  registration?: string;
  /** Aviloo SOH % when type is battery */
  sohPercent?: number;
  /** Optional real certificate preview image */
  certificateImage?: string;
  onClose: () => void;
}

export function CertificateModal({
  open,
  type,
  vehicleLabel,
  registration,
  sohPercent,
  certificateImage,
  onClose,
}: CertificateModalProps) {
  const content = vehicleTrustContent.certificates[type];
  const titleId = `certificate-modal-${type}`;
  const isBattery = type === "battery";
  const soh = sohPercent ?? 94;

  return (
    <AnimatedModal open={open} onClose={onClose} labelledBy={titleId}>
      <div className="rounded-[var(--radius-card)] border border-line bg-paper p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted">{content.previewLabel}</p>
            <h2 id={titleId} className="mt-1 text-lg font-medium text-ink">
              {content.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="motion-button -mr-1 rounded-full p-2 text-muted hover:bg-mist hover:text-ink"
            aria-label="Close certificate preview"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-muted">{content.description}</p>

        {isBattery && certificateImage ? (
          <div className="certificate-preview-in motion-card mt-5 overflow-hidden rounded-2xl border border-line bg-mist-2">
            <div className="relative aspect-[3/4] w-full bg-white sm:aspect-[4/5]">
              <Image
                src={certificateImage}
                alt="Aviloo Independent Battery Certificate"
                fill
                className="object-contain object-top p-2"
                sizes="(max-width: 640px) 100vw, 420px"
              />
            </div>
          </div>
        ) : (
          <div
            className="certificate-preview-in motion-card mt-5 overflow-hidden rounded-2xl border border-line bg-mist-2"
            role="img"
            aria-label={`Placeholder preview of ${content.filename}`}
          >
            <div
              className={`border-b border-line px-4 py-3 ${
                isBattery ? "bg-[#1B4F9C] text-white" : "bg-paper"
              }`}
            >
              <p
                className={`text-xs font-semibold tracking-wide ${
                  isBattery ? "text-white/80" : "text-green-deep"
                }`}
              >
                {isBattery ? "AVILOO BATTERY DIAGNOSTICS" : "HERO CAR FINANCE"}
              </p>
              <p className={`mt-1 text-sm font-medium ${isBattery ? "text-white" : "text-ink"}`}>
                {content.title}
              </p>
            </div>
            <div className="space-y-3 p-4 text-sm text-muted">
              {vehicleLabel ? (
                <p>
                  Vehicle: <span className="font-medium text-ink">{vehicleLabel}</span>
                </p>
              ) : null}
              {registration ? (
                <p>
                  Registration: <span className="font-medium text-ink">{registration}</span>
                </p>
              ) : null}
              <p>
                Issued:{" "}
                {new Date().toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              {isBattery ? (
                <>
                  <p>
                    State of health:{" "}
                    <span className="font-semibold text-[#1B4F9C]">{soh.toFixed(1)}%</span>
                  </p>
                  <p className="font-medium text-green-deep">
                    Good health — no abnormalities detected
                  </p>
                </>
              ) : (
                <p>
                  Result:{" "}
                  <span className="font-medium text-green-deep">Passed — AA Pass certificate</span>
                </p>
              )}
              <div className="mt-4 rounded-xl border border-dashed border-line bg-paper/80 p-6 text-center">
                <p className="text-xs text-muted">Certificate preview</p>
                <p className="mt-1 font-mono text-xs text-ink">{content.filename}</p>
              </div>
            </div>
          </div>
        )}

        <p className="mt-4 text-center text-xs text-muted">
          {isBattery
            ? "Independent Aviloo certificate — full report available with the vehicle."
            : "AA Pass certificate — full document available at collection."}
        </p>

        <Button fullWidth size="lg" className="mt-5" onClick={onClose}>
          Close
        </Button>
      </div>
    </AnimatedModal>
  );
}
