"use client";

import { useEffect, useState } from "react";
import { getProgressHint } from "@/lib/apply/progressHints";

interface ProgressHintProps {
  stepNumber: number;
  totalSteps: number;
  className?: string;
}

export function ProgressHint({ stepNumber, totalSteps, className = "" }: ProgressHintProps) {
  const message = getProgressHint(stepNumber, totalSteps);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const frame = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, [message, stepNumber]);

  if (!message) return null;

  return (
    <p
      className={`text-center text-xs font-medium text-green-deep transition-opacity duration-[200ms] ease-out motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {message}
    </p>
  );
}
