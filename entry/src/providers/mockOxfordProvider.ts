import type { DailyWord } from "../types/dailyWord";
import type { DailyWordProvider } from "./types";

/**
 * Mock Oxford provider.
 *
 * This gives us a third card with a slightly more formal/reference tone.
 */
export const mockOxfordProvider: DailyWordProvider = {
  source: "oxford",
  sourceDisplayName: "Oxford",

  async getDailyWord(): Promise<DailyWord> {
    return {
      source: "oxford",
      sourceDisplayName: "Oxford",
      word: "resolute",
      date: new Date().toISOString().slice(0, 10),

      shortDefinition: "Admirably purposeful, determined, and unwavering.",
      fullDefinition:
        "Showing firm determination and a steady refusal to give up or change course.",

      definitions: [
        "Admirably purposeful, determined, and unwavering.",
        "Firmly resolved or determined; set in purpose or opinion.",
      ],

      partOfSpeech: "adjective",
      pronunciation: "REZ-uh-loot",
      ipa: "/ˈrezəluːt/",
      audioUrl: undefined,

      example:
        "She remained resolute despite the pressure around her.",
      examples: [
        "She remained resolute despite the pressure around her.",
        "The team took a resolute approach to the difficult problem.",
      ],

      synonyms: ["determined", "steadfast", "unwavering", "firm"],
      antonyms: ["uncertain", "wavering", "irresolute"],
      relatedWords: ["resolve", "persistence", "conviction"],

      etymology:
        "From Latin resolutus, past participle of resolvere, meaning to loosen or release.",
      syllables: ["res", "o", "lute"],
      labels: ["formal"],

      difficulty: "medium",
      sourceUrl: "https://www.oed.com/",

      fetchedAt: new Date().toISOString(),
      status: "mock",
      raw: undefined,
    };
  },
};