/**
 * The internal ID for each dictionary/source provider.
 *
 * This is used by the code, not mainly by the UI.
 * Keeping these as strict string values helps TypeScript catch typos.
 */
export type DictionarySource =
  | "wordnik"
  | "merriam-webster"
  | "oxford";

/**
 * The normalized shape for every daily word in the app.
 *
 * Each API will return data differently, but before the UI sees it,
 * we convert it into this shared shape.
 */
export type DailyWord = {
  /**
   * Internal source ID.
   * Example: "wordnik"
   */
  source: DictionarySource;

  /**
   * Pretty source name shown to users.
   * Example: "Wordnik"
   */
  sourceDisplayName: string;

  /**
   * The main word being displayed.
   */
  word: string;

  /**
   * ISO date string.
   * Example: "2026-05-09"
   */
  date: string;

  /**
   * The main short definition for the compact widget view.
   */
  shortDefinition: string;

  /**
   * Optional longer/full definition for expanded view later.
   */
  fullDefinition?: string;

  /**
   * All definitions we extracted from the provider.
   *
   * Keep this as an array even if there is only one definition.
   */
  definitions: string[];

  /**
   * Main part of speech.
   * Example: "noun", "verb", "adjective"
   */
  partOfSpeech?: string;

  /**
   * Human-readable pronunciation text.
   */
  pronunciation?: string;

  /**
   * IPA pronunciation, if available.
   */
  ipa?: string;

  /**
   * Audio pronunciation URL, if available.
   */
  audioUrl?: string;

  /**
   * Best single example sentence.
   */
  example?: string;

  /**
   * All example sentences we extracted.
   */
  examples: string[];

  /**
   * Synonyms from the provider.
   */
  synonyms: string[];

  /**
   * Antonyms from the provider.
   */
  antonyms: string[];

  /**
   * Related terms that are not necessarily synonyms or antonyms.
   */
  relatedWords: string[];

  /**
   * Word origin/history, if available.
   */
  etymology?: string;

  /**
   * Syllable breakdown, if available.
   */
  syllables: string[];

  /**
   * Labels/tags like "archaic", "slang", "biology", etc.
   */
  labels: string[];

  /**
   * Optional difficulty marker for future use.
   */
  difficulty?: string;

  /**
   * Link back to the source page.
   */
  sourceUrl?: string;

  /**
   * When our app fetched/generated this object.
   */
  fetchedAt: string;

  /**
   * Tells the UI whether this is real data, mock data, fallback data, or an error placeholder.
   */
  status: "ok" | "mock" | "fallback" | "error";

  /**
   * Optional message if something failed.
   */
  errorMessage?: string;

  /**
   * Raw provider response.
   *
   * Useful during development, but we may avoid storing this long-term
   * depending on provider caching rules.
   */
  raw?: unknown;
};