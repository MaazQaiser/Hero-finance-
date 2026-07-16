/**
 * Save & Continue / Resume copy — frontend prototype only.
 */

export const saveContinueContent = {
  modal: {
    title: "Progress Saved",
    description:
      "Your application has been securely saved. You can return anytime and continue exactly where you left off.",
    checklist: [
      "Your information is secure",
      "Continue on any device",
      "No need to start again",
      "Returning only takes a few minutes",
    ],
    primaryCta: "Continue Later",
    secondaryCta: "Return to Application",
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
