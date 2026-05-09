import type { DailyWord } from "../types/dailyWord";

/**
 * The shape of the daily word cache.
 */
type DailyWordCache = {
  date: string;
  words: DailyWord[];
};

/**
 * localStorage key used by this app.
 *
 * Keeping it as a constant helps avoid typo bugs.
 */
const DAILY_WORD_CACHE_KEY = "daily-entry:daily-words";

/**
 * Reads the cached words for a specific date.
 *
 * If there is no cache, bad JSON, or the date does not match,
 * this returns null.
 */
export function readDailyWordCache(date: string): DailyWord[] | null {
  const cachedText = localStorage.getItem(DAILY_WORD_CACHE_KEY);

  if (!cachedText) {
    return null;
  }

  try {
    const cache = JSON.parse(cachedText) as DailyWordCache;

    if (cache.date !== date) {
      return null;
    }

    return cache.words;
  } catch {
    /**
     * If the cache somehow becomes invalid/corrupt,
     * remove it so it does not keep breaking future loads.
     */
    localStorage.removeItem(DAILY_WORD_CACHE_KEY);
    return null;
  }
}

/**
 * Saves today's words to localStorage.
 */
export function writeDailyWordCache(date: string, words: DailyWord[]): void {
  const cache: DailyWordCache = {
    date,
    words,
  };

  localStorage.setItem(DAILY_WORD_CACHE_KEY, JSON.stringify(cache));
}

/**
 * Clears the cached words.
 *
 * Useful later for a manual refresh button.
 */
export function clearDailyWordCache(): void {
  localStorage.removeItem(DAILY_WORD_CACHE_KEY);
}