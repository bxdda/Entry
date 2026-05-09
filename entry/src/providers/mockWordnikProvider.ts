import type { DailyWord } from "../types/dailyWord";
import type { DailyWordProvider } from "./types";

/**
 * Mock Wordnik provider.
 *
 * This pretends to be the real Wordnik API for now.
 * Later, we will replace the hardcoded object with a real fetch call.
 */
export const mockWordnikProvider: DailyWordProvider = {
  source: "wordnik",
  sourceDisplayName: "Wordnik",

  async getDailyWord(): Promise<DailyWord> {
    return {
      source: "wordnik",
      sourceDisplayName: "Wordnik",
      word: "serendipity",
      date: new Date().toISOString().slice(0, 10),

      shortDefinition: "The occurrence of events by chance in a happy or beneficial way.",
      fullDefinition:
        "The faculty or phenomenon of finding valuable or pleasant things not sought for.",

      definitions: [
        "The occurrence of events by chance in a happy or beneficial way.",
        "An accidental discovery of something useful or pleasant.",
      ],

      partOfSpeech: "noun",
      pronunciation: "seh-ren-DIP-uh-tee",
      ipa: "/ˌserənˈdɪpɪti/",
      audioUrl: undefined,

      example:
        "Finding the old journal in the attic was pure serendipity.",
      examples: [
        "Finding the old journal in the attic was pure serendipity.",
        "Their meeting was a moment of serendipity.",
      ],

      synonyms: ["chance", "fortune", "luck"],
      antonyms: ["misfortune"],
      relatedWords: ["coincidence", "discovery", "happenstance"],

      etymology:
        "Coined from The Three Princes of Serendip, a Persian fairy tale.",
      syllables: ["ser", "en", "dip", "i", "ty"],
      labels: ["literary"],

      difficulty: "medium",
      sourceUrl: "https://www.wordnik.com/words/serendipity",

      fetchedAt: new Date().toISOString(),
      status: "mock",
      raw: undefined,
    };
  },
};