import { type LandingVariant, type LandingVariantId } from "./types";

const defaultVariant: LandingVariant = {
  id: "default",
  headline: "Car finance and inspected stock, under one roof.",
  subtitle:
    "Check your eligibility with a soft search, browse AA-inspected vehicles, and get a decision in under a minute — all with one trusted team.",
  cta: "Check my eligibility",
  trustMessage: "Soft search only · no impact on your credit file",
  cardIntroHeadline: "Check your eligibility in minutes",
  cardIntroBody: "A few quick questions, then a soft search that won't affect your credit score.",
  reassuranceHeadline: "Check without hurting your score",
  reassuranceBody: "Our soft search gives you a clear picture before any commitment.",
  applicationHeadline: "Every credit story deserves a fair hearing.",
  applicationBody:
    "At Hero, we consider every credit story — not just a score. A few quick questions help us understand your situation before we run a soft search.",
  applicationCta: "Start my application",
};

export const landingVariants: Record<LandingVariantId, LandingVariant> = {
  default: defaultVariant,
  "refused-before": {
    id: "refused-before",
    headline: "Been refused before? You could still drive away.",
    subtitle:
      "We consider every credit story. Unlike brokers, we've got real cars ready with decisions in under a minute with finance options tailored for you.",
    cta: "Check if I'm eligible",
    trustMessage: "Soft search only · no impact on your credit file",
    cardIntroHeadline: "See where you stand today",
    cardIntroBody: "A quick soft search won't affect your credit score — and could open new options.",
    reassuranceHeadline: "Refused elsewhere doesn't mean refused here",
    reassuranceBody: "We work with a panel of lenders who consider more than a single score.",
    applicationHeadline: "We consider every credit story.",
    applicationBody:
      "Being refused before doesn't define your options. A few quick questions help us understand your situation before we run a soft search.",
    applicationCta: "Start my application",
  },
  "bad-credit": {
    id: "bad-credit",
    headline: "Bad credit? You could still get approved.",
    subtitle:
      "Your score isn't the whole story. We match you with lenders who look at your full circumstances — with real cars ready to reserve.",
    cta: "Check my options",
    trustMessage: "Soft search only · your score stays protected",
    cardIntroHeadline: "Find out where you stand",
    cardIntroBody: "A soft search shows your options without leaving a mark on your credit file.",
    reassuranceHeadline: "More than a number on a report",
    reassuranceBody: "Lenders on our panel assess affordability and circumstances — not just a score.",
    applicationHeadline: "Your score isn't the whole story.",
    applicationBody:
      "We look at your full circumstances, not just a credit score. A few quick questions help us find finance that fits before we run a soft search.",
    applicationCta: "Start my application",
  },
  "self-employed": {
    id: "self-employed",
    headline: "Self-employed? Finance built around how you earn.",
    subtitle:
      "We understand variable income. Get a soft-search decision in minutes and browse AA-inspected cars from our own stock.",
    cta: "Check my eligibility",
    trustMessage: "Soft search only · no impact on your credit file",
    cardIntroHeadline: "Finance that fits self-employed life",
    cardIntroBody: "Tell us how you earn — we'll match you with lenders who understand your situation.",
    reassuranceHeadline: "Income that doesn't fit a payslip",
    reassuranceBody: "We work with lenders experienced in self-employed and contractor applications.",
    applicationHeadline: "We understand how you earn.",
    applicationBody:
      "Self-employed income comes in many forms. A few quick questions help us match you with the right lenders before we run a soft search.",
    applicationCta: "Start my application",
  },
  benefits: {
    id: "benefits",
    headline: "On benefits or non-standard income? We can still help.",
    subtitle:
      "Non-standard income doesn't mean no options. We consider your full situation with a soft search and real cars ready to drive away.",
    cta: "See if I qualify",
    trustMessage: "Soft search only · no impact on your credit file",
    cardIntroHeadline: "Every situation is different",
    cardIntroBody: "We assess affordability fairly — a soft search won't affect your credit score.",
    reassuranceHeadline: "Income comes in many forms",
    reassuranceBody: "Our lenders consider benefits and non-standard income as part of your application.",
    applicationHeadline: "We assess affordability fairly.",
    applicationBody:
      "Benefits and non-standard income are part of many customers' stories. A few quick questions help us understand yours before we run a soft search.",
    applicationCta: "Start my application",
  },
  "first-time-buyer": {
    id: "first-time-buyer",
    headline: "First car on finance? We'll guide you through it.",
    subtitle:
      "No jargon, no pressure. Check your eligibility with a soft search and browse AA-inspected cars with clear monthly payments.",
    cta: "Check my eligibility",
    trustMessage: "Soft search only · perfect for first-time buyers",
    cardIntroHeadline: "Your first finance application, made simple",
    cardIntroBody: "A few straightforward questions — then a soft search that won't touch your credit score.",
    reassuranceHeadline: "Clear steps from check to keys",
    reassuranceBody: "One team handles finance, stock, and delivery — so you're never passed between brokers.",
    applicationHeadline: "Your first step, made straightforward.",
    applicationBody:
      "First-time finance doesn't have to be confusing. A few quick questions help us understand what you need before we run a soft search.",
    applicationCta: "Start my application",
  },
  "soft-search": {
    id: "soft-search",
    headline: "Check your eligibility — without touching your credit score.",
    subtitle:
      "A soft search gives you real finance options in under a minute. Browse AA-inspected stock from a dealer you can trust.",
    cta: "Run a soft search",
    trustMessage: "Soft search only · zero impact on your credit file",
    cardIntroHeadline: "See your options in minutes",
    cardIntroBody: "A soft search shows what you could borrow — with no mark left on your credit file.",
    reassuranceHeadline: "Check without hurting your score",
    reassuranceBody: "Soft searches are invisible to other lenders and won't affect future applications.",
    applicationHeadline: "A soft search you can trust.",
    applicationBody:
      "We'll only run a soft search — it won't affect your credit score. A few quick questions first help us understand your situation.",
    applicationCta: "Start my soft search",
  },
  "just-browsing": {
    id: "just-browsing",
    headline: "Just browsing? See what you could borrow first.",
    subtitle:
      "No pressure, no obligation. Check your budget with a soft search and explore AA-inspected cars when you're ready.",
    cta: "See what I could borrow",
    trustMessage: "No obligation · soft search only",
    cardIntroHeadline: "Browse with a budget in mind",
    cardIntroBody: "Know your numbers before you fall in love with a car — takes around 60 seconds.",
    reassuranceHeadline: "No pressure, no hard search",
    reassuranceBody: "Check your options now and browse our stock at your own pace.",
    applicationHeadline: "Browse knowing your budget.",
    applicationBody:
      "There's no obligation to proceed. A few quick questions help us show what you could borrow before we run a soft search.",
    applicationCta: "Check my budget",
  },
  "no-deposit": {
    id: "no-deposit",
    headline: "No deposit? You could still drive away.",
    subtitle:
      "Deposit-free options may be available. Check your eligibility with a soft search and browse cars from our own forecourt.",
    cta: "Check no-deposit options",
    trustMessage: "Soft search only · no impact on your credit file",
    cardIntroHeadline: "See if zero deposit works for you",
    cardIntroBody: "A soft search shows what's available — without affecting your credit score.",
    reassuranceHeadline: "Deposit isn't always a barrier",
    reassuranceBody: "We work with lenders offering a range of deposit options, including zero deposit.",
    applicationHeadline: "Deposit-free options may be available.",
    applicationBody:
      "A deposit isn't always required. A few quick questions help us see what's possible before we run a soft search.",
    applicationCta: "Start my application",
  },
  "negative-equity": {
    id: "negative-equity",
    headline: "In negative equity? There may still be a way forward.",
    subtitle:
      "We help customers move on from existing finance. Check your options with a soft search and browse cars from our own stock.",
    cta: "Explore my options",
    trustMessage: "Soft search only · confidential and secure",
    cardIntroHeadline: "Understand your position first",
    cardIntroBody: "A soft search helps clarify what's possible — with no impact on your credit file.",
    reassuranceHeadline: "Moving on is possible",
    reassuranceBody: "Our team handles part-exchange and negative equity scenarios every week.",
    applicationHeadline: "We'll help you understand your position.",
    applicationBody:
      "Negative equity doesn't have to stop you moving forward. A few quick questions help us see what's possible before we run a soft search.",
    applicationCta: "Start my application",
  },
  "new-to-uk": {
    id: "new-to-uk",
    headline: "New to the UK? Car finance is still possible.",
    subtitle:
      "Limited UK credit history isn't a dead end. We consider your full circumstances with a soft search and real cars ready to reserve.",
    cta: "Check my eligibility",
    trustMessage: "Soft search only · no impact on your credit file",
    cardIntroHeadline: "Finance for new UK residents",
    cardIntroBody: "We work with lenders who understand limited UK credit history — soft search only.",
    reassuranceHeadline: "Limited history, real options",
    reassuranceBody: "International credit and UK circumstances are considered by lenders on our panel.",
    applicationHeadline: "Limited UK history? We still consider you.",
    applicationBody:
      "Being new to the UK doesn't mean no options. A few quick questions help us understand your situation before we run a soft search.",
    applicationCta: "Start my application",
  },
  "fast-decision": {
    id: "fast-decision",
    headline: "Need a fast decision? Get an answer in under a minute.",
    subtitle:
      "Our soft search takes seconds, not days. Browse AA-inspected cars and reserve the one you want — all with one team.",
    cta: "Get a fast decision",
    trustMessage: "Decision in under 60 seconds · soft search only",
    cardIntroHeadline: "Your answer in under a minute",
    cardIntroBody: "A few quick questions, then an instant soft-search decision — no credit score impact.",
    reassuranceHeadline: "Minutes, not days",
    reassuranceBody: "Most customers get a clear answer in under 60 seconds with no hard search.",
    applicationHeadline: "A fast decision starts here.",
    applicationBody:
      "Most applications take around 60 seconds. A few quick questions help us run your soft search straight away.",
    applicationCta: "Get my decision",
  },
  "price-budget": {
    id: "price-budget",
    headline: "Know your budget before you browse.",
    subtitle:
      "See what you could borrow with a soft search, then explore AA-inspected cars with clear monthly HP payments — no hidden fees.",
    cta: "See my budget",
    trustMessage: "No admin fees · soft search only",
    cardIntroHeadline: "Your budget, in under a minute",
    cardIntroBody: "Find out what you could borrow monthly — soft search only, no credit score impact.",
    reassuranceHeadline: "The price you see is the price you pay",
    reassuranceBody: "Clear monthly payments on AA-inspected stock with no admin fees.",
    applicationHeadline: "Know your numbers before you choose.",
    applicationBody:
      "Understanding your budget makes car shopping easier. A few quick questions help us show what's affordable before we run a soft search.",
    applicationCta: "Check my budget",
  },
};

export function getLandingVariant(id: LandingVariantId): LandingVariant {
  return landingVariants[id] ?? defaultVariant;
}
