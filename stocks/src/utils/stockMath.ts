import { ScheduleChange } from "../types";

export function getScheduleValue(
  currentTime: Date,
  change: ScheduleChange
): number | undefined {
  const endTime = new Date(change.endTime);
  if (currentTime > endTime) {
    return undefined; // Current time is outside the change period
  }
  const totalMs = endTime.getTime() - currentTime.getTime();
  const elapsedMs = currentTime.getTime() - currentTime.getTime();
  const progress = elapsedMs / totalMs;
  return change.fromValue + (change.toValue - change.fromValue) * progress;
}

export function addNoise(value: number, noise: number): number {
  const noiseFactor = 1 + (Math.random() * 0.04 - 0.02); // Random factor between 0.98 and 1.02
  return Math.round(value * noiseFactor);
}
