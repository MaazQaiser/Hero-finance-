"use client";

import { useEffect, useState } from "react";

interface SaveProgressModalProps {
  open: boolean;
  onContinueLater: () => void;
  onReturnToApplication: () => void;
}

/**
 * Lightweight save confirmation — bottom sheet, not a full-screen takeover.
 * Keeps completing the application as the primary path.
 */
export function SaveProgressModal({
  open,
  onContinueLater,
  onReturnToApplication,
}: SaveProgressModalProps) {
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setRendered(true);
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timer = window.setTimeout(() => setRendered(false), 220);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!rendered) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center"
      style={{
        background: visible ? "rgba(30,22,53,0.35)" : "rgba(30,22,53,0)",
        transition: "background 0.22s ease",
        backdropFilter: visible ? "blur(2px)" : "none",
      }}
      onClick={onReturnToApplication}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-progress-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          padding: "22px 20px calc(20px + env(safe-area-inset-bottom))",
          boxShadow: "0 -12px 40px rgba(30,22,53,0.14)",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.28s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        <div
          aria-hidden
          style={{
            width: 36,
            height: 4,
            borderRadius: 99,
            background: "var(--aline, #e8e0f5)",
            margin: "0 auto 18px",
          }}
        />

        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <span
            aria-hidden
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              flexShrink: 0,
              borderRadius: "50%",
              background: "rgba(91,43,212,0.12)",
              color: "var(--agreen, #5b2bd4)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <h2
              id="save-progress-title"
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--aink, #1e1635)",
              }}
            >
              Your progress has been saved
            </h2>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 13.5,
                lineHeight: 1.45,
                color: "var(--aink-soft, #6e6a7c)",
              }}
            >
              We&apos;ll text you a secure link so you can continue anytime.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="a-cta"
          onClick={onReturnToApplication}
          style={{ marginTop: 20 }}
        >
          Keep going
        </button>

        <button
          type="button"
          onClick={onContinueLater}
          style={{
            display: "block",
            width: "100%",
            marginTop: 12,
            padding: "10px 8px",
            border: "none",
            background: "transparent",
            fontFamily: "inherit",
            fontSize: 14,
            fontWeight: 500,
            color: "var(--aink-soft, #6e6a7c)",
            cursor: "pointer",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          I&apos;ll continue later
        </button>
      </div>
    </div>
  );
}
