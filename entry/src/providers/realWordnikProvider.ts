import type { DailyWord } from "../types/dailyWord";
import type { DailyWordProvider } from "./types";
import { apiConfig, hasApiKey } from "../services/apiConfig";

/**
 * Partial shape of the Wordnik word-of-the-day response.
 *
 * We only type the fields we currently care about.
 * The real API may include more fields, which is fine.
 */
type WordnikWordOfDayResponse = {
  word?: string;
  note?: string;
  publishDate?: string;
  definitions?: {
    text?: string;
    partOfSpeech?: string;
    source?: string;
  }[];
  examples?: {
    text?: string;
  }[];
};

/**
 * Real Wordnik provider.
 *
 * This will call Wordnik's word-of-the-day endpoint and normalize
 * the response into our app's DailyWord shape.
 */
export const realWordnikProvider: DailyWordProvider = {
  source: "wordnik",
  sourceDisplayName: "Wordnik",

  async getDailyWord(): Promise<DailyWord> {
    if (!hasApiKey(apiConfig.wordnikApiKey)) {
      throw new Error("Missing Wordnik API key.");
    }

    const today = new Date().toISOString().slice(0, 10);

    /**
     * Wordnik's word-of-the-day endpoint.
     *
     * We pass the API key as a query parameter.
     */
    const url = new URL("https://api.wordnik.com/v4/words.json/wordOfTheDay");
    url.searchParams.set("api_key", apiConfig.wordnikApiKey);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Wordnik request failed with status ${response.status}.`);
    }

    const data = (await response.json()) as WordnikWordOfDayResponse;

    const word = data.word?.trim() || "Unknown";

    const definitions =
      data.definitions
        ?.map((definition) => definition.text?.trim())
        .filter((text): text is string => Boolean(text)) ?? [];

    const examples =
      data.examples
        ?.map((example) => example.text?.trim())
        .filter((text): text is string => Boolean(text)) ?? [];

    const firstDefinition = definitions[0] ?? "No definition available.";

    return {
      source: "wordnik",
      sourceDisplayName: "Wordnik",

      word,
      date: data.publishDate?.slice(0, 10) ?? today,

      shortDefinition: firstDefinition,
      fullDefinition: definitions.join("\n\n") || undefined,
      definitions,

      partOfSpeech: data.definitions?.[0]?.partOfSpeech,
      pronunciation: undefined,
      ipa: undefined,
      audioUrl: undefined,

      example: examples[0],
      examples,

      synonyms: [],
      antonyms: [],
      relatedWords: [],

      etymology: data.note,
      syllables: [],
      labels: [],

      difficulty: undefined,
      sourceUrl: `https://www.wordnik.com/words/${encodeURIComponent(word)}`,

      fetchedAt: new Date().toISOString(),
      status: "ok",

      raw: data,
    };
  },
};