/**
 * @deprecated Import from `@/config/trustMessages` instead.
 * Kept for backward-compatible imports during migration.
 */
export {
  type TrustMessage as AmbientTrustMessage,
  type TrustMessageKey as AmbientTrustKey,
  trustMessages as ambientTrustMessages,
  getTrustMessage as getAmbientTrustMessage,
  getTrustMessageKeyForStep as getAmbientTrustKeyForStep,
} from "@/config/trustMessages";
