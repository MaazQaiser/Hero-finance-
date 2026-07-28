"use client";

import { useEffect, useRef } from "react";
import { SECTIONS } from "@/lib/apply/sections";

interface SectionRailProps {
  sectionIndex: number;
  segmentPct: number; // 0-100 fill within current segment
  loadingMode?: boolean; // show "Checking your options" with all segments full
}

export function SectionRail({ sectionIndex, segmentPct, loadingMode = false }: SectionRailProps) {
  const segRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    segRefs.current.forEach((seg, i) => {
      if (!seg) return;
      if (loadingMode) {
        seg.style.width = "100%";
      } else if (i < sectionIndex) {
        seg.style.width = "100%";
      } else if (i === sectionIndex) {
        seg.style.width = Math.max(segmentPct, 6) + "%";
      } else {
        seg.style.width = "0%";
      }
    });
  }, [sectionIndex, segmentPct, loadingMode]);

  return (
    <div className="px-5 pb-4">
      <div className="mb-3 flex items-baseline justify-between">
        <span
          style={{
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: "-0.01em",
            color: "var(--aink)",
          }}
        >
          {loadingMode ? "Checking your options" : (SECTIONS[sectionIndex]?.name ?? "")}
        </span>
        {!loadingMode && (
          <span
            style={{
              fontSize: 12,
              color: "var(--aink-soft)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            Section {sectionIndex + 1} of 6
          </span>
        )}
      </div>

      <div className="flex gap-[5px]">
        {SECTIONS.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 5,
              borderRadius: 99,
              background: "rgba(30,22,53,0.08)",
              overflow: "hidden",
              position: "relative",
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
                background:
                  i === sectionIndex
                    ? "linear-gradient(90deg, var(--agreen), var(--alime))"
                    : "var(--agreen)",
                transition: "width 0.5s cubic-bezier(0.32,0.72,0,1)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
