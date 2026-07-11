import { type ReactNode } from "react";
import { type StepId } from "./types";

interface StepReassurance {
  icon: ReactNode;
  text: string;
}

function ReassuranceIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const stepReassuranceMap: Partial<Record<StepId, StepReassurance>> = {
  email: {
    icon: (
      <ReassuranceIcon>
        <path d="M4 4h16v16H4z" />
        <path d="M4 8l8 5 8-5" />
      </ReassuranceIcon>
    ),
    text: "We'll only use this to keep you updated on your application.",
  },
  dob: {
    icon: (
      <ReassuranceIcon>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </ReassuranceIcon>
    ),
    text: "Used only to confirm you're eligible for finance.",
  },
  "employment-duration": {
    icon: (
      <ReassuranceIcon>
        <path d="M3 13h18" />
        <path d="M5 17h14" />
        <path d="M7 9h10" />
        <path d="M9 5h6" />
      </ReassuranceIcon>
    ),
    text: "Hundreds of inspected cars ready to drive away.",
  },
  "previous-employer": {
    icon: (
      <ReassuranceIcon>
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-6h6v6" />
      </ReassuranceIcon>
    ),
    text: "Recent employment history helps lenders assess your application.",
  },
  "previous-employment-duration": {
    icon: (
      <ReassuranceIcon>
        <path d="M8 7V3" />
        <path d="M16 7V3" />
        <path d="M4 11h16" />
        <path d="M5 21h14a1 1 0 0 0 1-1V7H4v13a1 1 0 0 0 1 1z" />
      </ReassuranceIcon>
    ),
    text: "A complete picture helps us match you with the right lender.",
  },
  address: {
    icon: (
      <ReassuranceIcon>
        <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2" />
      </ReassuranceIcon>
    ),
    text: "Free delivery within 30 miles.",
  },
  "address-duration": {
    icon: (
      <ReassuranceIcon>
        <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10z" />
      </ReassuranceIcon>
    ),
    text: "Lenders use residential history to understand stability.",
  },
  "previous-address": {
    icon: (
      <ReassuranceIcon>
        <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
      </ReassuranceIcon>
    ),
    text: "Only needed when you've lived at your current address under three years.",
  },
  income: {
    icon: (
      <ReassuranceIcon>
        <path d="M12 2v20" />
        <path d="M17 7H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H7" />
      </ReassuranceIcon>
    ),
    text: "No admin fees. The price you see is the price you pay.",
  },
  vehicle: {
    icon: (
      <ReassuranceIcon>
        <path d="M3 13h2l2-5h10l2 5h2" />
        <path d="M5 17h14" />
        <circle cx="7" cy="17" r="1" />
        <circle cx="17" cy="17" r="1" />
      </ReassuranceIcon>
    ),
    text: "Finance and the car from one trusted team.",
  },
  joint: {
    icon: (
      <ReassuranceIcon>
        <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </ReassuranceIcon>
    ),
    text: "Joint applications can sometimes improve your finance options.",
  },
  consent: {
    icon: (
      <ReassuranceIcon>
        <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />
      </ReassuranceIcon>
    ),
    text: "Soft search only. No impact on your credit score.",
  },
  review: {
    icon: (
      <ReassuranceIcon>
        <path d="M5 13l4 4L19 7" />
      </ReassuranceIcon>
    ),
    text: "FCA regulated dealer you can trust.",
  },
};

export function getStepReassurance(stepId: StepId): StepReassurance | null {
  return stepReassuranceMap[stepId] ?? null;
}
