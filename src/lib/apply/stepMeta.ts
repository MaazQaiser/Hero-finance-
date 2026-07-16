import { type StepId } from "./types";

export const stepMeta: Record<
  StepId,
  { title: string; helper: string; encouragement?: string }
> = {
  residential: {
    title: "What's your current living situation?",
    helper: "This helps lenders understand your circumstances.",
  },
  employment: {
    title: "What's your employment status?",
    helper: "We support employed and self-employed applicants.",
  },
  licence: {
    title: "Do you hold a valid driving licence?",
    helper: "Select the option that best describes your licence today.",
  },
  "joint-choice": {
    title: "Would you like to apply with someone else?",
    helper: "A joint application can sometimes improve your options.",
  },
  mobile: {
    title: "What's your mobile number?",
    helper: "We'll text your result and save your progress securely.",
  },
  email: {
    title: "Where should we send updates?",
    helper: "Optional — helpful if you'd like a resume link later.",
  },
  dob: {
    title: "What's your date of birth?",
    helper: "You must be 18 or over to apply for finance.",
  },
  "employment-duration": {
    title: "How long have you been with your current employer?",
    helper: "Choose the option closest to your time in role.",
  },
  "previous-employer": {
    title: "Who was your previous employer?",
    helper: "A recent employer name helps lenders assess your history.",
  },
  "previous-employment-duration": {
    title: "How long were you with your previous employer?",
    helper: "Select the closest match to your time there.",
  },
  address: {
    title: "Where do you live?",
    helper: "Enter your postcode, then select your address from the list.",
  },
  "address-duration": {
    title: "How long have you lived at your current address?",
    helper: "Lenders use this to understand your residential history.",
  },
  "previous-address": {
    title: "Where did you live before?",
    helper: "Enter your previous postcode and select your address.",
  },
  income: {
    title: "Tell us about your income",
    helper: "Used only to assess affordability.",
  },
  vehicle: {
    title: "Do you have a car in mind?",
    helper: "No pressure — you can browse our stock after you're approved.",
  },
  joint: {
    title: "Joint applicant details",
    helper: "Please add their details to continue.",
  },
  consent: {
    title: "Almost there — just a few confirmations",
    helper: "No impact on your credit score.",
  },
  review: {
    title: "Review your application",
    helper: "Check everything looks right before we run your soft search.",
    encouragement: "You're almost done.",
  },
};

/** Steps that should auto-focus the first text input */
export const stepsWithAutofocus: StepId[] = [
  "mobile",
  "email",
  "dob",
  "previous-employer",
  "address",
  "previous-address",
  "income",
  "joint",
];

export function stepHasAutofocus(stepId: StepId): boolean {
  return stepsWithAutofocus.includes(stepId);
}
