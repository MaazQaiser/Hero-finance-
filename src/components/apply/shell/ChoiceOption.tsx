"use client";

import { useState, type ReactNode } from "react";

interface ChoiceOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  /** Outlined / secondary treatment for helper options */
  variant?: "default" | "outlined";
  icon?: ReactNode;
  helperText?: string;
}

export function ChoiceOption({
  label,
  selected,
  onClick,
  variant = "default",
  icon,
  helperText,
}: ChoiceOptionProps) {
  const [pressing, setPressing] = useState(false);
  const isOutlined = variant === "outlined";

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
        minHeight: 48,
        textAlign: "left",
        overflow: "hidden",
        fontFamily: "inherit",
        fontSize: 16.5,
        fontWeight: 500,
        color: "var(--aink)",
        background: selected
          ? "var(--agreen-wash)"
          : isOutlined
            ? "#ffffff"
            : "#f8f5ff",
        border: isOutlined
          ? `1.5px solid ${selected ? "var(--agreen)" : "var(--aline-strong)"}`
          : "1.5px solid transparent",
        borderRadius: "var(--aradius)",
        padding: helperText ? "15px 18px" : "17px 18px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        transition: "background 0.15s, transform 0.12s, border-color 0.15s",
        transform: pressing ? "scale(0.985)" : "none",
        boxShadow: "none",
      }}
    >
      {!isOutlined && (
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
      )}

      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          minWidth: 0,
          flex: 1,
        }}
      >
        {icon ? (
          <span
            aria-hidden
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              flexShrink: 0,
              marginTop: 1,
              borderRadius: "50%",
              background: selected ? "rgba(91,43,212,0.12)" : "var(--agreen-wash)",
              color: "var(--agreen)",
            }}
          >
            {icon}
          </span>
        ) : null}
        <span style={{ minWidth: 0 }}>
          <span style={{ display: "block", lineHeight: 1.35 }}>{label}</span>
          {helperText ? (
            <span
              style={{
                display: "block",
                marginTop: 4,
                fontSize: 13,
                fontWeight: 400,
                lineHeight: 1.4,
                color: "var(--aink-soft)",
              }}
            >
              {helperText}
            </span>
          ) : null}
        </span>
      </span>

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
