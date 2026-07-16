import { type LandingVariant } from "@/lib/landing/types";

/**
 * Journey message matching — intro, bridge, and approval copy per entry point.
 * Layout and flow stay identical; only strings change.
 */

export type JourneyVariantId =
  | "default"
  | "badCredit"
  | "declined"
  | "selfEmployed"
  | "firstTimeBuyer"
  | "noDeposit"
  | "negativeEquity"
  | "fastDecision"
  | "calculator"
  | "vehicle"
  | "softSearch";

export interface JourneyVariant {
  id: JourneyVariantId;
  introTitle: string;
  introDescription: string;
  introReassurance: string;
  ctaText: string;
  bridgeTitle: string;
  bridgeDescription: string;
  bridgeReassurance: string;
  approvalEyebrow: string;
  approvalTitle: string;
  approvalDescription: string;
}

export const journeyVariants: Record<JourneyVariantId, JourneyVariant> = {
  default: {
    id: "default",
    introTitle: "Every credit story deserves a fair hearing.",
    introDescription:
      "Answer a few quick questions so we can understand your situation before we run a soft search.",
    introReassurance: "Soft search only · no impact on your credit file",
    ctaText: "Start my application",
    bridgeTitle: "You're in the right place.",
    bridgeDescription:
      "Most people we help have been turned down elsewhere. Let's complete the remaining details.",
    bridgeReassurance: "Soft search only · checking eligibility won't affect your score",
    approvalEyebrow: "Congratulations!",
    approvalTitle: "Great news. You're approved.",
    approvalDescription:
      "We've found finance options and we've got real cars ready for you.",
  },

  badCredit: {
    id: "badCredit",
    introTitle: "We consider every credit story.",
    introDescription:
      "Your score isn't the whole picture. A few quick questions help us understand your situation before we run a soft search.",
    introReassurance: "Soft search only · your score stays protected",
    ctaText: "Check my options",
    bridgeTitle: "You're not alone.",
    bridgeDescription: "Many of the customers we help have been declined elsewhere.",
    bridgeReassurance: "We look at your full circumstances, not just a credit score",
    approvalEyebrow: "Great news",
    approvalTitle: "We've found finance options based on your circumstances.",
    approvalDescription:
      "Your application has been matched with lenders who consider more than your credit score.",
  },

  declined: {
    id: "declined",
    introTitle: "We consider every credit story.",
    introDescription:
      "Being refused before doesn't define your options. A few quick questions help us understand your situation before we run a soft search.",
    introReassurance: "Refused elsewhere doesn't mean refused here",
    ctaText: "See if I qualify",
    bridgeTitle: "This is a fresh start.",
    bridgeDescription:
      "Many of the customers we help have been declined elsewhere. A few more details help us match you with the right lenders.",
    bridgeReassurance: "Soft search only · nothing here hard-searches your credit",
    approvalEyebrow: "Congratulations!",
    approvalTitle: "Great news. You're approved.",
    approvalDescription:
      "We've found finance options even after a previous refusal — with real cars ready for you.",
  },

  selfEmployed: {
    id: "selfEmployed",
    introTitle: "We understand how you earn.",
    introDescription:
      "Self-employed income comes in many forms. A few quick questions help us match you with the right lenders before we run a soft search.",
    introReassurance: "Lenders who understand self-employed income",
    ctaText: "Start my application",
    bridgeTitle: "We'll review your application based on your circumstances.",
    bridgeDescription: "We regularly help self-employed applicants.",
    bridgeReassurance: "Your income is only used to assess affordability",
    approvalEyebrow: "Congratulations!",
    approvalTitle: "We've found suitable finance options for you.",
    approvalDescription:
      "Your application has been matched with options that work for self-employed drivers.",
  },

  firstTimeBuyer: {
    id: "firstTimeBuyer",
    introTitle: "Your first step, made straightforward.",
    introDescription:
      "First-time finance doesn't have to be confusing. A few quick questions help us understand what you need before we run a soft search.",
    introReassurance: "Soft search only · perfect for first-time buyers",
    ctaText: "Start my application",
    bridgeTitle: "You're doing great.",
    bridgeDescription: "We'll guide you through every step.",
    bridgeReassurance: "Clear monthly payments · no jargon, no pressure",
    approvalEyebrow: "Congratulations!",
    approvalTitle: "Great news. You're approved.",
    approvalDescription:
      "Welcome to car finance — we've found options and AA-inspected cars ready for you.",
  },

  noDeposit: {
    id: "noDeposit",
    introTitle: "Deposit-free options may be available.",
    introDescription:
      "A deposit isn't always required. A few quick questions help us see what's possible before we run a soft search.",
    introReassurance: "Deposit isn't always a barrier",
    ctaText: "Check no-deposit options",
    bridgeTitle: "Let's see what's possible.",
    bridgeDescription:
      "We'll use the next few details to check deposit-free and low-deposit finance options.",
    bridgeReassurance: "Soft search only · no obligation to proceed",
    approvalEyebrow: "Congratulations!",
    approvalTitle: "Great news. You're approved.",
    approvalDescription:
      "Finance options are available, including paths that may work with little or no deposit.",
  },

  negativeEquity: {
    id: "negativeEquity",
    introTitle: "We'll help you understand your position.",
    introDescription:
      "Negative equity doesn't have to stop you moving forward. A few quick questions help us see what's possible before we run a soft search.",
    introReassurance: "Soft search only · confidential and secure",
    ctaText: "Start my application",
    bridgeTitle: "Let's look at your options.",
    bridgeDescription:
      "We'll gather a few more details so we can understand your current finance position.",
    bridgeReassurance: "Your information is only used for your application",
    approvalEyebrow: "Congratulations!",
    approvalTitle: "Great news. You're approved.",
    approvalDescription:
      "We've found finance options that take your circumstances into account.",
  },

  fastDecision: {
    id: "fastDecision",
    introTitle: "A fast decision starts here.",
    introDescription:
      "Most applications take around 60 seconds. A few quick questions help us run your soft search straight away.",
    introReassurance: "Decision in under 60 seconds · soft search only",
    ctaText: "Get my decision",
    bridgeTitle: "Almost there.",
    bridgeDescription:
      "Finish these details and we'll prioritise the quickest available finance options.",
    bridgeReassurance: "Soft search only · no impact on your credit score",
    approvalEyebrow: "Congratulations!",
    approvalTitle: "Great news. You're approved.",
    approvalDescription:
      "Your decision is ready — browse AA-inspected cars when you're ready.",
  },

  calculator: {
    id: "calculator",
    introTitle: "Know your numbers before you choose.",
    introDescription:
      "Understanding your budget makes car shopping easier. A few quick questions help us show what's affordable before we run a soft search.",
    introReassurance: "No admin fees · the price you see is the price you pay",
    ctaText: "Check my eligibility",
    bridgeTitle: "Your estimate is a starting point.",
    bridgeDescription: "Let's turn your estimate into a real approval.",
    bridgeReassurance: "We'll confirm options close to the budget you explored",
    approvalEyebrow: "Congratulations!",
    approvalTitle: "Your estimated payment is now a real approval.",
    approvalDescription:
      "We've found finance options that align with the budget you calculated — and cars ready to browse.",
  },

  vehicle: {
    id: "vehicle",
    introTitle: "You've found a car — let's check finance.",
    introDescription:
      "A few quick questions help us confirm finance options for the vehicle you have in mind.",
    introReassurance: "Finance and the car from one team",
    ctaText: "Continue with this car",
    bridgeTitle: "Almost ready to reserve.",
    bridgeDescription:
      "Finish these details and we'll run a soft search so you can move toward reserving your car.",
    bridgeReassurance: "Soft search only · AA inspected stock",
    approvalEyebrow: "Congratulations!",
    approvalTitle: "This vehicle fits within your approved budget.",
    approvalDescription:
      "Finance options are ready — you can continue toward the car you selected.",
  },

  softSearch: {
    id: "softSearch",
    introTitle: "A soft search you can trust.",
    introDescription:
      "We'll only run a soft search — it won't affect your credit score. A few quick questions first help us understand your situation.",
    introReassurance: "Soft search only · zero impact on your credit file",
    ctaText: "Start my soft search",
    bridgeTitle: "Still a soft search.",
    bridgeDescription:
      "The next details help us complete your soft search — nothing here hard-searches your credit.",
    bridgeReassurance: "No impact on your credit score",
    approvalEyebrow: "Congratulations!",
    approvalTitle: "Great news. You're approved.",
    approvalDescription:
      "Your soft search is complete. We've found finance options with no impact on your credit score.",
  },
};

/** Continue landing conversation into the application intro when a campaign is present. */
export function mergeJourneyWithLanding(
  journey: JourneyVariant,
  landing: LandingVariant,
): JourneyVariant {
  return {
    ...journey,
    introTitle: landing.applicationIntroHeading,
    introDescription: landing.applicationSupportingCopy,
    ctaText: landing.applicationCta,
    introReassurance: landing.firstReassurance,
  };
}

/** @deprecated Use resolveJourneyVariant() or useJourneyVariant() instead */
export function getActiveJourneyVariant(): JourneyVariant {
  return journeyVariants.default;
}
