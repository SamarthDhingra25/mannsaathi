import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const moods = [
  { emoji: '😄', label: 'Happy', value: 4 },
  { emoji: '😐', label: 'Neutral', value: 3 },
  { emoji: '😢', label: 'Sad', value: 2 },
  { emoji: '😠', label: 'Angry', value: 1 },
];

const moodSuggestions = {
  Happy: "Keep up the good mood! Try a memory game 🎮",
  Neutral: "Try some meditation 🧘‍♂️",
  Sad: "Go for a breathing exercise 🌬️",
  Angry: "Coloring might help you relax 🎨"
};

function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodLog, setMoodLog] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('moodLog')) || [];
    setMoodLog(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('moodLog', JSON.stringify(moodLog));
  }, [moodLog]);

  const handleMoodSelect = (mood) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedLog = moodLog.filter(entry => entry.date !== today); // Replace if already logged today
    updatedLog.push({ date: today, mood });
    setMoodLog(updatedLog);
    setSelectedMood(mood);
  };

  const chartData = {
    labels: moodLog.map(entry => entry.date),
    datasets: [
      {
        label: 'Mood over Time',
        data: moodLog.map(entry => entry.mood.value),
        fill: false,
        borderColor: '#007bff',
        tension: 0.3,
        pointRadius: 5
      }
    ]
  };

  const chartOptions = {
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (value) => {
            const mood = moods.find(m => m.value === value);
            return mood ? mood.label : '';
          }
        }
      }
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">🌈 Mood Tracker</h2>

      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        {moods.map((m) => (
          <button
            key={m.label}
            onClick={() => handleMoodSelect(m)}
            className="btn btn-light border rounded shadow-sm"
          >
            <span style={{ fontSize: '2rem' }}>{m.emoji}</span><br />
            {m.label}
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="mb-4">
          <h5>
            Today you feel: {selectedMood.label} {selectedMood.emoji}
          </h5>
          <p>{moodSuggestions[selectedMood.label]}</p>
        </div>
      )}

      {moodLog.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-3">📈 Mood Progress</h4>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}

export default MoodTracker;
