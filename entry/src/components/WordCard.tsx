import type { DailyWord } from "../types/dailyWord";

/**
 * Props are the inputs this component needs.
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
 * This component now understands error/fallback cards too.
 * That means one provider can fail without breaking the whole app.
 */
export function WordCard({ word }: WordCardProps) {
  const isError = word.status === "error";

  return (
    <section className={isError ? "word-card word-card--error" : "word-card"}>
      <p className="word-card__source">{word.sourceDisplayName}</p>

      <h1 className="word-card__word">{word.word}</h1>

      <p className="word-card__definition">{word.shortDefinition}</p>

      {isError && word.errorMessage && (
        <p className="word-card__error-detail">{word.errorMessage}</p>
      )}
    </section>
  );
}