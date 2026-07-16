export function getProgressHint(stepNumber: number, totalSteps: number): string | null {
  if (totalSteps <= 1) return null;

  const ratio = stepNumber / totalSteps;

  if (stepNumber <= 2) return "You're off to a good start.";
  if (ratio < 0.4) return "You're making good progress.";
  if (ratio < 0.55) return "You're almost halfway there.";
  if (ratio < 0.85) return "Only a few questions left.";
  return "Nearly there — you're doing great.";
}
