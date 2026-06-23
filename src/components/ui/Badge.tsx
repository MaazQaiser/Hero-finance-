import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "coral" | "neutral" | "success";
  className?: string;
}

const variantClasses = {
  coral: "bg-coral/15 text-coral border-coral/30",
  neutral: "bg-cream/10 text-cream border-cream/20",
  success: "bg-success/15 text-success border-success/30",
};

export function Badge({
  children,
  variant = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
