import { type StepId } from "./types";

export const stepMeta: Record<
  StepId,
  { title: string; helper: string; encouragement?: string }
> = {
  "basic-details": {
    title: "Let's start with your details",
    helper: "This only takes a couple of minutes — we'll guide you through each step.",
    encouragement: "You're doing great already.",
  },
  email: {
    title: "Where should we send updates?",
    helper: "We'll keep you posted on your application progress.",
  },
  dob: {
    title: "What's your date of birth?",
    helper: "We need this to confirm you're eligible for finance.",
  },
  address: {
    title: "Where do you live?",
    helper: "Start with your postcode and we'll find your address.",
  },
  residential: {
    title: "What's your current living situation?",
    helper: "This helps us understand your circumstances.",
  },
  employment: {
    title: "What's your employment status?",
    helper: "Don't worry — we work with employed and self-employed applicants.",
  },
  income: {
    title: "Tell us about your income",
    helper: "We only use this to check affordability. It's kept secure.",
  },
  "address-history": {
    title: "Have you lived elsewhere recently?",
    helper: "We need your previous address for a complete application.",
  },
  licence: {
    title: "Do you hold a valid driving licence?",
    helper: "This helps us match you with the right finance options.",
  },
  vehicle: {
    title: "Do you have a car in mind?",
    helper: "No pressure — you can browse our stock later if you're unsure.",
  },
  joint: {
    title: "Would you like to apply with someone else?",
    helper: "A joint application can sometimes improve your options.",
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
