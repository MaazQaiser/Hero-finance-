"use client";

import { useEffect, useState } from "react";

interface BackNavigationNoticeProps {
  message: string;
  className?: string;
}

export function BackNavigationNotice({ message, className = "" }: BackNavigationNoticeProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const frame = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, [message]);

  return (
    <p
      className={`text-center text-xs leading-relaxed text-muted transition-opacity duration-[250ms] ease-out motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </p>
  );
}
