import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "light";
}

const variantClasses = {
  default: "bg-surface border border-cream/10",
  elevated: "bg-surface border border-cream/10 shadow-lg shadow-black/20",
  light: "bg-cream text-charcoal border border-charcoal/5",
};

export function Card({
  children,
  className = "",
  variant = "default",
}: CardProps) {
  return (
    <div
      className={`rounded-[var(--radius-card)] p-6 md:p-8 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
