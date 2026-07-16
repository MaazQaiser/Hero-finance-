/**
 * Journey-specific UX behaviour — frontend prototype.
 *
 * Preview variants via URL, e.g.
 * /apply?campaign=bad-credit
 * /apply?campaign=no-deposit
 * /apply?campaign=negative-equity
 * /apply?campaign=fast-decision
 * /apply?campaign=soft-search
 * /apply?campaign=affordability&source=calculator
 * /apply?vehicle=1
 */
import {
  type ApplicationData,
  type EmploymentStatus,
  type StepId,
} from "@/lib/apply/types";
import { type JourneyVariantId } from "@/lib/journey/journeyVariants";

export type JourneyBehaviourId = JourneyVariantId;

export interface JourneyBehaviour {
  id: JourneyBehaviourId;
  /** Pre-filled values when fields are empty */
  defaultData?: Partial<ApplicationData>;
  introExtraReassurance?: string;
  showVehicleSummary?: boolean;
  skipAffordabilityMessaging?: boolean;
  highlightEmploymentOption?: EmploymentStatus;
  employmentReassurance?: string;
  consentEmphasiseSoftSearch?: boolean;
  showDepositField?: boolean;
  depositHelperText?: string;
  showPurchaseTimeframe?: boolean;
  purchaseTimeframeHelper?: string;
  showNegativeEquityQuestions?: boolean;
  stepHelpers?: Partial<Record<StepId, string>>;
  stepTitles?: Partial<Record<StepId, string>>;
}

const friendlierHelpers: Partial<Record<StepId, string>> = {
  employment: "Pick the option that best describes you — there's no wrong answer.",
  licence: "Just let us know what licence you hold today.",
  income: "Tell us roughly what you earn each month — we'll only use this to check what's affordable.",
  vehicle: "If you've already spotted a car, add it here. If not, you can browse later.",
  consent: "A quick tick to confirm you're happy for us to run a soft search.",
  review: "Take a moment to check your details look right.",
};

export const journeyBehaviours: Record<JourneyBehaviourId, JourneyBehaviour> = {
  default: {
    id: "default",
  },

  badCredit: {
    id: "badCredit",
    introExtraReassurance: "Many customers we help have been declined elsewhere.",
  },

  declined: {
    id: "declined",
    introExtraReassurance: "Many customers we help have been declined elsewhere.",
  },

  selfEmployed: {
    id: "selfEmployed",
    highlightEmploymentOption: "self-employed",
    employmentReassurance: "We regularly help sole traders and business owners.",
  },

  firstTimeBuyer: {
    id: "firstTimeBuyer",
    stepHelpers: friendlierHelpers,
    stepTitles: {
      consent: "Almost there — just confirm a few things",
    },
  },

  noDeposit: {
    id: "noDeposit",
    defaultData: { financeDeposit: "0" },
    showDepositField: true,
    depositHelperText: "We'll explore finance options without an upfront deposit.",
  },

  negativeEquity: {
    id: "negativeEquity",
    showNegativeEquityQuestions: true,
  },

  fastDecision: {
    id: "fastDecision",
    defaultData: { purchaseTimeframe: "asap" },
    showPurchaseTimeframe: true,
    purchaseTimeframeHelper: "We'll prioritise the quickest available finance options.",
  },

  calculator: {
    id: "calculator",
    skipAffordabilityMessaging: true,
    stepHelpers: {
      income: "We'll confirm what's affordable based on what you've already explored.",
      vehicle: "Add a car if you have one in mind, or browse our stock after you're approved.",
    },
  },

  vehicle: {
    id: "vehicle",
    showVehicleSummary: true,
  },

  softSearch: {
    id: "softSearch",
    consentEmphasiseSoftSearch: true,
  },
};

export function getJourneyBehaviour(id: JourneyVariantId): JourneyBehaviour {
  return journeyBehaviours[id] ?? journeyBehaviours.default;
}

/** Apply journey defaults without overwriting user-entered values */
export function applyJourneyDefaults(
  data: ApplicationData,
  behaviour: JourneyBehaviour,
): ApplicationData {
  const next = { ...data };
  const defaults = behaviour.defaultData ?? {};

  for (const [key, value] of Object.entries(defaults) as [keyof ApplicationData, string][]) {
    const current = next[key];
    if (current === "" || current === undefined || current === null) {
      (next as Record<string, unknown>)[key] = value;
    }
  }

  return next;
}

export function getStepMetaForJourney(
  stepId: StepId,
  behaviour: JourneyBehaviour,
  base: { title: string; helper: string; encouragement?: string },
): { title: string; helper: string; encouragement?: string } {
  let helper = behaviour.stepHelpers?.[stepId] ?? base.helper;

  if (behaviour.skipAffordabilityMessaging && stepId === "income" && !behaviour.stepHelpers?.income) {
    helper = "We'll confirm what's affordable based on what you've already explored.";
  }

  return {
    ...base,
    title: behaviour.stepTitles?.[stepId] ?? base.title,
    helper,
  };
}
