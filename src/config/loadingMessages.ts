/**
 * Premium waiting-moment copy — bridge screen and eligibility loading.
 * Do not hardcode messages inside components.
 */

export interface LoadingStateMessage {
  title: string;
  description: string;
}

/** Bridge screen — rotating Hero USP messages (one at a time) */
export const bridgeRotatingMessages: string[] = [
  "We're the dealer, not a broker.",
  "Hundreds of inspected cars ready to drive away.",
  "Every vehicle is independently AA inspected.",
  "Battery health certificates available on EVs.",
  "Soft search only.",
  "No impact on your credit score.",
];

/** Eligibility loading — sequential progress states */
export const eligibilityLoadingStates: LoadingStateMessage[] = [
  {
    title: "Reviewing your application",
    description: "We're securely checking the information you've provided.",
  },
  {
    title: "Finding suitable finance options",
    description: "Matching your application with the right lenders.",
  },
  {
    title: "Preparing your result",
    description: "Almost finished. We're getting everything ready.",
  },
];

/** Eligibility loading — rotating trust messages below progress copy */
export const eligibilityRotatingTrustMessages: string[] = [
  "Every car AA inspected before collection.",
  "Hundreds of cars in stock.",
  "Battery health verified on EVs.",
  "Delivered to your door.",
  "Soft search only.",
  "Finance and the car from one trusted team.",
];

/** Shared rotation timing */
export const TRUST_ROTATE_INTERVAL_MS = 2500;
export const TRUST_FADE_DURATION_MS = 250;

/** Eligibility state progression — keep in sync with ApplyFlow redirect */
export const ELIGIBILITY_LOADING_DURATION_MS = 4500;
export const ELIGIBILITY_STATE_HOLD_MS = 1400;
export const ELIGIBILITY_STATE_FADE_MS = 250;
