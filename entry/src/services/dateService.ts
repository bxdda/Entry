/**
 * Returns today's local date as YYYY-MM-DD.
 *
 * We use this as the cache key so the app knows whether
 * stored daily words belong to today or an older day.
 */
export function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}