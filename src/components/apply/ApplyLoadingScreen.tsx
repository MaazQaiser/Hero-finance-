"use client";

export {
  EligibilityLoading,
  ELIGIBILITY_LOADING_DURATION_MS,
} from "@/components/apply/loading/EligibilityLoading";

import { EligibilityLoading } from "@/components/apply/loading/EligibilityLoading";

/** @deprecated Prefer EligibilityLoading — kept for existing ApplyFlow import */
export function ApplyLoadingScreen() {
  return <EligibilityLoading />;
}
