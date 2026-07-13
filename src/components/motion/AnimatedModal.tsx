"use client";

import { type ReactNode, useEffect, useState } from "react";

interface AnimatedModalProps {
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
  labelledBy?: string;
}

const EXIT_MS = 240;

export function AnimatedModal({ open, children, onClose, labelledBy }: AnimatedModalProps) {
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setRendered(true);
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    setVisible(false);
    const timer = window.setTimeout(() => setRendered(false), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!rendered) return null;

  return (
    <div
      className={`motion-modal-backdrop fixed inset-0 z-[80] flex items-end justify-center bg-ink/50 p-5 backdrop-blur-sm md:items-center ${
        visible ? "motion-modal-backdrop-visible" : ""
      }`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`motion-modal-panel w-full max-w-md ${visible ? "motion-modal-panel-visible" : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
