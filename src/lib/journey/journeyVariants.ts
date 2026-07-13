/**
 * Frontend design prototype — journey message matching.
 *
 * Switch the active journey by changing `activeVariant` below.
 * Layout and flow stay the same; only copy updates.
 *
 * Example: const activeVariant = "badCredit";
 */

export type JourneyVariantId =
  | "default"
  | "badCredit"
  | "declined"
  | "selfEmployed"
  | "firstTimeBuyer"
  | "noDeposit"
  | "calculator"
  | "vehicle"
  | "softSearch";

export interface JourneyVariant {
  introTitle: string;
  introDescription: string;
  ctaText: string;
  bridgeTitle: string;
  bridgeDescription: string;
  approvalTitle: string;
  approvalDescription: string;
  trustMessages: string[];
}

/** ─── Change this to preview a different journey ─── */
export const activeVariant: JourneyVariantId = "badCredit";

export const journeyVariants: Record<JourneyVariantId, JourneyVariant> = {
  default: {
    introTitle: "Every credit story deserves a fair hearing.",
    introDescription: "Answer a few quick questions so we can understand your situation.",
    ctaText: "Start my application",
    bridgeTitle: "You're in the right place.",
    bridgeDescription:
      "Most people we help have been turned down elsewhere. Let's complete the remaining details.",
    approvalTitle: "You're approved.",
    approvalDescription:
      "Great news. We've found finance options and we've got real cars ready for you.",
    trustMessages: [
      "Soft search only.",
      "FCA regulated dealer.",
      "Real cars ready to drive away.",
      "Finance and car from one trusted team.",
    ],
  },

  badCredit: {
    introTitle: "Been turned down before?",
    introDescription: "We look beyond your credit score and consider your full situation.",
    ctaText: "Check my options",
    bridgeTitle: "You're not alone.",
    bridgeDescription: "Many customers we help have been declined elsewhere.",
    approvalTitle: "Great news.",
    approvalDescription: "We've found finance options based on your circumstances.",
    trustMessages: [
      "We consider more than your credit score.",
      "Soft search only.",
      "Real cars ready to drive away.",
      "FCA regulated dealer.",
    ],
  },

  declined: {
    introTitle: "Been refused finance elsewhere?",
    introDescription:
      "A previous decline doesn't define your options. We work with lenders who look at the full picture.",
    ctaText: "See if I qualify",
    bridgeTitle: "This is a fresh start.",
    bridgeDescription:
      "We'll gather a few more details so we can match you with lenders who consider your full story.",
    approvalTitle: "You're approved.",
    approvalDescription:
      "We've found finance options even after a previous refusal — with real cars ready for you.",
    trustMessages: [
      "Refused elsewhere doesn't mean refused here.",
      "Soft search only.",
      "AA inspected stock.",
      "FCA regulated dealer.",
    ],
  },

  selfEmployed: {
    introTitle: "Finance for self-employed drivers.",
    introDescription: "We regularly help sole traders and business owners.",
    ctaText: "Continue",
    bridgeTitle: "We'll review your application based on your circumstances.",
    bridgeDescription:
      "A few more details help us match you with lenders who understand how you earn.",
    approvalTitle: "We've found suitable finance options for you.",
    approvalDescription:
      "Your application has been matched with options that work for self-employed drivers.",
    trustMessages: [
      "Lenders who understand self-employed income.",
      "Soft search only.",
      "Real cars in stock.",
      "FCA regulated dealer.",
    ],
  },

  firstTimeBuyer: {
    introTitle: "First car on finance? We'll guide you.",
    introDescription: "No jargon, no pressure — just clear steps from check to keys.",
    ctaText: "Start my application",
    bridgeTitle: "You're doing great.",
    bridgeDescription:
      "Almost there. A few more details and we'll run a soft search that won't affect your score.",
    approvalTitle: "You're approved.",
    approvalDescription:
      "Welcome to car finance — we've found options and AA-inspected cars ready for you.",
    trustMessages: [
      "Clear monthly payments.",
      "Soft search only.",
      "AA inspected vehicles.",
      "One team from start to finish.",
    ],
  },

  noDeposit: {
    introTitle: "No deposit? You could still drive away.",
    introDescription: "Deposit-free options may be available depending on your circumstances.",
    ctaText: "Check no-deposit options",
    bridgeTitle: "Let's see what's possible.",
    bridgeDescription:
      "We'll use the next few details to check deposit-free and low-deposit finance options.",
    approvalTitle: "You're approved.",
    approvalDescription:
      "Great news — finance options are available, including paths that may work with little or no deposit.",
    trustMessages: [
      "Deposit isn't always a barrier.",
      "Soft search only.",
      "Real cars ready to reserve.",
      "FCA regulated dealer.",
    ],
  },

  calculator: {
    introTitle: "You've seen your numbers — let's make them real.",
    introDescription:
      "Based on your calculator estimate, answer a few quick questions to check your eligibility.",
    ctaText: "Check my eligibility",
    bridgeTitle: "Your estimate is a starting point.",
    bridgeDescription:
      "Complete the remaining details so we can confirm options close to the budget you explored.",
    approvalTitle: "You're approved.",
    approvalDescription:
      "We've found finance options that align with the budget you calculated — and cars ready to browse.",
    trustMessages: [
      "No admin fees.",
      "Soft search only.",
      "Clear monthly payments.",
      "FCA regulated dealer.",
    ],
  },

  vehicle: {
    introTitle: "You've found a car — let's check finance.",
    introDescription:
      "A few quick questions help us confirm finance options for the vehicle you have in mind.",
    ctaText: "Continue with this car",
    bridgeTitle: "Almost ready to reserve.",
    bridgeDescription:
      "Finish these details and we'll run a soft search so you can move toward reserving your car.",
    approvalTitle: "You're approved.",
    approvalDescription:
      "Finance options are ready — you can continue toward the car you selected.",
    trustMessages: [
      "Finance and the car from one team.",
      "Soft search only.",
      "AA inspected stock.",
      "FCA regulated dealer.",
    ],
  },

  softSearch: {
    introTitle: "Check without touching your credit score.",
    introDescription:
      "A soft search shows your options first — with no mark left on your credit file.",
    ctaText: "Start my soft search",
    bridgeTitle: "Still a soft search.",
    bridgeDescription:
      "The next details help us complete your soft search — nothing here hard-searches your credit.",
    approvalTitle: "You're approved.",
    approvalDescription:
      "Your soft search is complete. We've found finance options with no impact on your credit score.",
    trustMessages: [
      "Soft search only.",
      "No impact on your credit score.",
      "Real cars ready to drive away.",
      "FCA regulated dealer.",
    ],
  },
};

export function getActiveJourneyVariant(): JourneyVariant {
  return journeyVariants[activeVariant] ?? journeyVariants.default;
}
