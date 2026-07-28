"use client";

import { useState } from "react";

interface ChoiceOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function ChoiceOption({ label, selected, onClick }: ChoiceOptionProps) {
  const [pressing, setPressing] = useState(false);

  const handleClick = () => {
    if (navigator.vibrate) navigator.vibrate(12);
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onPointerDown={() => setPressing(true)}
      onPointerUp={() => setPressing(false)}
      onPointerLeave={() => setPressing(false)}
      className="a-choice-btn"
      style={{
        position: "relative",
        width: "100%",
        textAlign: "left",
        overflow: "hidden",
        fontFamily: "inherit",
        fontSize: 16.5,
        fontWeight: 500,
        color: "var(--aink)",
        background: "#fff",
        border: `1.5px solid ${selected ? "var(--agreen)" : "var(--aline)"}`,
        borderRadius: "var(--aradius)",
        padding: "17px 18px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        transition: "border-color 0.15s, transform 0.12s, box-shadow 0.15s",
        transform: pressing ? "scale(0.985)" : "none",
        boxShadow: selected
          ? "none"
          : "0 2px 6px rgba(18,33,27,0.04)",
      }}
    >
      {/* Green wash fill sweep */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--agreen-wash)",
          transformOrigin: "left",
          transform: selected ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.28s cubic-bezier(0.32,0.72,0,1)",
          zIndex: 0,
        }}
      />

      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>

      {/* Tick circle */}
      <span
        aria-hidden
        style={{
          width: 20,
          height: 20,
          flexShrink: 0,
          borderRadius: "50%",
          border: `1.5px solid ${selected ? "var(--agreen)" : "var(--aline-strong)"}`,
          background: selected ? "var(--agreen)" : "transparent",
          display: "grid",
          placeItems: "center",
          transition: "background 0.2s, border-color 0.2s, transform 0.2s",
          transform: selected ? "scale(1.08)" : "none",
          zIndex: 1,
          position: "relative",
        }}
      >
        {selected && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path
              d="M1 3.5l2.5 2.5 4.5-5"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
