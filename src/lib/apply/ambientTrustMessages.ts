/**
 * Ambient trust copy — frontend design prototype.
 * Screens reference keys from this object; do not hardcode messages in UI.
 */

export type AmbientTrustKey =
  | "intro"
  | "name"
  | "address"
  | "employment"
  | "income"
  | "licence"
  | "vehicle"
  | "finance"
  | "review"
  | "approval"
  | "bridge";

export interface AmbientTrustMessage {
  title: string;
  description?: string;
}

export const ambientTrustMessages: Record<AmbientTrustKey, AmbientTrustMessage> = {
  intro: {
    title: "Trusted Dealer",
    description: "Finance and your next car from one team.",
  },
  name: {
    title: "FCA Regulated Dealer",
    description: "You're applying with an FCA regulated dealership.",
  },
  address: {
    title: "Secure Information",
    description: "Your details are encrypted and only used for your finance application.",
  },
  employment: {
    title: "Self-employed Welcome",
    description: "We regularly help employed and self-employed applicants.",
  },
  income: {
    title: "Affordability Only",
    description: "Your income is only used to assess affordability.",
  },
  licence: {
    title: "Flexible Criteria",
    description: "We work with a wide range of driving licence types.",
  },
  vehicle: {
    title: "Real Cars",
    description: "Hundreds of inspected cars are ready to drive away.",
  },
  finance: {
    title: "Soft Search",
    description: "Checking eligibility won't affect your credit score.",
  },
  review: {
    title: "You're Almost Done",
    description: "We'll review everything before checking your eligibility.",
  },
  approval: {
    title: "Cars Ready Today",
    description: "You're approved and your next car is waiting.",
  },
  bridge: {
    title: "Soft Search",
    description: "Checking eligibility won't affect your credit score.",
  },
};

/** Map application step IDs → ambient trust keys */
const stepToTrustKey: Record<string, AmbientTrustKey> = {
  residential: "address",
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
  vehicle: "vehicle",
  joint: "name",
  consent: "finance",
  review: "review",
};

export function getAmbientTrustKeyForStep(stepId: string): AmbientTrustKey {
  return stepToTrustKey[stepId] ?? "finance";
}

export function getAmbientTrustMessage(key: AmbientTrustKey): AmbientTrustMessage {
  return ambientTrustMessages[key] ?? ambientTrustMessages.finance;
}
