import {
  type ApplicationData,
  needsJointEmployerInfo,
  needsJointPrevAddress,
  needsJointPreviousEmployment,
  needsPrevAddressFromTenure,
  needsPreviousEmployment,
} from "@/lib/apply/types";

export type SectionTone = "warm" | "calm";
export type StepType = "choice" | "form" | "address" | "confirm";

export interface SectionConfig {
  name: string;
  tone: SectionTone;
  title: string;
  desc: string;
  assure: string;
  tint: string;
  /** True for the Decision segment (loading / result) — no form steps */
  isDecision?: boolean;
}

export interface V2StepMeta {
  id: string;
  sectionIndex: number;
  stepType: StepType;
  title: string;
  help?: string;
  /** Optional step-specific footer reassurance (overrides section assure) */
  assure?: string;
}

export interface JourneyProgressState {
  sectionIndex: number;
  sectionName: string;
  segmentPct: number;
  overallPct: number;
  stepsRemaining: number;
  timeRemainingLabel: string;
}

/** Average seconds per screen — used for "About X minutes remaining". */
export const AVG_SECONDS_PER_STEP = 15;

/**
 * Continuous journey sections — homepage → apply → decision.
 * Segment order never resets; Decision is the final segment.
 */
export const SECTIONS: SectionConfig[] = [
  {
    name: "Quick Start",
    tone: "warm",
    title: "A few quick questions",
    desc: "No personal details yet. Just enough to know what we're looking for.",
    assure:
      "We'll use this to match you with suitable finance options. Your soft search won't affect your credit score.",
    tint: "#EFF7F1",
  },
  {
    name: "Your Details",
    tone: "warm",
    title: "Now a bit about you",
    desc: "So we can send your decision and save your progress.",
    assure: "FCA regulated dealer. Your details stay with us.",
    tint: "#F2F7F3",
  },
  {
    name: "Address",
    tone: "calm",
    title: "Where you live",
    desc: "Lenders need three years of address history.",
    assure:
      "We only ask for previous addresses because lenders normally require three years of address history.",
    tint: "#FFFFFF",
  },
  {
    name: "Employment",
    tone: "calm",
    title: "Your employment",
    desc: "Helps us match you with the right lenders.",
    assure:
      "We ask this because lenders usually consider employment stability as part of your application.",
    tint: "#FFFFFF",
  },
  {
    name: "Finance Details",
    tone: "calm",
    title: "Your income",
    desc: "Used only to check what you can comfortably afford.",
    assure: "Used only to check what you can comfortably afford.",
    tint: "#FFFFFF",
  },
  {
    name: "Joint Applicant",
    tone: "calm",
    title: "Your joint applicant",
    desc: "A few details about the person applying with you.",
    assure: "We'll use these details to check options with both of you on the application.",
    tint: "#FFFFFF",
  },
  {
    name: "Part Exchange",
    tone: "calm",
    title: "Your current car",
    desc: "A few details help our team prepare a part exchange valuation.",
    assure: "We'll pass these details to our team — no separate valuation journey needed.",
    tint: "#FFFFFF",
  },
  {
    name: "Review",
    tone: "calm",
    title: "Review & submit",
    desc: "Check your details, then submit for a soft search.",
    assure: "Soft search only. No impact on your credit score.",
    tint: "#FAFCFA",
  },
  {
    name: "Decision",
    tone: "calm",
    title: "Your decision",
    desc: "We're checking your options across our lender panel.",
    assure: "Soft search only. No impact on your credit score.",
    tint: "#FAFCFA",
    isDecision: true,
  },
];

export const DECISION_SECTION_INDEX = SECTIONS.findIndex((s) => s.isDecision);
export const JOINT_APPLICANT_SECTION_INDEX = SECTIONS.findIndex(
  (s) => s.name === "Joint Applicant",
);
export const PART_EXCHANGE_SECTION_INDEX = SECTIONS.findIndex((s) => s.name === "Part Exchange");
export const CONTENT_SECTION_COUNT = SECTIONS.filter((s) => !s.isDecision).length;

const STEP_META: Record<
  string,
  { title: string; help?: string; stepType: StepType; sectionIndex: number; assure?: string }
> = {
  budget: {
    sectionIndex: 0,
    stepType: "choice",
    title: "What monthly payment are you after?",
    help: "Pick a band that feels comfortable — or tell us you're not sure yet.",
  },
  deposit: {
    sectionIndex: 0,
    stepType: "choice",
    title: "How much deposit do you have?",
    help: "Many customers start with a low deposit — or none at all.",
    assure:
      "A larger deposit can reduce your monthly payments, but many customers choose low or even £0 deposit options.",
  },
  "part-exchange-choice": {
    sectionIndex: 0,
    stepType: "choice",
    title: "Do you have a vehicle to part exchange?",
    help: "If yes, we'll ask for a few details later in your application.",
  },
  "car-type": {
    sectionIndex: 0,
    stepType: "choice",
    title: "What kind of car do you need?",
  },
  "credit-rating": {
    sectionIndex: 0,
    stepType: "choice",
    title: "How would you describe your credit?",
    help: "This helps us estimate which cars may suit your situation.",
  },
  when: {
    sectionIndex: 0,
    stepType: "choice",
    title: "When do you need it?",
  },
  name: {
    sectionIndex: 1,
    stepType: "form",
    title: "First, your name.",
    help: "As it appears on your driving licence.",
  },
  mobile: {
    sectionIndex: 1,
    stepType: "form",
    title: "Your mobile number.",
    help: "We text your decision and a link to pick up where you left off.",
  },
  email: {
    sectionIndex: 1,
    stepType: "form",
    title: "And your email.",
    help: "Your decision and finance documents are sent here.",
  },
  dob: {
    sectionIndex: 1,
    stepType: "form",
    title: "Your date of birth.",
    help: "You must be 18 or over to apply.",
  },
  "joint-choice": {
    sectionIndex: 1,
    stepType: "choice",
    title: "Applying",
    help: "A second applicant can improve the options available to you.",
  },
  licence: {
    sectionIndex: 1,
    stepType: "choice",
    title: "What licence do you hold?",
  },
  "uk-passport": {
    sectionIndex: 1,
    stepType: "choice",
    title: "Do you have a UK passport?",
    help: "Lenders may ask for this as part of identity checks later.",
  },
  "passport-country": {
    sectionIndex: 1,
    stepType: "form",
    title: "Which passport do you have?",
    help: "Enter the country that issued your passport.",
  },
  address: {
    sectionIndex: 2,
    stepType: "address",
    title: "Where do you live?",
    help: "Enter your postcode, then pick your address.",
  },
  "address-duration": {
    sectionIndex: 2,
    stepType: "choice",
    title: "Have you lived at your current address for 3 years or more?",
    help: "Lenders usually ask for three years of address history.",
    assure:
      "We only ask for previous addresses because lenders normally require three years of address history.",
  },
  living: {
    sectionIndex: 2,
    stepType: "choice",
    title: "What's your situation there?",
  },
  "previous-address": {
    sectionIndex: 2,
    stepType: "address",
    title: "Your previous address?",
    help: "Enter the postcode, then pick the address.",
    assure:
      "We only ask for previous addresses because lenders normally require three years of address history.",
  },
  "previous-address-duration": {
    sectionIndex: 2,
    stepType: "form",
    title: "When did you live there?",
    help: "Approximate dates are fine.",
    assure:
      "We only ask for previous addresses because lenders normally require three years of address history.",
  },
  employment: {
    sectionIndex: 3,
    stepType: "choice",
    title: "What's your employment status?",
  },
  employer: {
    sectionIndex: 3,
    stepType: "form",
    title: "Where do you work?",
  },
  "job-title": {
    sectionIndex: 3,
    stepType: "form",
    title: "What's your job title?",
  },
  "job-duration": {
    sectionIndex: 3,
    stepType: "choice",
    title: "How long have you worked there?",
    help: "Pick the option that best matches your current role.",
    assure:
      "We ask this because lenders usually consider employment stability as part of your application.",
  },
  "previous-employer": {
    sectionIndex: 3,
    stepType: "form",
    title: "Who was your previous employer?",
    help: "Lenders like to see a little more history when you've recently started a role.",
    assure:
      "We ask this because lenders usually consider employment stability as part of your application.",
  },
  "previous-job-title": {
    sectionIndex: 3,
    stepType: "form",
    title: "What was your job title?",
    assure:
      "We ask this because lenders usually consider employment stability as part of your application.",
  },
  "previous-employment-start": {
    sectionIndex: 3,
    stepType: "form",
    title: "When did you start that role?",
    help: "Approximate dates are fine.",
    assure:
      "We ask this because lenders usually consider employment stability as part of your application.",
  },
  "previous-employment-end": {
    sectionIndex: 3,
    stepType: "form",
    title: "When did that role end?",
    help: "Approximate dates are fine.",
    assure:
      "We ask this because lenders usually consider employment stability as part of your application.",
  },
  income: {
    sectionIndex: 4,
    stepType: "form",
    title: "Your monthly income.",
    help: "Before tax.",
  },
  "other-income": {
    sectionIndex: 4,
    stepType: "form",
    title: "Any other regular income?",
    help: "Optional — for example overtime, benefits, or a second job.",
  },
  "ja-intro": {
    sectionIndex: 5,
    stepType: "form",
    title: "Let's add your joint applicant",
    help: "We'll ask a few details about the person applying with you. This usually takes around two minutes.",
    assure: "We'll use these details to check options with both of you on the application.",
  },
  "ja-name": {
    sectionIndex: 5,
    stepType: "form",
    title: "What's their full name?",
  },
  "ja-dob": {
    sectionIndex: 5,
    stepType: "form",
    title: "What's their date of birth?",
    help: "They must be 18 or over to apply.",
  },
  "ja-relationship": {
    sectionIndex: 5,
    stepType: "choice",
    title: "What's their relationship to you?",
  },
  "ja-address": {
    sectionIndex: 5,
    stepType: "address",
    title: "Where do they live?",
    help: "Enter their postcode, then pick their address.",
  },
  "ja-address-duration": {
    sectionIndex: 5,
    stepType: "choice",
    title: "Have they lived there for 3 years or more?",
    help: "Lenders usually ask for three years of address history.",
    assure:
      "We only ask for previous addresses because lenders normally require three years of address history.",
  },
  "ja-previous-address": {
    sectionIndex: 5,
    stepType: "address",
    title: "Their previous address?",
    help: "Enter the postcode, then pick the address.",
    assure:
      "We only ask for previous addresses because lenders normally require three years of address history.",
  },
  "ja-previous-address-duration": {
    sectionIndex: 5,
    stepType: "form",
    title: "When did they live there?",
    help: "Approximate dates are fine.",
    assure:
      "We only ask for previous addresses because lenders normally require three years of address history.",
  },
  "ja-living": {
    sectionIndex: 5,
    stepType: "choice",
    title: "What's their residential status?",
  },
  "ja-employment": {
    sectionIndex: 5,
    stepType: "choice",
    title: "What's their employment status?",
  },
  "ja-employer": {
    sectionIndex: 5,
    stepType: "form",
    title: "Where do they work?",
  },
  "ja-job-title": {
    sectionIndex: 5,
    stepType: "form",
    title: "What's their job title?",
  },
  "ja-job-duration": {
    sectionIndex: 5,
    stepType: "choice",
    title: "How long have they worked there?",
    help: "Pick the option that best matches their current role.",
    assure:
      "We ask this because lenders usually consider employment stability as part of your application.",
  },
  "ja-previous-employer": {
    sectionIndex: 5,
    stepType: "form",
    title: "Who was their previous employer?",
    help: "Lenders like to see a little more history when they've recently started a role.",
    assure:
      "We ask this because lenders usually consider employment stability as part of your application.",
  },
  "ja-previous-job-title": {
    sectionIndex: 5,
    stepType: "form",
    title: "What was their job title?",
    assure:
      "We ask this because lenders usually consider employment stability as part of your application.",
  },
  "ja-previous-employment-start": {
    sectionIndex: 5,
    stepType: "form",
    title: "When did they start that role?",
    help: "Approximate dates are fine.",
    assure:
      "We ask this because lenders usually consider employment stability as part of your application.",
  },
  "ja-previous-employment-end": {
    sectionIndex: 5,
    stepType: "form",
    title: "When did that role end?",
    help: "Approximate dates are fine.",
    assure:
      "We ask this because lenders usually consider employment stability as part of your application.",
  },
  "ja-income": {
    sectionIndex: 5,
    stepType: "form",
    title: "Their monthly gross income",
    help: "Before tax.",
  },
  "ja-mobile": {
    sectionIndex: 5,
    stepType: "form",
    title: "What's their mobile number?",
    help: "Use their own number — not yours.",
  },
  "ja-email": {
    sectionIndex: 5,
    stepType: "form",
    title: "What's their email address?",
    help: "Use their own email — not yours.",
  },
  "ja-review": {
    sectionIndex: 5,
    stepType: "confirm",
    title: "Check their details",
    help: "You can go back to edit anything before continuing.",
  },
  "px-intro": {
    sectionIndex: 6,
    stepType: "form",
    title: "Tell us about your current car",
    help: "We'll pass these details to our team so they can prepare a part exchange valuation.",
    assure: "We'll pass these details to our team — no separate valuation journey needed.",
  },
  "px-registration": {
    sectionIndex: 6,
    stepType: "form",
    title: "What's the registration number?",
    help: "Enter the plate as it appears on your vehicle.",
    assure: "We'll pass these details to our team — no separate valuation journey needed.",
  },
  "px-mileage": {
    sectionIndex: 6,
    stepType: "form",
    title: "What's the mileage?",
    help: "An estimate is perfectly fine.",
    assure: "We'll pass these details to our team — no separate valuation journey needed.",
  },
  "px-on-finance": {
    sectionIndex: 6,
    stepType: "choice",
    title: "Is your vehicle currently on finance?",
    assure: "We'll pass these details to our team — no separate valuation journey needed.",
  },
  "px-lender": {
    sectionIndex: 6,
    stepType: "form",
    title: "Who is the finance lender?",
    help: "Search or pick from the list.",
    assure: "We'll pass these details to our team — no separate valuation journey needed.",
  },
  "px-monthly-payment": {
    sectionIndex: 6,
    stepType: "form",
    title: "What's the current monthly payment?",
    help: "An estimate is fine if you're unsure.",
    assure: "We'll pass these details to our team — no separate valuation journey needed.",
  },
  "px-settlement": {
    sectionIndex: 6,
    stepType: "form",
    title: "Do you know the settlement figure?",
    help: "Don't worry if you don't know this yet. Our team can obtain it later.",
    assure: "We'll pass these details to our team — no separate valuation journey needed.",
  },
  "px-complete": {
    sectionIndex: 6,
    stepType: "form",
    title: "Thank you.",
    help: "We'll use these details to prepare your part exchange options.",
    assure: "Our team will confirm everything after reviewing your application.",
  },
  consent: {
    sectionIndex: 7,
    stepType: "confirm",
    title: "Review & submit",
    help: "Check your details, then submit for a soft search.",
  },
};

const WORKING_STATUSES = ["employed-full-time", "employed-part-time", "self-employed"];

export function needsEmployerInfo(data: ApplicationData): boolean {
  return WORKING_STATUSES.includes(data.employmentStatusFull);
}

export function isSelfEmployedStatus(status: string): boolean {
  return ["self-employed", "sole-trader", "company-director"].includes(status);
}

export function needsPrevAddressV2(data: ApplicationData): boolean {
  return needsPrevAddressFromTenure(data);
}

export function getV2Steps(data: ApplicationData): V2StepMeta[] {
  const steps: V2StepMeta[] = [];
  const add = (id: string) => {
    const m = STEP_META[id];
    if (m) steps.push({ id, ...m });
  };

  // Quick Start
  add("budget");
  add("credit-rating");
  add("deposit");
  add("part-exchange-choice");
  add("car-type");
  add("when");

  // Your Details (includes licence / ID)
  add("name");
  add("mobile");
  add("email");
  add("dob");
  add("joint-choice");
  add("licence");
  add("uk-passport");
  if (data.ukPassport === "no") {
    add("passport-country");
  }

  // Address
  add("address");
  add("address-duration");
  add("living");
  if (needsPrevAddressV2(data)) {
    add("previous-address");
    add("previous-address-duration");
  }

  // Employment
  add("employment");
  if (needsEmployerInfo(data)) {
    add("employer");
    add("job-title");
    const jobDurationMeta = STEP_META["job-duration"];
    if (jobDurationMeta) {
      const isSelfEmployed = isSelfEmployedStatus(data.employmentStatusFull);
      steps.push({
        id: "job-duration",
        ...jobDurationMeta,
        title: isSelfEmployed
          ? "How long have you been self-employed?"
          : jobDurationMeta.title,
        help: isSelfEmployed
          ? "Pick the option that best matches how long you've been running your business."
          : jobDurationMeta.help,
      });
    }
    if (needsPreviousEmployment(data)) {
      add("previous-employer");
      add("previous-job-title");
      add("previous-employment-start");
      add("previous-employment-end");
    }
  }

  // Finance Details
  add("income");
  add("other-income");

  // Joint Applicant — only when "With someone else"
  if (data.jointApplicant === true) {
    add("ja-intro");
    add("ja-name");
    add("ja-dob");
    add("ja-relationship");
    add("ja-address");
    add("ja-address-duration");
    if (needsJointPrevAddress(data)) {
      add("ja-previous-address");
      add("ja-previous-address-duration");
    }
    add("ja-living");
    add("ja-employment");
    if (needsJointEmployerInfo(data)) {
      add("ja-employer");
      add("ja-job-title");
      const jobDurationMeta = STEP_META["ja-job-duration"];
      if (jobDurationMeta) {
        const isSelfEmployed = isSelfEmployedStatus(data.jointEmploymentStatusFull);
        steps.push({
          id: "ja-job-duration",
          ...jobDurationMeta,
          title: isSelfEmployed
            ? "How long have they been self-employed?"
            : jobDurationMeta.title,
          help: isSelfEmployed
            ? "Pick the option that best matches how long they've been running their business."
            : jobDurationMeta.help,
        });
      }
      if (needsJointPreviousEmployment(data)) {
        add("ja-previous-employer");
        add("ja-previous-job-title");
        add("ja-previous-employment-start");
        add("ja-previous-employment-end");
      }
    }
    add("ja-income");
    add("ja-mobile");
    add("ja-email");
    add("ja-review");
  }

  // Part Exchange — only when flagged on the deposit screen
  if (data.hasPartExchange === "yes") {
    add("px-intro");
    add("px-registration");
    add("px-mileage");
    add("px-on-finance");
    if (data.hasFinanceToSettle === "yes") {
      add("px-lender");
      add("px-monthly-payment");
      add("px-settlement");
    }
    add("px-complete");
  }

  // Review
  add("consent");

  return steps;
}

export function formatTimeRemaining(stepsRemaining: number): string {
  if (stepsRemaining <= 0) return "Almost done";
  const seconds = stepsRemaining * AVG_SECONDS_PER_STEP;
  const minutes = Math.ceil(seconds / 60);
  if (minutes <= 1) return "About a minute remaining";
  return `About ${minutes} minutes remaining`;
}

/**
 * Continuous journey progress for the segmented rail.
 * `displayStepIndex` should be a high-water mark so the bar never jumps backwards
 * when the user revisits earlier screens.
 */
export function getJourneyProgress(
  steps: V2StepMeta[],
  currentStepIndex: number,
  displayStepIndex: number = currentStepIndex,
  options?: { loadingMode?: boolean },
): JourneyProgressState {
  if (options?.loadingMode) {
    return {
      sectionIndex: DECISION_SECTION_INDEX,
      sectionName: "Decision",
      segmentPct: 100,
      overallPct: 100,
      stepsRemaining: 0,
      timeRemainingLabel: "Almost done",
    };
  }

  const total = Math.max(steps.length, 1);
  const current = Math.min(Math.max(currentStepIndex, 0), total - 1);
  const display = Math.min(Math.max(displayStepIndex, current), total - 1);

  const displayStep = steps[display] ?? steps[0];
  const currentStep = steps[current] ?? steps[0];
  const sectionIndex = displayStep?.sectionIndex ?? 0;

  const sectionSteps = steps.filter((s) => s.sectionIndex === sectionIndex);
  const posInSection = sectionSteps.findIndex((s) => s.id === displayStep.id);
  const segmentPct =
    sectionSteps.length > 0
      ? Math.min(100, ((posInSection + 0.35) / sectionSteps.length) * 100)
      : 0;

  const stepsRemaining = Math.max(total - current - 1, 0);
  const overallPct = Math.min(100, Math.round(((display + 1) / (total + 1)) * 100));

  return {
    sectionIndex,
    sectionName: SECTIONS[sectionIndex]?.name ?? currentStep?.title ?? "Quick Start",
    segmentPct: Math.max(segmentPct, 8),
    overallPct,
    stepsRemaining,
    timeRemainingLabel: formatTimeRemaining(stepsRemaining),
  };
}

/** @deprecated Prefer getJourneyProgress — kept for call-site compatibility during refactor. */
export function getSectionRailProgress(
  steps: V2StepMeta[],
  stepIndex: number,
): { sectionIndex: number; segmentPct: number } {
  const progress = getJourneyProgress(steps, stepIndex, stepIndex);
  return { sectionIndex: progress.sectionIndex, segmentPct: progress.segmentPct };
}
