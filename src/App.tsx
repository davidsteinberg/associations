import "./App.css";
import entries from "./entries.json";
import { useState } from "react";

const random = {
  index<T>(array: T[]) {
    return Math.round(Math.random() * (array.length - 1));
  },
  element<T>(array: T[]) {
    const index = this.index(array);
    return array[index];
  },
};

const App = () => {
  // Entries
  const [unusedEntries, setUnusedEntries] = useState([...entries]);
  const [currentEntry, setCurrentEntry] = useState({
    words: ["Tap to begin"],
  });

  // Settings
  const [showAllWords, setShowAllWords] = useState(false);
  const [color, setColor] = useState("#b54545");

  // View
  const [showSettings, setShowSettings] = useState(false);

  const pickNewEntry = () => {
    const index = random.index(unusedEntries);
    const [entry] = unusedEntries.splice(index, 1);

    setCurrentEntry(entry);

    if (unusedEntries.length === 0) {
      setUnusedEntries([...entries]);
    }
  };

  return (
    <div className="App" onClick={pickNewEntry} style={{ color }}>
      {showSettings ? (
        <div className="settings">
          <div className="row">
            <div className="column">Color</div>
            <div className="column">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="column">Show all words</div>
            <div className="column">
              <input
                type="checkbox"
                checked={showAllWords}
                onChange={(e) => setShowAllWords(e.target.checked)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="words">
          {showAllWords ? (
            currentEntry.words.map((word) => <div key={word}>{word}</div>)
          ) : (
            <div>{random.element(currentEntry.words)}</div>
          )}
        </div>
      )}
      <div
        className="toggle"
        onClick={(e) => {
          e.stopPropagation();
          setShowSettings(!showSettings);
        }}
      >
        {showSettings ? "x" : "="}
      </div>
    </div>
  );
};

export default App;
