export type WarrantyPlanId = "essential" | "premium";

export interface WarrantyPlan {
  id: WarrantyPlanId;
  name: string;
  duration: string;
  monthlyPrice: number;
  description: string;
  benefits: string[];
}

export const warrantyPlans: WarrantyPlan[] = [
  {
    id: "essential",
    name: "Essential Cover",
    duration: "12 months",
    monthlyPrice: 14,
    description: "Core mechanical and electrical protection for everyday peace of mind.",
    benefits: ["Mechanical breakdown", "Electrical components", "Parts & labour", "UK-wide recovery support"],
  },
  {
    id: "premium",
    name: "Premium Cover",
    duration: "24 months",
    monthlyPrice: 23,
    description: "Extended cover with broader protection for longer ownership confidence.",
    benefits: [
      "Everything in Essential",
      "Extended claim limits",
      "Priority claim handling",
      "Nationwide dealer support",
    ],
  },
];

export const coverageHighlights = [
  "Mechanical breakdown",
  "Electrical components",
  "Parts & labour",
  "Nationwide support",
];

export const notCoveredItems = [
  "Wear and tear",
  "Tyres",
  "Brake pads",
  "Routine servicing",
];
