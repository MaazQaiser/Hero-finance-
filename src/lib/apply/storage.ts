import {
  type ApplicationData,
  type StepId,
  initialApplicationData,
} from "./types";

const STORAGE_KEY = "hero-apply-progress";

export interface SavedProgress {
  data: ApplicationData;
  stepId: StepId;
  savedAt: string;
}

export function loadProgress(): SavedProgress | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedProgress;
  } catch {
    return null;
  }
}

export function saveProgress(data: ApplicationData, stepId: StepId): void {
  if (typeof window === "undefined") return;

  const payload: SavedProgress = {
    data,
    stepId,
    savedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function clearProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getProgressAgeMs(): number | null {
  const saved = loadProgress();
  if (!saved) return null;
  return Date.now() - new Date(saved.savedAt).getTime();
}

export const SESSION_TIMEOUT_MS = 45 * 60 * 1000;

export function mergeInitialData(
  vehicleId?: string,
  resume?: boolean,
): ApplicationData {
  const base = { ...initialApplicationData };

  if (vehicleId) {
    base.vehicleId = vehicleId;
  }

  if (resume) {
    const saved = loadProgress();
    if (saved) return { ...base, ...saved.data };
  }

  return base;
}
