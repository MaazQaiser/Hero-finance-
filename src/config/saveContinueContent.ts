/**
 * Save & Continue / Resume copy — frontend prototype only.
 */

export const saveContinueContent = {
  modal: {
    title: "Your progress has been saved",
    description: "We'll text you a secure link so you can continue anytime.",
    checklist: [
      "Your information is secure",
      "Continue on any device",
      "No need to start again",
    ],
    primaryCta: "Keep going",
    secondaryCta: "I'll continue later",
    footerNote: "No pressure. Continue whenever you're ready.",
  },

  resume: {
    title: "Continue Your Application",
    subtitle:
      "Pick up exactly where you left off. Your answers are waiting for you.",
    progressLabel: "Application Progress",
    primaryCta: "Resume Application",
    secondaryCta: "Start Again",
    footerNote: "Your progress is securely saved. We'll pick up exactly where you stopped.",
  },

  empty: {
    title: "No saved application found.",
    description: "Start a new application.",
    cta: "Start a new application",
  },

  backNavigation: [
    "Your previous answers have been saved.",
    "Going back won't remove your progress.",
  ],
};
