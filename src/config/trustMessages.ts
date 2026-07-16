/**
 * Central ambient trust copy for the finance application.
 * Screens import from here — do not hardcode trust messages in UI.
 */

export interface TrustMessage {
  title?: string;
  description: string;
}

export type TrustMessageKey =
  | "intro"
  | "name"
  | "address"
  | "livingSituation"
  | "employment"
  | "income"
  | "licence"
  | "finance"
  | "consent"
  | "review"
  | "bridge"
  | "approval";

export const trustMessages: Record<
  TrustMessageKey,
  TrustMessage | TrustMessage[]
> = {
  intro: {
    description: "Finance and your next car from one trusted dealership.",
  },

  name: {
    title: "Established FCA regulated dealer",
    description: "You're applying with a trusted UK dealership.",
  },

  address: {
    description: "Delivered to your door within our delivery area.",
  },

  livingSituation: {
    description: "Every vehicle is independently AA inspected before collection.",
  },

  employment: {
    description: "Hundreds of inspected vehicles are ready to drive away.",
  },

  income: {
    title: "No hidden admin fees",
    description: "The price you see is the price you pay.",
  },

  licence: {
    description: "Battery health certificates available on eligible EVs.",
  },

  finance: {
    description: "14-day money back on eligible online purchases.",
  },

  consent: {
    title: "Soft search only",
    description: "Checking eligibility won't affect your credit score.",
  },

  review: {
    description: "We'll review everything before checking your eligibility.",
  },

  bridge: {
    title: "Soft search only",
    description: "Checking eligibility won't affect your credit score.",
  },

  approval: [
    { description: "AA inspected" },
    { description: "Battery health verified" },
    { description: "Delivered to your door" },
    { description: "Money-back guarantee" },
  ],
};

export function getTrustMessage(key: TrustMessageKey): TrustMessage | TrustMessage[] {
  return trustMessages[key];
}

/** Map application step IDs → trust message keys */
const stepToTrustKey: Record<string, TrustMessageKey> = {
  residential: "livingSituation",
  employment: "employment",
  licence: "licence",
  "joint-choice": "name",
  mobile: "name",
  email: "name",
  dob: "name",
  "employment-duration": "employment",
  "previous-employer": "employment",
  "previous-employment-duration": "employment",
  address: "address",
  "address-duration": "address",
  "previous-address": "address",
  income: "income",
  vehicle: "finance",
  joint: "name",
  consent: "consent",
  review: "review",
};

export function getTrustMessageKeyForStep(stepId: string): TrustMessageKey {
  return stepToTrustKey[stepId] ?? "consent";
}
