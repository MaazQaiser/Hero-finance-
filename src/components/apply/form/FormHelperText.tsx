import { type ReactNode } from "react";

interface FormHelperTextProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function FormHelperText({ children, className = "", id }: FormHelperTextProps) {
  return (
    <p id={id} className={`mt-2 text-xs leading-relaxed text-muted ${className}`}>
      {children}
    </p>
  );
}
