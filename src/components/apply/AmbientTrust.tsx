"use client";

import { useEffect, useState } from "react";
import {
  getAmbientTrustMessage,
  type AmbientTrustKey,
  type AmbientTrustMessage,
} from "@/lib/apply/ambientTrustMessages";

interface AmbientTrustProps {
  /** Config key — resolves copy from ambientTrustMessages */
  messageKey: AmbientTrustKey;
  /** Optional override when message is already resolved */
  message?: AmbientTrustMessage;
  className?: string;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      aria-hidden
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function AmbientTrust({ messageKey, message, className = "" }: AmbientTrustProps) {
  const content = message ?? getAmbientTrustMessage(messageKey);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const frame = window.requestAnimationFrame(() => {
      setVisible(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messageKey, content.title, content.description]);

  return (
    <div
      className={`border-t border-line/80 pt-3 transition-opacity duration-300 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
      aria-live="polite"
    >
      <div className="flex items-start justify-center gap-2 text-center">
        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-green-deep">
          <CheckIcon className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-medium leading-snug text-ink/80">{content.title}</p>
          {content.description ? (
            <p className="mt-0.5 text-xs leading-snug text-muted">{content.description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
