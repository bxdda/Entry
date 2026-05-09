import type { DailyWord } from "../types/dailyWord";
import type { DailyWordProvider } from "./types";

/**
 * Mock Merriam-Webster provider.
 *
 * This gives us a realistic-looking Merriam-Webster style card
 * before we connect the real dictionary API.
 */
export const mockMerriamWebsterProvider: DailyWordProvider = {
  source: "merriam-webster",
  sourceDisplayName: "Merriam-Webster",

  async getDailyWord(): Promise<DailyWord> {
    return {
      source: "merriam-webster",
      sourceDisplayName: "Merriam-Webster",
      word: "lucid",
      date: new Date().toISOString().slice(0, 10),

      shortDefinition: "Clear and easy to understand.",
      fullDefinition:
        "Clear to the understanding; rational, coherent, or marked by clarity.",

      definitions: [
        "Clear and easy to understand.",
        "Able to think clearly.",
        "Translucent or bright with light.",
      ],

      partOfSpeech: "adjective",
      pronunciation: "LOO-sid",
      ipa: "/ˈluːsɪd/",
      audioUrl: undefined,

      example:
        "Her explanation was calm, lucid, and immediately useful.",
      examples: [
        "Her explanation was calm, lucid, and immediately useful.",
        "After a long rest, he felt lucid again.",
      ],

      synonyms: ["clear", "coherent", "intelligible", "plain"],
      antonyms: ["confusing", "unclear", "obscure"],
      relatedWords: ["clarity", "rational", "transparent"],

      etymology:
        "From Latin lucidus, from lucere, meaning to shine.",
      syllables: ["lu", "cid"],
      labels: [],

      difficulty: "easy",
      sourceUrl: "https://www.merriam-webster.com/dictionary/lucid",

      fetchedAt: new Date().toISOString(),
      status: "mock",
      raw: undefined,
    };
  },
};