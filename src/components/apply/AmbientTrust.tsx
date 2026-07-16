"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  getTrustMessage,
  type TrustMessage,
  type TrustMessageKey,
} from "@/config/trustMessages";

interface AmbientTrustProps {
  /** Resolved trust copy — preferred usage */
  message?: TrustMessage | TrustMessage[];
  /** Config key — resolves copy from trustMessages */
  messageKey?: TrustMessageKey;
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

function TrustLine({ message, icon }: { message: TrustMessage; icon?: ReactNode }) {
  return (
    <div className="flex items-start justify-center gap-2 text-center">
      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-green-deep">
        {icon ?? <CheckIcon className="h-3.5 w-3.5" />}
      </span>
      <div className="min-w-0">
        {message.title ? (
          <p className="text-[13px] font-medium leading-snug text-ink/80">{message.title}</p>
        ) : null}
        <p
          className={`text-xs leading-snug text-muted ${message.title ? "mt-0.5" : "text-[13px] font-medium text-ink/80"}`}
        >
          {message.description}
        </p>
      </div>
    </div>
  );
}

export function AmbientTrust({ message, messageKey, className = "" }: AmbientTrustProps) {
  const content = message ?? (messageKey ? getTrustMessage(messageKey) : null);
  const [visible, setVisible] = useState(false);

  const contentKey = Array.isArray(content)
    ? content.map((item) => item.description).join("|")
    : content
      ? `${content.title ?? ""}|${content.description}`
      : "";

  useEffect(() => {
    setVisible(false);
    const frame = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, [messageKey, contentKey]);

  if (!content) return null;

  if (Array.isArray(content)) {
    return (
      <div
        className={`border-t border-line/80 pt-3 transition-opacity duration-[250ms] ease-out motion-reduce:transition-none ${
          visible ? "opacity-100" : "opacity-0"
        } ${className}`}
        aria-live="polite"
      >
        <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
          {content.map((item) => (
            <li key={item.description} className="flex items-center gap-1.5 text-left">
              <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center text-green-deep">
                <CheckIcon className="h-3 w-3" />
              </span>
              <span className="text-xs leading-snug text-muted">{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className={`border-t border-line/80 pt-3 transition-opacity duration-[250ms] ease-out motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
      aria-live="polite"
    >
      <TrustLine message={content} />
    </div>
  );
}
