/**
 * Premium waiting-moment copy — bridge screen and eligibility loading.
 * Do not hardcode messages inside components.
 */

export interface LoadingStateMessage {
  title: string;
  description: string;
}

/** Bridge screen — single reassurance message while Act 2 loads */
export const bridgeLoadingMessage =
  "Hundreds of cars ready to drive away.";

export const BRIDGE_LOADING_DURATION_MS = 1600;

/** Eligibility loading — sequential progress states */
export const eligibilityLoadingStates: LoadingStateMessage[] = [
  {
    title: "Checking your eligibility...",
    description: "This usually takes a few seconds.",
  },
];

/** Eligibility loading — rotating trust messages below progress copy */
export const eligibilityRotatingTrustMessages: string[] = [
  "AA inspected.",
  "Real cars in stock.",
  "Battery health verified.",
  "Money-back guarantee.",
];

/** Shared rotation timing */
export const TRUST_ROTATE_INTERVAL_MS = 2500;
export const TRUST_FADE_DURATION_MS = 250;

/** Eligibility state progression — keep in sync with ApplyFlow redirect */
export const ELIGIBILITY_LOADING_DURATION_MS = 4200;
export const ELIGIBILITY_STATE_HOLD_MS = 1400;
export const ELIGIBILITY_STATE_FADE_MS = 250;
