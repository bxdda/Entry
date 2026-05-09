import type { DailyWord } from "../types/dailyWord";
import type { DailyWordProvider } from "../providers/types";
import { dailyWordProviders } from "../providers";
import { getTodayDateString } from "./dateService";
import {
  clearDailyWordCache,
  readDailyWordCache,
  writeDailyWordCache,
} from "./cacheService";

/**
 * Gets today's words.
 *
 * Flow:
 * 1. Check local cache.
 * 2. If today's words are cached, return them.
 * 3. Otherwise ask every provider for today's word.
 * 4. Save the provider results to cache.
 * 5. Return the loaded words.
 */
export async function getTodayWords(): Promise<DailyWord[]> {
  const today = getTodayDateString();

  const cachedWords = readDailyWordCache(today);

  if (cachedWords) {
    return cachedWords;
  }

  const words = await Promise.all(
    dailyWordProviders.map((provider: DailyWordProvider) => {
      return provider.getDailyWord();
    })
  );

  writeDailyWordCache(today, words);

  return words;
}

/**
 * Forces a refresh by clearing cache first,
 * then loading today's words again.
 */
export async function refreshTodayWords(): Promise<DailyWord[]> {
  clearDailyWordCache();
  return getTodayWords();
}