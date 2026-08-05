/**
 * Vehicle trust layer copy — Hero owns the vehicles, not a broker.
 * AA Pass on every car · Aviloo battery certificates on EVs & hybrids.
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
    aaInspection: "AA Pass certificate",
    readyToDrive: "Ready to Drive",
    freeDelivery: "Free Delivery",
    batteryHealth: "Aviloo battery health",
  },

  inspection: {
    title: "AA Pass certificate",
    description: "Every vehicle is independently AA inspected before collection.",
    actionLabel: "View AA certificate",
  },

  battery: {
    title: "Aviloo battery health check",
    description:
      "Independent State of Health certificate for electric and hybrid batteries.",
    actionLabel: "View Aviloo report",
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
      description: "Independently inspected and passed before collection.",
      filename: "AA_Vehicle_Inspection.pdf",
      previewLabel: "AA Pass certificate",
    },
    battery: {
      title: "Aviloo Independent Battery Certificate",
      description:
        "Independent battery diagnostics — State of Health, range and cell checks.",
      filename: "Aviloo_Battery_Certificate.pdf",
      previewLabel: "Aviloo battery certificate",
    },
  } satisfies Record<CertificateType, CertificateContent>,

  dealerAdvantages: {
    title: "Why Hero is different",
    subtitle: "Finance and your car from one trusted dealership — not a broker.",
    items: [
      "Finance and vehicle from one place",
      "Hundreds of cars in stock",
      "AA Pass certificate on every car",
      "Aviloo battery health checks on EVs & hybrids",
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
