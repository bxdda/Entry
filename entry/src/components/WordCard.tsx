import type { DailyWord } from "../types/dailyWord";

/**
 * Props are the inputs this component needs.
 *
 * This is similar to passing arguments into a Java method,
 * except React components receive one props object.
 */
type WordCardProps = {
  /**
   * The word object this card should display.
   */
  word: DailyWord;
};

/**
 * Displays one daily word card.
 *
 * For now, this only shows:
 * - source name
 * - word
 * - short definition
 *
 * Later, this same component can expand to show pronunciation,
 * examples, synonyms, audio, etc.
 */
export function WordCard({ word }: WordCardProps) {
  return (
    <section className="word-card">
      <p className="word-card__source">{word.sourceDisplayName}</p>

      <h1 className="word-card__word">{word.word}</h1>

      <p className="word-card__definition">{word.shortDefinition}</p>
    </section>
  );
}