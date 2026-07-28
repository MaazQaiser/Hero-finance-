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

  const overallPct = loadingMode ? 97 : ((sectionIndex + segmentPct / 100) / 6) * 100;
  const carLeft = Math.min(overallPct, 97) + "%";

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

      <div className="relative pt-3.5">
        {/* Travelling car */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -1,
            left: carLeft,
            width: 26,
            transform: "translateX(-50%)",
            transition: "left 0.5s cubic-bezier(0.32,0.72,0,1)",
          }}
        >
          <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
            <path
              d="M2 9h22M4.5 9c0-3 2.2-5.5 5-5.5h4c1.6 0 3.1.7 4.1 1.9L19.4 7h2.1c1.4 0 2.5 1 2.5 2"
              stroke="var(--aink)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="8" cy="9.6" r="1.9" fill="var(--aink)" />
            <circle cx="18.5" cy="9.6" r="1.9" fill="var(--aink)" />
          </svg>
        </div>

        {/* 6 segments */}
        <div className="flex gap-[5px]">
          {SECTIONS.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 5,
                borderRadius: 99,
                background: "rgba(18,33,27,0.10)",
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
    </div>
  );
}
