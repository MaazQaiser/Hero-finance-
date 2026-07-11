import { type StepId } from "./types";

export const stepMeta: Record<
  StepId,
  { title: string; helper: string; encouragement?: string }
> = {
  residential: {
    title: "What's your current living situation?",
    helper: "This helps us understand your circumstances.",
  },
  employment: {
    title: "What's your employment status?",
    helper: "Don't worry — we work with employed and self-employed applicants.",
  },
  licence: {
    title: "Do you hold a valid driving licence?",
    helper: "This helps us match you with the right finance options.",
  },
  "joint-choice": {
    title: "Would you like to apply with someone else?",
    helper: "A joint application can sometimes improve your options.",
  },
  mobile: {
    title: "What's your mobile number?",
    helper: "We'll text your result and save your progress.",
  },
  email: {
    title: "Where should we send updates?",
    helper: "We'll keep you posted on your application progress.",
  },
  dob: {
    title: "What's your date of birth?",
    helper: "We need this to confirm you're eligible for finance.",
  },
  "employment-duration": {
    title: "How long have you been with your current employer?",
    helper: "This helps lenders understand your employment history.",
  },
  "previous-employer": {
    title: "Who was your previous employer?",
    helper: "We need a little more about your recent employment.",
  },
  "previous-employment-duration": {
    title: "How long were you with your previous employer?",
    helper: "Select the closest match to your time there.",
  },
  address: {
    title: "Where do you live?",
    helper: "Enter your postcode and select your address.",
  },
  "address-duration": {
    title: "How long have you lived at your current address?",
    helper: "Lenders use this to understand your residential history.",
  },
  "previous-address": {
    title: "Where did you live before?",
    helper: "Enter your postcode and select your previous address.",
  },
  income: {
    title: "Tell us about your income",
    helper: "We only use this to check affordability. It's kept secure.",
  },
  vehicle: {
    title: "Do you have a car in mind?",
    helper: "No pressure — you can browse our stock later if you're unsure.",
  },
  joint: {
    title: "Joint applicant details",
    helper: "Please add their details to continue.",
  },
  consent: {
    title: "Almost there — just a few confirmations",
    helper: "Please review and accept to continue.",
  },
  review: {
    title: "Review your application",
    helper: "Check everything looks right before we run your soft search.",
  },
};
