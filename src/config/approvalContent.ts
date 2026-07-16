/**
 * Premium approval screen copy — frontend prototype.
 * Update messaging here without editing components.
 */

export interface ApprovalNextSteps {
  title: string;
  description: string;
}

export interface ApprovalActionsContent {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export const approvalContent = {
  eyebrow: "Congratulations!",
  title: "You're approved for vehicle finance.",
  description: "We've found finance options that match your circumstances.",

  financeSummaryLabel: "Your finance summary",

  trustChecklist: [
    "Finance and your car from one trusted dealership",
    "Hundreds of cars in stock and ready to drive away",
    "Every vehicle independently AA inspected",
    "Battery health certificates available on eligible EVs",
    "Soft search completed with no impact on your credit score",
  ],

  nextSteps: {
    title: "What happens next?",
    description:
      "We'll now show you vehicles that match your approval. You can browse, reserve or speak with our finance specialists if you need help.",
    steps: [
      "Choose your vehicle",
      "Reserve online",
      "Speak with our finance team",
      "Arrange collection or delivery",
    ],
  } satisfies ApprovalNextSteps & { steps: string[] },

  actions: {
    primaryLabel: "See Matching Cars",
    primaryHref: "/cars",
    secondaryLabel: "Speak to a Finance Specialist",
    secondaryHref: "tel:08001234567",
  } satisfies ApprovalActionsContent,
};
