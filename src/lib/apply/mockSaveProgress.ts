/**
 * Frontend prototype mock data for Save & Continue / Resume UX.
 * No backend persistence beyond local demo behaviour.
 */

export interface MockSavedApplication {
  hasSavedApplication: boolean;
  completedSteps: number;
  totalSteps: number;
  progressPercent: number;
  estimatedMinutesRemaining: number;
  lastSavedLabel: string;
}

/** Toggle for empty-state demos in the design prototype */
export const MOCK_HAS_SAVED_APPLICATION = true;

export const mockSavedApplication: MockSavedApplication = {
  hasSavedApplication: MOCK_HAS_SAVED_APPLICATION,
  completedSteps: 8,
  totalSteps: 19,
  progressPercent: 42,
  estimatedMinutesRemaining: 3,
  lastSavedLabel: "Today at 3:15 PM",
};
