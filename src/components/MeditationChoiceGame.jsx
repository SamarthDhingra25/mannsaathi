import React, { useState } from 'react';

const mediaData = {
  'Ocean Calm': {
    audio: '/media/ocean-waves-250310.mp3',
    video: '/media/1390942-uhd_4096_2160_24fps.mp4',
  },
  'Forest Serenity': {
    audio: '/media/forest-ambience-296528.mp3',
    video: '/media/1448735-uhd_4096_2160_24fps.mp4',
  },
  'Sleep & Relax': {
    audio: '/media/relaxing-guitar-music-volume-2-128532.mp3',
    video: null,
  },
};

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
        {Object.keys(mediaData).map((theme) => (
          <button
            key={theme}
            className="btn btn-outline-primary"
            onClick={() => handleThemeSelect(theme)}
          >
            {theme === 'Ocean Calm' && '🌊'}
            {theme === 'Forest Serenity' && '🌲'}
            {theme === 'Sleep & Relax' && '✨'} {theme}
          </button>
        ))}
      </div>

      {selectedTheme && (
        <div className="mt-4">
          <h3>Now Playing: {selectedTheme}</h3>
          <video
            src={mediaData[selectedTheme].video}
            width="480"
            height="270"
            controls
            style={{ borderRadius: '10px', marginBottom: '1rem' }}
          />
          <audio
            src={mediaData[selectedTheme].audio}
            controls
            autoPlay
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default MeditationChoiceGame;
