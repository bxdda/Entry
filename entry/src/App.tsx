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

  if (loading) {
    return (
      <main className="app-shell">
        <p className="status-text">Loading today&apos;s words...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="app-shell">
        <p className="status-text">Failed to load words: {error}</p>
      </main>
    );
  }

  if (!currentWord) {
    return (
      <main className="app-shell">
        <p className="status-text">No words available.</p>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <div className="widget-frame">
        <div className="widget-topbar">
          <div>
            <p className="widget-title">Entry</p>
            <p className="widget-mode">Mode: {apiConfig.providerMode}</p>
          </div>

          <button type="button" className="refresh-button" onClick={refreshWords}>
            Refresh
          </button>
        </div>
        <WordCard word={currentWord} />

        <div className="nav-row">
          <button type="button" onClick={previousWord}>
            Previous
          </button>

          <div className="source-tabs">
            {words.map((word, index) => {
              const isActive = index === currentIndex;

              return (
                <button
                  key={word.source}
                  type="button"
                  className={isActive ? "source-tab active" : "source-tab"}
                  onClick={() => selectWord(index)}
                >
                  {word.sourceDisplayName}
                </button>
              );
            })}
          </div>

          <button type="button" onClick={nextWord}>
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;