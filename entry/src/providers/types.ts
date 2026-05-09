import type { DailyWord, DictionarySource } from "../types/dailyWord";

/**
 * Every dictionary provider must follow this same shape.
 *
 * This lets the rest of the app treat Wordnik, Merriam-Webster,
 * and Oxford the same way, even though their APIs are different.
 */
export type DailyWordProvider = {
  /**
   * Internal source ID.
   */
  source: DictionarySource;

  /**
   * Pretty display name.
   */
  sourceDisplayName: string;

  /**
   * Fetches or creates today's word for this provider.
   *
   * Later, this will call the real API.
   * For now, our mock providers will return hardcoded DailyWord objects.
   */
  getDailyWord: () => Promise<DailyWord>;
};