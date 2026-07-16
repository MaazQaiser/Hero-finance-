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
    description: "Free delivery available.",
  },

  livingSituation: {
    description: "Every vehicle is independently AA inspected before collection.",
  },

  employment: {
    description: "Hundreds of cars ready to drive away.",
  },

  income: {
    description: "No admin fees — the price you see is the price you pay.",
  },

  licence: {
    description: "Battery health verified on our EVs.",
  },

  finance: {
    description: "Hundreds of cars ready to drive away.",
  },

  consent: {
    description: "Soft search only — no impact on your credit score.",
  },

  review: {
    description: "We'll review everything before checking your eligibility.",
  },

  bridge: {
    description: "Hundreds of cars ready to drive away.",
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
