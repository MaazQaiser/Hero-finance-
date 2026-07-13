"use client";

import { type ReactNode, useEffect, useState } from "react";

interface AnimatedPageProps {
  children: ReactNode;
  /** Remount key — typically step or phase id */
  pageKey: string;
  className?: string;
}

export function AnimatedPage({ children, pageKey, className = "" }: AnimatedPageProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const frame = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, [pageKey]);

  return (
    <div
      key={pageKey}
      className={`motion-page ${visible ? "motion-page-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
