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
    title: "AA Vehicle Inspection",
    description:
      "Every vehicle is independently inspected before collection to ensure it meets our quality standards.",
    benefits: [
      "Independently inspected",
      "Mechanical checks",
      "Safety checks",
      "Interior & exterior inspection",
    ],
    cta: { label: "Learn More" },
  },
  batteryHealth: {
    id: "batteryHealth",
    title: "Battery Health Verified",
    description:
      "Eligible electric vehicles include an independent battery health report showing the battery's condition.",
    benefits: [
      "Independent testing",
      "State of Health",
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
