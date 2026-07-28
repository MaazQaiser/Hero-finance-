"use client";

import { useEffect, useRef, useState } from "react";
import { type SectionConfig } from "@/lib/apply/sections";

interface SectionArrivalProps {
  section: SectionConfig;
  sectionIndex: number;
  onDone: () => void;
}

export function SectionArrival({ section, sectionIndex, onDone }: SectionArrivalProps) {
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = () => {
    if (leaving) return;
    setLeaving(true);
    timerRef.current = setTimeout(() => onDone(), 300);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => dismiss(), 900);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onClick={dismiss}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "var(--aink)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 34px",
        animation: leaving
          ? "a-arriveout 0.3s cubic-bezier(0.32,0.72,0,1) forwards"
          : "a-arrivein 0.34s cubic-bezier(0.32,0.72,0,1) both",
        cursor: "default",
      }}
    >
      <p
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--alime)",
          marginBottom: 12,
        }}
      >
        Section {sectionIndex + 1} of 6
      </p>
      <h2
        style={{
          fontSize: 34,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          marginBottom: 12,
        }}
      >
        {section.title}
      </h2>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.65)",
        }}
      >
        {section.desc}
      </p>
    </div>
  );
}
