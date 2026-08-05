import { notCoveredItems } from "@/lib/warranty/plans";

export type InformationTopicId =
  | "aaInspection"
  | "batteryHealth"
  | "warranty"
  | "freeDelivery"
  | "moneyBackGuarantee";

export interface InformationPanelCta {
  label: string;
  href?: string;
}

export interface InformationPanelContent {
  id: InformationTopicId;
  title: string;
  description: string;
  benefits: string[];
  exclusions?: string[];
  exclusionsTitle?: string;
  cta?: InformationPanelCta;
}

export const informationPanels: Record<InformationTopicId, InformationPanelContent> = {
  aaInspection: {
    id: "aaInspection",
    title: "AA Pass certificate",
    description:
      "Every vehicle is independently AA inspected before collection to ensure it meets our quality standards.",
    benefits: [
      "AA Pass certificate on every car",
      "Mechanical checks",
      "Safety checks",
      "Interior & exterior inspection",
    ],
    cta: { label: "Learn More" },
  },
  batteryHealth: {
    id: "batteryHealth",
    title: "Aviloo battery health check",
    description:
      "Eligible electric and hybrid vehicles include an independent Aviloo battery certificate showing State of Health, remaining capacity and range.",
    benefits: [
      "Independent Aviloo diagnostics",
      "State of Health (SOH) %",
      "No impact on your credit",
      "Increased buying confidence",
    ],
  },
  warranty: {
    id: "warranty",
    title: "Warranty Protection",
    description: "Protect your vehicle after purchase with optional warranty cover.",
    benefits: ["Mechanical cover", "Electrical cover", "Nationwide support"],
    exclusionsTitle: "What's Not Covered",
    exclusions: notCoveredItems,
  },
  freeDelivery: {
    id: "freeDelivery",
    title: "Free Delivery",
    description:
      "We can deliver your vehicle to your door at no extra cost within mainland UK — ready to drive away.",
    benefits: [
      "Mainland UK delivery",
      "Handover with our team",
      "Collection also available",
      "Ready to drive away",
    ],
  },
  moneyBackGuarantee: {
    id: "moneyBackGuarantee",
    title: "Money Back Guarantee",
    description:
      "If you're not completely satisfied within the guarantee period, we'll work with you to find a fair resolution.",
    benefits: [
      "Peace of mind after purchase",
      "Clear guarantee terms",
      "Support from our team",
      "Transparent process",
    ],
  },
};

export function getInformationPanelContent(topic: InformationTopicId): InformationPanelContent {
  return informationPanels[topic];
}

/** Maps vehicle trust badge ids to information panel topics */
export const trustBadgeTopicMap: Partial<Record<string, InformationTopicId>> = {
  aa: "aaInspection",
  battery: "batteryHealth",
  delivery: "freeDelivery",
};
