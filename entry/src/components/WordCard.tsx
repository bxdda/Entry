import type { DailyWord } from "../types/dailyWord";

type WordCardProps = {
  word: DailyWord;
};

/**
 * Displays one daily word card.
 *
 * This version uses Tailwind classes directly in the JSX.
 * That makes UI iteration faster because we can style the component
 * without jumping back and forth into App.css for every small change.
 */
export function WordCard({ word }: WordCardProps) {
  const isError = word.status === "error";

  return (
    <section
      className={[
        "min-h-[250px]",
        "rounded-[28px]",
        "border",
        "p-8",
        "flex",
        "flex-col",
        "justify-center",
        "shadow-[0_14px_38px_rgba(51,86,140,0.14),inset_0_1px_0_rgba(255,255,255,0.96)]",

        isError
          ? "border-red-200 bg-gradient-to-br from-white to-red-50"
          : "border-blue-100 bg-gradient-to-br from-white to-blue-50",
      ].join(" ")}
    >
      <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
        {word.sourceDisplayName}
      </p>

      <h1 className="m-0 text-[clamp(2.5rem,8vw,4.75rem)] leading-none tracking-[-0.08em] text-slate-900">
        {word.word}
      </h1>

      <p className="mt-5 max-w-[34ch] text-base leading-7 text-slate-600">
        {word.shortDefinition}
      </p>

      {isError && word.errorMessage && (
        <p className="mt-3.5 text-sm leading-6 text-red-700">
          {word.errorMessage}
        </p>
      )}
    </section>
  );
}