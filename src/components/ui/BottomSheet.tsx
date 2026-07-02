"use client";

import { type ReactNode, useEffect } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function BottomSheet({ open, onClose, title, children, footer }: BottomSheetProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-mist backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bottom-sheet-title"
        className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col rounded-t-[var(--radius-card)] border border-line bg-paper shadow-2xl md:rounded-[var(--radius-card)]"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="bottom-sheet-title" className="text-lg font-medium text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-green/40"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {footer && (
          <div className="border-t border-line bg-paper px-5 py-4">{footer}</div>
        )}
      </div>
    </div>
  );
}
