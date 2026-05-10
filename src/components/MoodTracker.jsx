import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const moods = [
  {
    emoji: "😄",
    label: "Happy",
    value: 4,
    color: "from-emerald-400 to-green-500",
    bgColor: "bg-gradient-to-r from-emerald-400 to-green-500",
    textColor: "text-emerald-700",
  },
  {
    emoji: "😊",
    label: "Content",
    value: 3.5,
    color: "from-cyan-400 to-blue-400",
    bgColor: "bg-gradient-to-r from-cyan-400 to-blue-400",
    textColor: "text-cyan-700",
  },
  {
    emoji: "😐",
    label: "Neutral",
    value: 3,
    color: "from-sky-400 to-cyan-400",
    bgColor: "bg-gradient-to-r from-sky-400 to-cyan-400",
    textColor: "text-sky-700",
  },
  {
    emoji: "😌",
    label: "Calm",
    value: 2.5,
    color: "from-teal-400 to-emerald-400",
    bgColor: "bg-gradient-to-r from-teal-400 to-emerald-400",
    textColor: "text-teal-700",
  },
  {
    emoji: "😔",
    label: "Sad",
    value: 2,
    color: "from-blue-400 to-indigo-400",
    bgColor: "bg-gradient-to-r from-blue-400 to-indigo-400",
    textColor: "text-blue-700",
  },
  {
    emoji: "😟",
    label: "Anxious",
    value: 1.5,
    color: "from-violet-400 to-purple-400",
    bgColor: "bg-gradient-to-r from-violet-400 to-purple-400",
    textColor: "text-violet-700",
  },
  {
    emoji: "😠",
    label: "Angry",
    value: 1,
    color: "from-rose-400 to-pink-400",
    bgColor: "bg-gradient-to-r from-rose-400 to-pink-400",
    textColor: "text-rose-700",
  },
];

const moodSuggestions = {
  Happy: [
    {
      icon: "🎮",
      text: "Play a memory game to keep your energy up",
      activity: "memory-game",
    },
    {
      icon: "✨",
      text: "Share your positive vibes with others",
      activity: "text-chat",
    },
    {
      icon: "🎨",
      text: "Express your happiness through creative art",
      activity: "coloring-game",
    },
  ],
  Content: [
    {
      icon: "📝",
      text: "Journal about what made you feel content today",
      activity: "journal",
    },
    {
      icon: "🧘",
      text: "Meditate to maintain your peaceful state",
      activity: "meditation-choice-game",
    },
    { icon: "🌱", text: "Plan something enjoyable for later", activity: null },
  ],
  Neutral: [
    {
      icon: "🧘‍♂️",
      text: "Try guided meditation to find your center",
      activity: "meditation-choice-game",
    },
    {
      icon: "📚",
      text: "Read something inspiring or uplifting",
      activity: null,
    },
    {
      icon: "🎵",
      text: "Listen to calming music to set the mood",
      activity: null,
    },
  ],
  Calm: [
    {
      icon: "🌬️",
      text: "Deep breathing exercises to maintain calm",
      activity: "breathing-game",
    },
    {
      icon: "💧",
      text: "Stay hydrated and practice mindfulness",
      activity: null,
    },
    { icon: "🌿", text: "Take a mindful walk in nature", activity: null },
  ],
  Sad: [
    {
      icon: "🌬️",
      text: "Gentle breathing exercises to release tension",
      activity: "breathing-game",
    },
    {
      icon: "💬",
      text: "Talk about your feelings with someone",
      activity: "text-chat",
    },
    {
      icon: "🎨",
      text: "Express emotions through coloring therapy",
      activity: "coloring-game",
    },
  ],
  Anxious: [
    {
      icon: "🌊",
      text: "Guided breathing for anxiety relief",
      activity: "breathing-game",
    },
    {
      icon: "🧠",
      text: "Mindfulness meditation to calm racing thoughts",
      activity: "meditation-choice-game",
    },
    {
      icon: "🎮",
      text: "Distract with a calming memory game",
      activity: "memory-game",
    },
  ],
  Angry: [
    {
      icon: "🎨",
      text: "Coloring therapy to channel energy creatively",
      activity: "coloring-game",
    },
    {
      icon: "🌬️",
      text: "Deep breathing to release tension",
      activity: "breathing-game",
    },
    {
      icon: "⚡",
      text: "Take a break and practice grounding exercises",
      activity: null,
    },
  ],
};

function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodLog, setMoodLog] = useState([]);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [streak, setStreak] = useState(0);
  const [averageMood, setAverageMood] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("moodLog")) || [];
    setMoodLog(stored);
    calculateStats(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("moodLog", JSON.stringify(moodLog));
    calculateStats(moodLog);
  }, [moodLog]);

  const calculateStats = (log) => {
    // Calculate streak
    let currentStreak = 0;
    const today = new Date().toISOString().split("T")[0];
    const sortedLog = [...log].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    for (let i = 0; i < sortedLog.length; i++) {
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      const expectedDateStr = expectedDate.toISOString().split("T")[0];

      if (sortedLog[i]?.date === expectedDateStr) {
        currentStreak++;
      } else {
        break;
      }
    }
    setStreak(currentStreak);

    // Calculate average mood
    if (log.length > 0) {
      const total = log.reduce((sum, entry) => sum + entry.mood.value, 0);
      setAverageMood(total / log.length);
    }
  };

  const handleMoodSelect = (mood) => {
    const today = new Date().toISOString().split("T")[0];
    const updatedLog = moodLog.filter((entry) => entry.date !== today);
    updatedLog.push({ date: today, mood });
    updatedLog.sort((a, b) => new Date(b.date) - new Date(a.date));
    setMoodLog(updatedLog);
    setSelectedMood(mood);
  };

  const getMoodEmojiByValue = (value) => {
    return moods.find((m) => m.value === value)?.emoji || "😐";
  };

  const getMoodNameByValue = (value) => {
    return moods.find((m) => m.value === value)?.label || "Neutral";
  };

  const chartData = {
    labels: moodLog
      .slice(0, showAllHistory ? moodLog.length : 7)
      .map((entry) => {
        const date = new Date(entry.date);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      })
      .reverse(),
    datasets: [
      {
        label: "Mood Level",
        data: moodLog
          .slice(0, showAllHistory ? moodLog.length : 7)
          .map((entry) => entry.mood.value)
          .reverse(),
        fill: true,
        backgroundColor: "rgba(34, 211, 238, 0.1)",
        borderColor: "rgb(34, 211, 238)",
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: moodLog
          .slice(0, showAllHistory ? moodLog.length : 7)
          .map(
            (entry) =>
              moods
                .find((m) => m.value === entry.mood.value)
                ?.bgColor.split(" ")[2] || "#38bdf8"
          )
          .reverse(),
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const mood = moods.find((m) => m.value === value);
            return `${mood?.label || "Unknown"}: ${mood?.emoji || ""}`;
          },
        },
      },
    },
    scales: {
      y: {
        min: 0.5,
        max: 4.5,
        ticks: {
          stepSize: 0.5,
          callback: (value) => {
            const mood = moods.find((m) => m.value === value);
            return mood ? `${mood.emoji} ${mood.label}` : "";
          },
          font: {
            size: 11,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
  };

  const getCurrentWeekMoods = () => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const currentWeek = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const dayName = weekDays[date.getDay()];
      const moodEntry = moodLog.find((entry) => entry.date === dateStr);

      currentWeek.push({
        day: dayName,
        date: dateStr,
        mood: moodEntry?.mood || null,
        isToday: i === 0,
      });
    }

    return currentWeek;
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all mood history?")) {
      setMoodLog([]);
      setSelectedMood(null);
      localStorage.removeItem("moodLog");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-600/10 to-teal-600/10 rounded-full px-5 py-2.5 mb-6 border border-cyan-200">
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-cyan-700">
              Emotional Wellness
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Mood Tracker
            </span>
            <br />
            <span className="text-cyan-900">Track Your Emotional Journey</span>
          </h1>

          <p className="text-cyan-700/80 text-lg max-w-2xl mx-auto">
            Record your daily mood and discover patterns in your emotional
            wellbeing. Your mood data helps personalize your wellness journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Mood Selection */}
          <div className="space-y-8">
            {/* Today's Mood */}
            <div className="bg-white/90 backdrop-blur-sm border border-cyan-100 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-900">
                    How are you feeling today?
                  </h3>
                  <p className="text-cyan-700/70">Select your current mood</p>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full text-sm text-cyan-700">
                  Day {streak}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => handleMoodSelect(mood)}
                    className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                      selectedMood?.label === mood.label
                        ? `${mood.bgColor} border-transparent text-white transform scale-105`
                        : "bg-white border-cyan-200 hover:border-cyan-300"
                    }`}
                  >
                    <div className="text-center">
                      <div
                        className={`text-4xl mb-3 ${
                          selectedMood?.label === mood.label
                            ? ""
                            : mood.textColor
                        }`}
                      >
                        {mood.emoji}
                      </div>
                      <div
                        className={`font-bold ${
                          selectedMood?.label === mood.label
                            ? "text-white"
                            : "text-cyan-900"
                        }`}
                      >
                        {mood.label}
                      </div>
                    </div>

                    {selectedMood?.label === mood.label && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Selected Mood Display */}
              {selectedMood && (
                <div
                  className={`mt-8 p-6 rounded-2xl ${selectedMood.bgColor} text-white`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl">{selectedMood.emoji}</div>
                    <div>
                      <h4 className="text-2xl font-bold">
                        Today's Mood: {selectedMood.label}
                      </h4>
                      <p className="opacity-90">Recorded successfully</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm opacity-90 mb-3">
                      Suggested Activities:
                    </div>
                    <div className="space-y-3">
                      {moodSuggestions[selectedMood.label]
                        ?.slice(0, 2)
                        .map((suggestion, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 bg-white/20 rounded-xl p-3"
                          >
                            <div className="text-2xl">{suggestion.icon}</div>
                            <div className="text-sm">{suggestion.text}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Panel */}
            <div className="bg-gradient-to-br from-cyan-600/10 to-teal-600/10 backdrop-blur-sm border border-cyan-200 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-cyan-900 mb-6 flex items-center gap-3">
                <span className="text-2xl">📊</span>
                Mood Statistics
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/80 rounded-2xl p-5 text-center">
                    <div className="text-3xl font-bold text-cyan-600 mb-2">
                      {moodLog.length}
                    </div>
                    <div className="text-sm text-cyan-700/80">Entries</div>
                  </div>
                  <div className="bg-white/80 rounded-2xl p-5 text-center">
                    <div className="text-3xl font-bold text-teal-600 mb-2">
                      {streak}
                    </div>
                    <div className="text-sm text-cyan-700/80">Day Streak</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-cyan-900 font-medium">
                      Average Mood
                    </span>
                    <span className="text-cyan-600 font-bold">
                      {averageMood > 0 ? averageMood.toFixed(1) : "--"} / 4
                    </span>
                  </div>
                  <div className="h-3 bg-white/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${(averageMood / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-cyan-700/70 mb-3">
                    Most Common Mood
                  </div>
                  {moodLog.length > 0 ? (
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">
                        {getMoodEmojiByValue(Math.round(averageMood * 2) / 2)}
                      </div>
                      <div>
                        <div className="font-bold text-cyan-900">
                          {getMoodNameByValue(Math.round(averageMood * 2) / 2)}
                        </div>
                        <div className="text-sm text-cyan-700/70">
                          Based on {moodLog.length} entries
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-cyan-700/70 italic">No data yet</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - Chart & History */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm border border-cyan-100 rounded-3xl p-8 shadow-xl">
              {/* Chart Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-900">
                    Mood Progress
                  </h3>
                  <p className="text-cyan-700/70">
                    Track your emotional patterns over time
                  </p>
                </div>

                <div className="flex gap-3 mt-4 sm:mt-0">
                  <button
                    onClick={() => setShowAllHistory(!showAllHistory)}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 text-cyan-700 rounded-full text-sm font-medium hover:bg-cyan-500/20 transition-colors duration-200"
                  >
                    {showAllHistory ? "Show Last 7 Days" : "Show All History"}
                  </button>
                  {moodLog.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="px-4 py-2 bg-gradient-to-r from-rose-500/10 to-pink-500/10 text-rose-700 rounded-full text-sm font-medium hover:bg-rose-500/20 transition-colors duration-200"
                    >
                      Clear History
                    </button>
                  )}
                </div>
              </div>

              {/* Mood Chart */}
              <div className="h-80 mb-10">
                {moodLog.length > 0 ? (
                  <Line data={chartData} options={chartOptions} />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-6">📈</div>
                      <h4 className="text-xl font-bold text-cyan-900 mb-3">
                        No mood data yet
                      </h4>
                      <p className="text-cyan-700/70">
                        Start by selecting your mood for today!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Week Overview */}
              <div className="mb-10">
                <h4 className="text-xl font-bold text-cyan-900 mb-6 flex items-center gap-3">
                  <span className="text-2xl">📅</span>
                  This Week's Overview
                </h4>

                <div className="grid grid-cols-7 gap-2">
                  {getCurrentWeekMoods().map((day, index) => (
                    <div
                      key={index}
                      className={`text-center p-4 rounded-2xl transition-all duration-300 ${
                        day.mood
                          ? `${day.mood.bgColor} text-white`
                          : day.isToday
                          ? "bg-cyan-100 text-cyan-900"
                          : "bg-cyan-50 text-cyan-700/70"
                      }`}
                    >
                      <div className="text-sm font-medium mb-2">{day.day}</div>
                      <div className="text-3xl mb-2">
                        {day.mood ? day.mood.emoji : "–"}
                      </div>
                      <div className="text-xs">
                        {day.mood ? day.mood.label : "No data"}
                      </div>
                      {day.isToday && (
                        <div className="mt-2 text-xs px-2 py-1 bg-white/30 rounded-full">
                          Today
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mood Insights */}
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 border border-cyan-200">
                <h4 className="text-lg font-bold text-cyan-900 mb-4 flex items-center gap-3">
                  <span className="text-xl">💡</span>
                  Mood Insights & Tips
                </h4>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-600">📝</span>
                    </div>
                    <div>
                      <div className="font-bold text-cyan-900 mb-1">
                        Consistency is Key
                      </div>
                      <div className="text-sm text-cyan-700/80">
                        Tracking your mood daily helps identify patterns and
                        triggers for better emotional awareness.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-600">🌱</span>
                    </div>
                    <div>
                      <div className="font-bold text-cyan-900 mb-1">
                        Growth Mindset
                      </div>
                      <div className="text-sm text-cyan-700/80">
                        All emotions are valid. Use your mood data to understand
                        yourself better and grow emotionally.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-600">🎯</span>
                    </div>
                    <div>
                      <div className="font-bold text-cyan-900 mb-1">
                        Personalized Support
                      </div>
                      <div className="text-sm text-cyan-700/80">
                        Based on your mood patterns, we suggest activities that
                        best support your emotional wellbeing.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoodTracker;