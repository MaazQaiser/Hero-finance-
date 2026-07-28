"use client";

interface ApplyBrandBarProps {
  savedFlash: boolean;
}

export function ApplyBrandBar({ savedFlash }: ApplyBrandBarProps) {
  return (
    <div
      className="flex items-center justify-between px-5 py-4"
      style={{ paddingTop: "max(16px, env(safe-area-inset-top))" }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: "-0.02em",
          color: "var(--aink)",
        }}
      >
        Her<span style={{ color: "var(--agreen)" }}>o</span>
      </div>

      <div
        style={{
          fontSize: 12,
          color: "var(--aink-soft)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          opacity: savedFlash ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        aria-live="polite"
        aria-atomic
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--agreen)",
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        Progress saved
      </div>
    </div>
  );
}
