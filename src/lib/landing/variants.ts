import { type LandingVariant, type LandingVariantId } from "./types";

const defaultVariant: LandingVariant = {
  id: "default",
  introHeading: "Car finance and inspected stock, under one roof.",
  supportingCopy:
    "Check your eligibility with a soft search, browse AA-inspected vehicles, and get a decision in under a minute — all with one trusted team.",
  cta: "Check my eligibility",
  firstReassurance: "Soft search only · no impact on your credit file",
  applicationIntroHeading: "Every credit story deserves a fair hearing.",
  applicationSupportingCopy:
    "At Hero, we consider every credit story — not just a score. A few quick questions help us understand your situation before we run a soft search.",
  applicationCta: "Start my application",
};

const badCredit: LandingVariant = {
  id: "bad-credit",
  introHeading: "Bad credit? You could still get approved.",
  supportingCopy:
    "Your score isn't the whole story. We match you with lenders who look at your full circumstances — with real cars ready to reserve.",
  cta: "Check my options",
  firstReassurance: "Soft search only · your score stays protected",
  applicationIntroHeading: "Your score isn't the whole story.",
  applicationSupportingCopy:
    "We look at your full circumstances, not just a credit score. A few quick questions help us find finance that fits before we run a soft search.",
  applicationCta: "Start my application",
};

const refusedFinance: LandingVariant = {
  id: "refused-finance",
  introHeading: "Been refused finance? You could still drive away.",
  supportingCopy:
    "We consider every credit story. Unlike brokers, we've got real cars ready with decisions in under a minute and finance options tailored for you.",
  cta: "Check if I'm eligible",
  firstReassurance: "Refused elsewhere doesn't mean refused here",
  applicationIntroHeading: "We consider every credit story.",
  applicationSupportingCopy:
    "Being refused before doesn't define your options. A few quick questions help us understand your situation before we run a soft search.",
  applicationCta: "Start my application",
};

const selfEmployed: LandingVariant = {
  id: "self-employed",
  introHeading: "Self-employed? Finance built around how you earn.",
  supportingCopy:
    "We understand variable income. Get a soft-search decision in minutes and browse AA-inspected cars from our own stock.",
  cta: "Check my eligibility",
  firstReassurance: "Lenders who understand self-employed income",
  applicationIntroHeading: "We understand how you earn.",
  applicationSupportingCopy:
    "Self-employed income comes in many forms. A few quick questions help us match you with the right lenders before we run a soft search.",
  applicationCta: "Start my application",
};

const firstTimeBuyer: LandingVariant = {
  id: "first-time-buyer",
  introHeading: "First car on finance? We'll guide you through it.",
  supportingCopy:
    "No jargon, no pressure. Check your eligibility with a soft search and browse AA-inspected cars with clear monthly payments.",
  cta: "Check my eligibility",
  firstReassurance: "Soft search only · perfect for first-time buyers",
  applicationIntroHeading: "Your first step, made straightforward.",
  applicationSupportingCopy:
    "First-time finance doesn't have to be confusing. A few quick questions help us understand what you need before we run a soft search.",
  applicationCta: "Start my application",
};

const noDeposit: LandingVariant = {
  id: "no-deposit",
  introHeading: "No deposit? You could still drive away.",
  supportingCopy:
    "Deposit-free options may be available. Check your eligibility with a soft search and browse cars from our own forecourt.",
  cta: "Check no-deposit options",
  firstReassurance: "Deposit isn't always a barrier",
  applicationIntroHeading: "Deposit-free options may be available.",
  applicationSupportingCopy:
    "A deposit isn't always required. A few quick questions help us see what's possible before we run a soft search.",
  applicationCta: "Start my application",
};

const affordability: LandingVariant = {
  id: "affordability",
  introHeading: "Know your budget before you browse.",
  supportingCopy:
    "See what you could borrow with a soft search, then explore AA-inspected cars with clear monthly HP payments — no hidden fees.",
  cta: "See my budget",
  firstReassurance: "No admin fees · the price you see is the price you pay",
  applicationIntroHeading: "Know your numbers before you choose.",
  applicationSupportingCopy:
    "Understanding your budget makes car shopping easier. A few quick questions help us show what's affordable before we run a soft search.",
  applicationCta: "Check my budget",
};

/** Central campaign message map — add new variants here only. */
export const landingVariants: Record<LandingVariantId, LandingVariant> = {
  default: defaultVariant,
  "bad-credit": badCredit,
  "refused-finance": refusedFinance,
  "self-employed": selfEmployed,
  "first-time-buyer": firstTimeBuyer,
  "no-deposit": noDeposit,
  affordability,

  // Legacy campaign IDs → same content (stable PPC links)
  "refused-before": { ...refusedFinance, id: "refused-before" },
  "price-budget": { ...affordability, id: "price-budget" },
  benefits: {
    id: "benefits",
    introHeading: "On benefits or non-standard income? We can still help.",
    supportingCopy:
      "Non-standard income doesn't mean no options. We consider your full situation with a soft search and real cars ready to drive away.",
    cta: "See if I qualify",
    firstReassurance: "Soft search only · no impact on your credit file",
    applicationIntroHeading: "We assess affordability fairly.",
    applicationSupportingCopy:
      "Benefits and non-standard income are part of many customers' stories. A few quick questions help us understand yours before we run a soft search.",
    applicationCta: "Start my application",
  },
  "soft-search": {
    id: "soft-search",
    introHeading: "Check your eligibility — without touching your credit score.",
    supportingCopy:
      "A soft search gives you real finance options in under a minute. Browse AA-inspected stock from a dealer you can trust.",
    cta: "Run a soft search",
    firstReassurance: "Soft search only · zero impact on your credit file",
    applicationIntroHeading: "A soft search you can trust.",
    applicationSupportingCopy:
      "We'll only run a soft search — it won't affect your credit score. A few quick questions first help us understand your situation.",
    applicationCta: "Start my soft search",
  },
  "just-browsing": {
    id: "just-browsing",
    introHeading: "Just browsing? See what you could borrow first.",
    supportingCopy:
      "No pressure, no obligation. Check your budget with a soft search and explore AA-inspected cars when you're ready.",
    cta: "See what I could borrow",
    firstReassurance: "No obligation · soft search only",
    applicationIntroHeading: "Browse knowing your budget.",
    applicationSupportingCopy:
      "There's no obligation to proceed. A few quick questions help us show what you could borrow before we run a soft search.",
    applicationCta: "Check my budget",
  },
  "negative-equity": {
    id: "negative-equity",
    introHeading: "In negative equity? There may still be a way forward.",
    supportingCopy:
      "We help customers move on from existing finance. Check your options with a soft search and browse cars from our own stock.",
    cta: "Explore my options",
    firstReassurance: "Soft search only · confidential and secure",
    applicationIntroHeading: "We'll help you understand your position.",
    applicationSupportingCopy:
      "Negative equity doesn't have to stop you moving forward. A few quick questions help us see what's possible before we run a soft search.",
    applicationCta: "Start my application",
  },
  "new-to-uk": {
    id: "new-to-uk",
    introHeading: "New to the UK? Car finance is still possible.",
    supportingCopy:
      "Limited UK credit history isn't a dead end. We consider your full circumstances with a soft search and real cars ready to reserve.",
    cta: "Check my eligibility",
    firstReassurance: "Soft search only · no impact on your credit file",
    applicationIntroHeading: "Limited UK history? We still consider you.",
    applicationSupportingCopy:
      "Being new to the UK doesn't mean no options. A few quick questions help us understand your situation before we run a soft search.",
    applicationCta: "Start my application",
  },
  "fast-decision": {
    id: "fast-decision",
    introHeading: "Need a fast decision? Get an answer in under a minute.",
    supportingCopy:
      "Our soft search takes seconds, not days. Browse AA-inspected cars and reserve the one you want — all with one team.",
    cta: "Get a fast decision",
    firstReassurance: "Decision in under 60 seconds · soft search only",
    applicationIntroHeading: "A fast decision starts here.",
    applicationSupportingCopy:
      "Most applications take around 60 seconds. A few quick questions help us run your soft search straight away.",
    applicationCta: "Get my decision",
  },
};

export function getLandingVariant(id: LandingVariantId): LandingVariant {
  return landingVariants[id] ?? defaultVariant;
}
