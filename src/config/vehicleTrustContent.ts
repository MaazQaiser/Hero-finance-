/**
 * Vehicle trust layer copy — Hero owns the vehicles, not a broker.
 */

export type CertificateType = "inspection" | "battery";

export interface CertificateContent {
  title: string;
  description: string;
  filename: string;
  previewLabel: string;
}

export const vehicleTrustContent = {
  panelTitle: "Included with every Hero vehicle",

  trustItems: {
    aaInspection: "AA Vehicle Health Check",
    readyToDrive: "Ready to Drive",
    freeDelivery: "Free Delivery",
    batteryHealth: "Battery Health Verified",
  },

  inspection: {
    title: "AA Vehicle Health Check",
    description: "Every vehicle is independently inspected before collection.",
    actionLabel: "View Certificate",
  },

  battery: {
    title: "Battery Health Verified",
    description: "Independent battery state-of-health certificate.",
    actionLabel: "View Report",
  },

  warranty: {
    label: "AA Warranty Available",
    modalTitle: "Optional AA warranty",
    modalDescription:
      "Add protection from day one. Our team can talk you through cover levels when you reserve or collect.",
  },

  certificates: {
    inspection: {
      title: "AA Vehicle Health Check",
      description: "Independently inspected before collection.",
      filename: "AA_Vehicle_Inspection.pdf",
      previewLabel: "Inspection certificate",
    },
    battery: {
      title: "Battery Health Report",
      description: "State-of-health certificate for eligible EVs and hybrids.",
      filename: "Battery_Health_Report.pdf",
      previewLabel: "Battery health report",
    },
  } satisfies Record<CertificateType, CertificateContent>,

  dealerAdvantages: {
    title: "Why Hero is different",
    subtitle: "Finance and your car from one trusted dealership — not a broker.",
    items: [
      "Finance and vehicle from one place",
      "Hundreds of cars in stock",
      "Independently inspected vehicles",
      "Battery health reports on eligible EVs",
      "Warranty available",
    ],
  },

  nextSteps: {
    title: "What happens next?",
    steps: [
      "Choose your vehicle",
      "Reserve online",
      "Speak with our finance team",
      "Arrange collection or delivery",
    ],
  },
} as const;
