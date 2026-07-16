import { type ApplicationData, type StepId } from "@/lib/apply/types";

export interface StepCopy {
  title: string;
  helper: string;
  encouragement?: string;
}

function getDisplayName(data: ApplicationData): string | null {
  if (data.firstName.trim()) return data.firstName.trim();

  const email = data.email.trim();
  if (email.includes("@")) {
    const local = email.split("@")[0]?.split(/[._-]/)[0];
    if (local && local.length >= 2) {
      return local.charAt(0).toUpperCase() + local.slice(1).toLowerCase();
    }
  }

  return null;
}

function getCityFromAddress(address: string): string | null {
  if (!address.trim()) return null;

  const parts = address
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length < 2) return null;

  const candidate = parts[parts.length - 2];
  if (!candidate || /^[A-Z]{1,2}\d/i.test(candidate)) return null;

  return candidate;
}

/** Light personalisation — only when context is available */
export function personalizeStepMeta(
  stepId: StepId,
  meta: StepCopy,
  data: ApplicationData,
): StepCopy {
  const name = getDisplayName(data);
  const city = getCityFromAddress(data.address);

  switch (stepId) {
    case "employment-duration":
    case "previous-employer":
    case "previous-employment-duration":
      if (name) {
        return {
          ...meta,
          title: `Tell us a little more about your employment, ${name}.`,
        };
      }
      break;

    case "address-duration":
      if (city) {
        return {
          ...meta,
          title: `Let's confirm your address in ${city}.`,
        };
      }
      break;

    case "income":
      if (name) {
        return {
          ...meta,
          title: `Tell us about your income, ${name}.`,
        };
      }
      break;

    default:
      break;
  }

  return meta;
}
