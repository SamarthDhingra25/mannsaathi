import React, { useState } from 'react';

function MeditationChoiceGame() {
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div className="container text-center">
      <h2>🧘‍♀️ Guided Meditation</h2>
      <p>Choose a meditation theme:</p>
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => handleThemeSelect('Ocean Calm')}
        >
          🌊 Ocean Calm
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => handleThemeSelect('Forest Serenity')}
        >
          🌲 Forest Serenity
        </button>
        <button
          className="btn btn-outline-warning"
          onClick={() => handleThemeSelect('Sleep & Relax')}
        >
          ✨ Sleep & Relax
        </button>
      </div>
      {selectedTheme && (
        <div className="mt-4">
          <h3>Playing: {selectedTheme}</h3>
          <p>Your selected meditation theme will play shortly...</p>
          {/* You can integrate audio or video prompts here */}
        </div>
      )}
    </div>
  );
}

export default MeditationChoiceGame;
