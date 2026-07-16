"use client";

import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BottomSheetProps {
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
  labelledBy?: string;
}

const EXIT_MS = 260;

export function BottomSheet({ open, children, onClose, labelledBy }: BottomSheetProps) {
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setRendered(true);
      document.body.style.overflow = "hidden";
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    setVisible(false);
    document.body.style.overflow = "";
    const timer = window.setTimeout(() => setRendered(false), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!mounted || !rendered) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90]">
      <div
        className={`motion-info-backdrop absolute inset-0 bg-ink/50 backdrop-blur-sm ${
          visible ? "motion-info-backdrop-visible" : ""
        }`}
        onClick={onClose}
        aria-hidden
      />

      <div className="pointer-events-none fixed inset-0 flex items-end justify-center md:items-stretch md:justify-end">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          className={`motion-info-panel pointer-events-auto flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[var(--radius-card)] border border-line bg-paper shadow-2xl md:h-full md:max-h-none md:max-w-md md:rounded-none md:border-l md:border-t-0 ${
            visible ? "motion-info-panel-visible" : ""
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
