import { useEffect, useMemo, useState } from "react";
import type { DailyWord } from "../types/dailyWord";
import { getTodayWords, refreshTodayWords } from "../services/dailyWordsService";
/**
 * Custom React hook that owns the daily-word loading state.
 *
 * In React, hooks are a common way to package reusable stateful logic.
 *
 * This hook answers questions like:
 * - Are the words loading?
 * - Did something fail?
 * - What word is currently selected?
 * - How do we move to the next/previous word?
 */
export function useDailyWords() {
  /**
   * All words loaded from the providers.
   *
   * Starts as an empty array because the data has not loaded yet.
   */
  const [words, setWords] = useState<DailyWord[]>([]);

  /**
   * Which word card is currently selected.
   *
   * 0 = first word
   * 1 = second word
   * 2 = third word
   */
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * True while the app is fetching/loading words.
   */
  const [loading, setLoading] = useState(true);

  /**
   * Holds an error message if loading fails.
   *
   * null means no error.
   */
  const [error, setError] = useState<string | null>(null);

  /**
   * Loads today's words.
   *
   * We put this in its own function so we can reuse it later
   * for a manual refresh button.
   */
  async function loadWords() {
    try {
      setLoading(true);
      setError(null);

      const loadedWords = await getTodayWords();

      setWords(loadedWords);
      setCurrentIndex(0);
    } catch (unknownError) {
      /**
       * TypeScript does not know what was thrown.
       * It could be an Error object, a string, or something else.
       *
       * This check safely extracts a useful message.
       */
      if (unknownError instanceof Error) {
        setError(unknownError.message);
      } else {
        setError("Something went wrong while loading daily words.");
      }
    } finally {
      setLoading(false);
    }
  }

  /**
   * useEffect runs after the component using this hook first appears.
   *
   * The empty dependency array [] means:
   * "run this once when the component mounts."
   */
  useEffect(() => {
    loadWords();
  }, []);

  /**
   * Finds the currently selected word.
   *
   * useMemo avoids recalculating this unless words/currentIndex changes.
   * Not strictly necessary here, but this is a clean pattern.
   */
  const currentWord = useMemo(() => {
    return words[currentIndex] ?? null;
  }, [words, currentIndex]);

  /**
   * Move forward by one word.
   *
   * The modulo (%) makes it wrap around:
   * 0 -> 1 -> 2 -> 0
   */
  function nextWord() {
    if (words.length === 0) return;

    setCurrentIndex((previousIndex) => {
      return (previousIndex + 1) % words.length;
    });
  }

  /**
   * Move backward by one word.
   *
   * Adding words.length before the modulo prevents negative indexes.
   * Example with 3 words:
   * 0 -> 2
   */
  function previousWord() {
    if (words.length === 0) return;

    setCurrentIndex((previousIndex) => {
      return (previousIndex - 1 + words.length) % words.length;
    });
  }

  /**
   * Jump directly to a specific word index.
   *
   * This will be used by source tabs/dots later.
   */
  function selectWord(index: number) {
    if (index < 0 || index >= words.length) return;

    setCurrentIndex(index);
  }

  return {
    words,
    currentIndex,
    currentWord,
    loading,
    error,

    nextWord,
    previousWord,
    selectWord,

    /**
     * Expose this as refreshWords so the UI can eventually have
     * a refresh button.
     */
refreshWords: async () => {
  try {
    setLoading(true);
    setError(null);

    const refreshedWords = await refreshTodayWords();

    setWords(refreshedWords);
    setCurrentIndex(0);
  } catch (unknownError) {
    if (unknownError instanceof Error) {
      setError(unknownError.message);
    } else {
      setError("Something went wrong while refreshing daily words.");
    }
  } finally {
    setLoading(false);
  }
},  };
}