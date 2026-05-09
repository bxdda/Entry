import "./App.css";

import { WordCard } from "./components/WordCard";
import { useDailyWords } from "./hooks/useDailyWords";
import { apiConfig } from "./services/apiConfig";

function App() {
  const {
    words,
    currentIndex,
    currentWord,
    loading,
    error,
    nextWord,
    previousWord,
    selectWord,
    refreshWords,
  } = useDailyWords();

  /**
   * Loading state.
   */
  if (loading) {
    return (
      <main className="min-h-screen grid place-items-center bg-slate-100 p-6">
        <p className="font-bold text-slate-500">
          Loading today&apos;s words...
        </p>
      </main>
    );
  }

  /**
   * Global app-level error state.
   */
  if (error) {
    return (
      <main className="min-h-screen grid place-items-center bg-slate-100 p-6">
        <p className="font-bold text-red-600">
          Failed to load words: {error}
        </p>
      </main>
    );
  }

  /**
   * Safety fallback if no current word exists.
   */
  if (!currentWord) {
    return (
      <main className="min-h-screen grid place-items-center bg-slate-100 p-6">
        <p className="font-bold text-slate-500">
          No words available.
        </p>
      </main>
    );
  }

  return (
    <main
      className="
        min-h-screen
        grid
        place-items-center
        p-6

        bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_32%),linear-gradient(135deg,#eef4ff,#f8fbff)]
      "
    >
      <div
        className="
          w-full
          max-w-[440px]

          rounded-[32px]
          border
          border-white/80

          bg-white/70
          p-[18px]

          shadow-[0_24px_80px_rgba(65,91,140,0.18),inset_0_1px_0_rgba(255,255,255,0.85)]

          backdrop-blur-xl
        "
      >
        {/* Top widget bar */}
        <div className="mb-3.5 flex items-center justify-between px-1">
          <div>
            <p className="m-0 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">
              Entry
            </p>

            <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-slate-400">
              Mode: {apiConfig.providerMode}
            </p>
          </div>

          <button
            type="button"
            onClick={refreshWords}
            className="
              cursor-pointer

              rounded-full
              border-0

              bg-white/80
              px-3
              py-2

              text-[0.78rem]
              font-extrabold
              text-slate-700

              shadow-[0_8px_22px_rgba(65,91,140,0.10),inset_0_1px_0_rgba(255,255,255,0.95)]

              transition-transform
              duration-150

              hover:-translate-y-[1px]
            "
          >
            Refresh
          </button>
        </div>

        {/* Main word card */}
        <WordCard word={currentWord} />

        {/* Bottom navigation row */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={previousWord}
            className="
              cursor-pointer

              rounded-full
              border-0

              bg-white/80
              px-4
              py-2.5

              text-[0.82rem]
              font-bold
              text-slate-700

              shadow-[0_8px_22px_rgba(65,91,140,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]

              transition-transform
              duration-150

              hover:-translate-y-[1px]
            "
          >
            Previous
          </button>

          <div className="flex gap-2">
            {words.map((word, index) => {
              const isActive = index === currentIndex;

              return (
                <button
                  key={word.source}
                  type="button"
                  onClick={() => selectWord(index)}
                  className={[
                    "cursor-pointer",
                    "rounded-full",
                    "border-0",
                    "px-3",
                    "py-2",

                    "text-[0.78rem]",
                    "font-bold",

                    "shadow-[0_8px_22px_rgba(65,91,140,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]",

                    "transition-all",
                    "duration-150",

                    isActive
                      ? "bg-white text-slate-900 opacity-100"
                      : "bg-white/75 text-slate-700 opacity-60 hover:opacity-100",
                  ].join(" ")}
                >
                  {word.sourceDisplayName}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={nextWord}
            className="
              cursor-pointer

              rounded-full
              border-0

              bg-white/80
              px-4
              py-2.5

              text-[0.82rem]
              font-bold
              text-slate-700

              shadow-[0_8px_22px_rgba(65,91,140,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]

              transition-transform
              duration-150

              hover:-translate-y-[1px]
            "
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;