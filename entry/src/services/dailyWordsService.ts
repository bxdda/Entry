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
 * Builds a safe fallback DailyWord when a provider fails.
 *
 * This lets the UI still show a card for that source instead of
 * crashing or hiding the entire widget.
 */
function createProviderErrorWord(
  provider: DailyWordProvider,
  errorMessage: string
): DailyWord {
  const today = getTodayDateString();

  return {
    source: provider.source,
    sourceDisplayName: provider.sourceDisplayName,
    word: "Unavailable",
    date: today,

    shortDefinition: `${provider.sourceDisplayName} could not be loaded right now.`,
    fullDefinition: undefined,
    definitions: [`${provider.sourceDisplayName} could not be loaded right now.`],

    partOfSpeech: undefined,
    pronunciation: undefined,
    ipa: undefined,
    audioUrl: undefined,

    example: undefined,
    examples: [],

    synonyms: [],
    antonyms: [],
    relatedWords: [],

    etymology: undefined,
    syllables: [],
    labels: ["error"],

    difficulty: undefined,
    sourceUrl: undefined,

    fetchedAt: new Date().toISOString(),
    status: "error",
    errorMessage,

    raw: undefined,
  };
}

/**
 * Safely loads one provider.
 *
 * If the provider succeeds, we return its DailyWord.
 * If it fails, we return a fallback DailyWord instead.
 */
async function getProviderWordSafely(
  provider: DailyWordProvider
): Promise<DailyWord> {
  try {
    return await provider.getDailyWord();
  } catch (unknownError) {
    if (unknownError instanceof Error) {
      return createProviderErrorWord(provider, unknownError.message);
    }

    return createProviderErrorWord(
      provider,
      "Unknown provider error."
    );
  }
}

/**
 * Gets today's words.
 *
 * Flow:
 * 1. Check local cache.
 * 2. If today's words are cached, return them.
 * 3. Otherwise ask every provider for today's word.
 * 4. If a provider fails, create an error card for that provider.
 * 5. Save the results to cache.
 * 6. Return the loaded words.
 */
export async function getTodayWords(): Promise<DailyWord[]> {
  const today = getTodayDateString();

  const cachedWords = readDailyWordCache(today);

  if (cachedWords) {
    return cachedWords;
  }

  const words = await Promise.all(
    dailyWordProviders.map((provider: DailyWordProvider) => {
      return getProviderWordSafely(provider);
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