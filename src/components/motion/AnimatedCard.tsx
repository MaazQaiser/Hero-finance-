"use client";

import { type HTMLAttributes, type ReactNode } from "react";

interface AnimatedCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
}

export function AnimatedCard({
  children,
  className = "",
  interactive = true,
  ...props
}: AnimatedCardProps) {
  return (
    <div
      className={`motion-card ${interactive ? "motion-card-interactive" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
