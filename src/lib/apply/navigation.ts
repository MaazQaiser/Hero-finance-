import {
  type ApplicationData,
  type StepId,
  getPostBridgeSteps,
  needsPreviousAddress,
} from "@/lib/apply/types";

/** Next step id in the current dynamic form sequence. */
export function getNextFormStepId(
  currentStepId: StepId,
  data: ApplicationData,
): StepId | null {
  const steps = getPostBridgeSteps(data);
  const currentIndex = steps.indexOf(currentStepId);

  if (currentIndex < 0) {
    return steps[0] ?? null;
  }

  return steps[currentIndex + 1] ?? null;
}

/** Previous step id in the current dynamic form sequence. */
export function getPrevFormStepId(
  currentStepId: StepId,
  data: ApplicationData,
): StepId | null {
  const steps = getPostBridgeSteps(data);
  const currentIndex = steps.indexOf(currentStepId);

  if (currentIndex <= 0) return null;

  return steps[currentIndex - 1] ?? null;
}

/** Keep the active step valid when the dynamic step list changes. */
export function resolveActiveFormStepId(
  currentStepId: StepId,
  data: ApplicationData,
): StepId {
  const steps = getPostBridgeSteps(data);

  if (steps.includes(currentStepId)) {
    return currentStepId;
  }

  // Previous-address was removed because tenure no longer requires it
  if (currentStepId === "previous-address") {
    return steps.includes("income") ? "income" : (steps[steps.length - 1] ?? "email");
  }

  return steps[0] ?? "email";
}

export function getFormStepNumber(stepId: StepId, data: ApplicationData, introCount: number): number {
  const steps = getPostBridgeSteps(data);
  const index = steps.indexOf(stepId);
  return introCount + Math.max(index, 0) + 1;
}

/** Clear previous address when tenure no longer requires it. */
export function clearPreviousAddressIfNotNeeded(data: ApplicationData): Partial<ApplicationData> {
  if (needsPreviousAddress(data)) return {};

  if (!data.previousPostcode && !data.previousAddress) return {};

  return {
    previousPostcode: "",
    previousAddress: "",
  };
}
