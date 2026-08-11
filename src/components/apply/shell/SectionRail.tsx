"use client";

import { useEffect, useRef } from "react";
import { SECTIONS } from "@/lib/apply/sections";

interface SectionRailProps {
  sectionIndex: number;
  segmentPct: number;
  sectionName?: string;
  timeRemainingLabel?: string;
  loadingMode?: boolean;
  /** Compact sticky treatment for mobile apply shell */
  sticky?: boolean;
}

/**
 * Single journey progress rail used across the apply experience.
 * Shows current section name, segmented fill, and time remaining —
 * never "Step X of Y".
 */
export function SectionRail({
  sectionIndex,
  segmentPct,
  sectionName,
  timeRemainingLabel,
  loadingMode = false,
  sticky = false,
}: SectionRailProps) {
  const segRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const activeName = loadingMode
    ? "Decision"
    : (sectionName ?? SECTIONS[sectionIndex]?.name ?? "");

  useEffect(() => {
    segRefs.current.forEach((seg, i) => {
      if (!seg) return;
      if (loadingMode || i < sectionIndex) {
        seg.style.width = "100%";
      } else if (i === sectionIndex) {
        seg.style.width = `${Math.max(segmentPct, 8)}%`;
      } else {
        seg.style.width = "0%";
      }
    });
  }, [sectionIndex, segmentPct, loadingMode]);

  return (
    <div
      className={sticky ? "border-b border-[var(--aline)]/70 bg-white/95 backdrop-blur-md" : undefined}
      style={{ padding: sticky ? "0 20px 12px" : "0 20px 16px" }}
    >
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <span
          className="truncate"
          style={{
            fontWeight: 600,
            fontSize: sticky ? 14 : 15,
            letterSpacing: "-0.01em",
            color: "var(--aink)",
          }}
        >
          {activeName}
        </span>
        <span
          className="shrink-0"
          style={{
            fontSize: 12,
            color: "var(--aink-soft)",
            fontVariantNumeric: "tabular-nums",
          }}
          aria-live="polite"
        >
          {loadingMode ? "Almost done" : (timeRemainingLabel ?? "")}
        </span>
      </div>

      <div
        className="flex gap-[5px]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={
          loadingMode
            ? 100
            : Math.round(
                ((sectionIndex + segmentPct / 100) / Math.max(SECTIONS.length, 1)) * 100,
              )
        }
        aria-label={`${activeName}. ${loadingMode ? "Almost done" : timeRemainingLabel ?? ""}`}
      >
        {SECTIONS.map((section, i) => {
          const isComplete = loadingMode || i < sectionIndex;
          const isActive = !loadingMode && i === sectionIndex;
          const isFuture = !loadingMode && i > sectionIndex;

          return (
            <div
              key={section.name}
              title={section.name}
              style={{
                flex: 1,
                height: sticky ? 4 : 5,
                borderRadius: 99,
                background: "rgba(30,22,53,0.08)",
                overflow: "hidden",
                position: "relative",
                opacity: isFuture ? 0.55 : 1,
              }}
            >
              <span
                ref={(el) => {
                  segRefs.current[i] = el;
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "0%",
                  borderRadius: 99,
                  background: isActive
                    ? "linear-gradient(90deg, var(--agreen), var(--alime))"
                    : isComplete
                      ? "var(--agreen)"
                      : "var(--agreen)",
                  transition: "width 0.55s cubic-bezier(0.32,0.72,0,1)",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
