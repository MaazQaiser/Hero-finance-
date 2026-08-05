import { type ApplicationData } from "@/lib/apply/types";

export type SectionTone = "warm" | "calm";
export type StepType = "choice" | "form" | "address" | "confirm";

export interface SectionConfig {
  name: string;
  tone: SectionTone;
  title: string;
  desc: string;
  assure: string;
  tint: string;
}

export interface V2StepMeta {
  id: string;
  sectionIndex: number;
  stepType: StepType;
  title: string;
  help?: string;
}

export const SECTIONS: SectionConfig[] = [
  {
    name: "Quick questions",
    tone: "warm",
    title: "Four quick questions",
    desc: "No personal details yet. Just enough to know what we're looking for.",
    assure: "Soft search only. No impact on your credit score.",
    tint: "#EFF7F1",
  },
  {
    name: "Your details",
    tone: "warm",
    title: "Now a bit about you",
    desc: "So we can send your decision and save your progress.",
    assure: "FCA regulated dealer. Your details stay with us.",
    tint: "#F2F7F3",
  },
  {
    name: "Your licence",
    tone: "warm",
    title: "Your licence",
    desc: "A couple of quick questions. Lenders need to know what you hold.",
    assure: "FCA regulated dealer. Your details stay with us.",
    tint: "#F2F7F3",
  },
  {
    name: "Your address",
    tone: "calm",
    title: "Where you live",
    desc: "Lenders need three years of address history.",
    assure: "Encrypted and used only for your application.",
    tint: "#FFFFFF",
  },
  {
    name: "Work and income",
    tone: "calm",
    title: "Work and income",
    desc: "Used only to check what you can comfortably afford.",
    assure: "Used only to check what you can comfortably afford.",
    tint: "#FFFFFF",
  },
  {
    name: "Confirm",
    tone: "calm",
    title: "Last step",
    desc: "Two confirmations, then we check your options.",
    assure: "Soft search only. No impact on your credit score.",
    tint: "#FAFCFA",
  },
];

const STEP_META: Record<string, { title: string; help?: string; stepType: StepType; sectionIndex: number }> = {
  budget: {
    sectionIndex: 0, stepType: "choice",
    title: "What monthly payment are you after?",
    help: "A rough figure is fine. We'll fine-tune it once you pick a car.",
  },
  deposit: {
    sectionIndex: 0, stepType: "choice",
    title: "How much deposit do you have?",
    help: "A deposit lowers your monthly payment and widens your options. None is fine too.",
  },
  "car-type": {
    sectionIndex: 0, stepType: "choice",
    title: "What kind of car do you need?",
  },
  "credit-rating": {
    sectionIndex: 0, stepType: "choice",
    title: "How would you rate your credit?",
    help: "Be honest. We work with lenders across every credit profile.",
  },
  when: {
    sectionIndex: 0, stepType: "choice",
    title: "When do you need it?",
  },
  name: {
    sectionIndex: 1, stepType: "form",
    title: "First, your name.",
    help: "As it appears on your driving licence.",
  },
  mobile: {
    sectionIndex: 1, stepType: "form",
    title: "Your mobile number.",
    help: "We text your decision and a link to pick up where you left off.",
  },
  email: {
    sectionIndex: 1, stepType: "form",
    title: "And your email.",
    help: "Your decision and finance documents are sent here.",
  },
  dob: {
    sectionIndex: 1, stepType: "form",
    title: "Your date of birth.",
    help: "You must be 18 or over to apply.",
  },
  "joint-choice": {
    sectionIndex: 1, stepType: "choice",
    title: "Applying on your own?",
    help: "A second applicant can improve the options available to you.",
  },
  licence: {
    sectionIndex: 2, stepType: "choice",
    title: "What licence do you hold?",
  },
  "uk-passport": {
    sectionIndex: 2, stepType: "choice",
    title: "Do you have a UK passport?",
    help: "Lenders may ask for this as part of identity checks later.",
  },
  address: {
    sectionIndex: 3, stepType: "address",
    title: "Where do you live?",
    help: "Enter your postcode, then pick your address.",
  },
  "address-duration": {
    sectionIndex: 3, stepType: "choice",
    title: "How long have you lived there?",
  },
  living: {
    sectionIndex: 3, stepType: "choice",
    title: "What's your situation there?",
  },
  "previous-address": {
    sectionIndex: 3, stepType: "address",
    title: "Your previous address?",
    help: "Lenders need three years of history.",
  },
  "previous-address-duration": {
    sectionIndex: 3, stepType: "choice",
    title: "How long did you live there?",
  },
  employment: {
    sectionIndex: 4, stepType: "choice",
    title: "What's your employment status?",
  },
  employer: {
    sectionIndex: 4, stepType: "form",
    title: "Where do you work?",
  },
  "job-duration": {
    sectionIndex: 4, stepType: "choice",
    title: "How long have you worked there?",
  },
  income: {
    sectionIndex: 4, stepType: "form",
    title: "Your monthly income.",
    help: "Before tax. Include regular second income.",
  },
  consent: {
    sectionIndex: 5, stepType: "confirm",
    title: "Ready to check your options.",
    help: "This is a soft search. It will not affect your credit score.",
  },
};

const WORKING_STATUSES = ["employed-full-time", "employed-part-time", "self-employed"];

export function needsEmployerInfo(data: ApplicationData): boolean {
  return WORKING_STATUSES.includes(data.employmentStatusFull);
}

export function needsPrevAddressV2(data: ApplicationData): boolean {
  if (data.addressTenure) {
    return ["Under 6 months", "6 to 12 months", "1 to 2 years", "2 to 3 years"].includes(
      data.addressTenure,
    );
  }
  return ["less-than-1-year", "1-2-years", "2-3-years"].includes(data.yearsAtAddress);
}

export function getV2Steps(data: ApplicationData): V2StepMeta[] {
  const steps: V2StepMeta[] = [];
  const add = (id: string) => {
    const m = STEP_META[id];
    if (m) steps.push({ id, ...m });
  };

  // Section 0 — Quick questions
  add("budget");
  add("deposit");
  add("car-type");
  add("credit-rating");
  add("when");

  // Section 1 — Your details
  add("name");
  add("mobile");
  add("email");
  add("dob");
  add("joint-choice");

  // Section 2 — Licence / ID
  add("licence");
  add("uk-passport");

  // Section 3 — Address
  add("address");
  add("address-duration");
  add("living");
  if (needsPrevAddressV2(data)) {
    add("previous-address");
    add("previous-address-duration");
  }

  // Section 4 — Work & income
  add("employment");
  if (needsEmployerInfo(data)) {
    add("employer");
    add("job-duration");
  }
  add("income");

  // Section 5 — Confirm
  add("consent");

  return steps;
}

export function getSectionRailProgress(
  steps: V2StepMeta[],
  stepIndex: number,
): { sectionIndex: number; segmentPct: number } {
  const step = steps[stepIndex];
  if (!step) return { sectionIndex: 0, segmentPct: 0 };

  const sectionSteps = steps.filter((s) => s.sectionIndex === step.sectionIndex);
  const posInSection = sectionSteps.findIndex((s) => s.id === step.id);
  const pct = sectionSteps.length > 0 ? (posInSection / sectionSteps.length) * 100 : 0;

  return { sectionIndex: step.sectionIndex, segmentPct: Math.max(pct, 6) };
}
