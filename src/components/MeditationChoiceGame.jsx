import React, { useState, useRef, useEffect } from "react";

const meditationData = {
  "Ocean Calm": {
    audio:
      "/media/ocean-waves-250310.mp3",
    video:
      "/media/1390942-uhd_4096_2160_24fps.mp4",
    description: "Gentle ocean waves to calm your mind and reduce anxiety.",
    duration: "10:00",
    color: "from-amber-500 to-yellow-600",
    icon: "🌊",
    benefits: ["Reduces stress", "Improves focus", "Promotes relaxation"],
  },
  "Forest Serenity": {
    audio: "/media/forest-ambience-296528.mp3",
    video:
      "/media/1448735-uhd_4096_2160_24fps.mp4",
    description:
      "Peaceful forest sounds to connect with nature and find inner peace.",
    duration: "15:00",
    color: "from-amber-600 to-orange-500",
    icon: "🌲",
    benefits: [
      "Grounds your energy",
      "Reduces anxiety",
      "Improves mindfulness",
    ],
  },
  "Sleep & Relax": {
    audio:
      "/media/relaxing-guitar-music-volume-2-128532.mp3",
    video: null,
    description:
      "Soothing melodies to help you relax deeply and prepare for restful sleep.",
    duration: "20:00",
    color: "from-yellow-500 to-amber-600",
    icon: "✨",
    benefits: ["Promotes sleep", "Reduces tension", "Calms the nervous system"],
  },
  "Morning Bliss": {
    audio:
      "https://assets.mixkit.co/music/preview/mixkit-morning-coffee-229.mp3",
    video:
      "https://player.vimeo.com/external/371433846.sd.mp4?s=2e5d37b7697e5c5eea7c0efdd72fefb7aa6e78f6&profile_id=164&oauth2_token_id=57447761",
    description:
      "Gentle morning sounds to start your day with positivity and clarity.",
    duration: "8:00",
    color: "from-yellow-400 to-amber-500",
    icon: "☀️",
    benefits: ["Boosts energy", "Improves mood", "Sets positive tone"],
  },
  "Mindful Breathing": {
    audio: "https://assets.mixkit.co/music/preview/mixkit-meditation-30.mp3",
    video: null,
    description:
      "Guided breathing exercises to center yourself and find balance.",
    duration: "12:00",
    color: "from-amber-400 to-yellow-500",
    icon: "🌬️",
    benefits: ["Reduces stress", "Improves focus", "Enhances awareness"],
  },
  "Zen Garden": {
    audio:
      "https://assets.mixkit.co/music/preview/mixkit-japanese-zen-garden-243.mp3",
    video:
      "https://player.vimeo.com/external/357437511.sd.mp4?s=9e6eeeb1b5b7191e837ac2e514b52b61d7a5c163&profile_id=164&oauth2_token_id=57447761",
    description:
      "Tranquil zen garden sounds for deep meditation and mental clarity.",
    duration: "18:00",
    color: "from-yellow-600 to-amber-700",
    icon: "🎍",
    benefits: ["Enhances clarity", "Promotes peace", "Reduces mental chatter"],
  },
};

function MeditationChoiceGame() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showVideo, setShowVideo] = useState(true);
  const [playerMode, setPlayerMode] = useState("audio"); // 'audio' or 'video'

  const audioRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (selectedTheme && audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [selectedTheme, volume]);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setIsPlaying(true);
    setCurrentTime(0);

    // Play audio after a short delay
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
      if (videoRef.current && meditationData[theme].video) {
        videoRef.current.play();
      }
    }, 100);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current?.pause();
      videoRef.current?.pause();
    } else {
      audioRef.current?.play();
      if (
        selectedTheme &&
        meditationData[selectedTheme].video &&
        playerMode === "video"
      ) {
        videoRef.current?.play();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 30;
    }
    if (videoRef.current) {
      videoRef.current.currentTime += 30;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 30;
    }
    if (videoRef.current) {
      videoRef.current.currentTime -= 30;
    }
  };

  const resetPlayer = () => {
    setSelectedTheme(null);
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 text-amber-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-200/20 to-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-yellow-200/20 to-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-gradient-to-t from-amber-100/10 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-full px-5 py-2.5 mb-6 border border-amber-300/30">
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-amber-700">
              Mindful Meditation
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Guided Meditation
            </span>
            <br />
            <span className="text-amber-800">Find Your Peace</span>
          </h1>

          <p className="text-amber-700/80 text-lg max-w-2xl mx-auto">
            Select a meditation theme to begin your journey to inner peace and
            mindfulness. All sessions are designed to reduce stress and promote
            relaxation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Meditation Themes */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white/80 to-amber-50/80 backdrop-blur-sm border border-amber-200/50 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-amber-900">
                    Meditation Themes
                  </h3>
                  <p className="text-amber-700/80">
                    Choose your meditation experience
                  </p>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-full text-sm text-amber-700">
                  {Object.keys(meditationData).length} sessions available
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(meditationData).map(([theme, data]) => (
                  <button
                    key={theme}
                    onClick={() => handleThemeSelect(theme)}
                    className={`group relative text-left p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                      selectedTheme === theme
                        ? `border-amber-500 bg-gradient-to-br ${data.color}/20 shadow-lg`
                        : "border-amber-200/50 bg-white/50 hover:border-amber-300/70"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                          selectedTheme === theme
                            ? `bg-gradient-to-br ${data.color} text-white`
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {data.icon}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-lg text-amber-900">
                            {theme}
                          </h4>
                          <span className="text-sm text-amber-600 font-medium bg-amber-100 px-3 py-1 rounded-full">
                            {data.duration}
                          </span>
                        </div>

                        <p className="text-amber-700/80 text-sm mb-4 line-clamp-2">
                          {data.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {data.benefits.map((benefit, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 rounded-full bg-amber-100/50 text-amber-700"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {selectedTheme === theme && (
                      <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Player & Instructions */}
          <div className="space-y-8">
            {/* Player Controls */}
            <div className="bg-gradient-to-br from-white/80 to-amber-50/80 backdrop-blur-sm border border-amber-200/50 rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-3">
                <span className="text-2xl">🎵</span>
                Meditation Player
              </h3>

              {selectedTheme ? (
                <div className="space-y-6">
                  {/* Current Session Info */}
                  <div className="text-center">
                    <div
                      className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-4xl ${
                        meditationData[selectedTheme].video &&
                        showVideo &&
                        playerMode === "video"
                          ? "bg-gradient-to-br from-amber-500 to-yellow-500 text-white"
                          : `bg-gradient-to-br ${meditationData[selectedTheme].color} text-white`
                      }`}
                    >
                      {meditationData[selectedTheme].icon}
                    </div>
                    <h4 className="font-bold text-xl text-amber-900 mb-2">
                      {selectedTheme}
                    </h4>
                    <p className="text-amber-700/80 text-sm">
                      {meditationData[selectedTheme].description}
                    </p>
                  </div>

                  {/* Video/Audio Toggle */}
                  {meditationData[selectedTheme].video && (
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => setPlayerMode("audio")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          playerMode === "audio"
                            ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                        }`}
                      >
                        Audio Only
                      </button>
                      <button
                        onClick={() => setPlayerMode("video")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          playerMode === "video"
                            ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                        }`}
                      >
                        With Video
                      </button>
                    </div>
                  )}

                  {/* Video Player */}
                  {meditationData[selectedTheme].video &&
                    showVideo &&
                    playerMode === "video" && (
                      <div className="relative rounded-xl overflow-hidden bg-amber-900/10">
                        <video
                          ref={videoRef}
                          src={meditationData[selectedTheme].video}
                          className="w-full h-48 object-cover"
                          onTimeUpdate={handleTimeUpdate}
                          loop
                        />
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => setShowVideo(false)}
                            className="w-8 h-8 rounded-full bg-amber-900/70 flex items-center justify-center text-white"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )}

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-amber-700">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer slider-amber"
                    />
                  </div>

                  {/* Player Controls */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-6">
                      <button
                        onClick={skipBackward}
                        className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 hover:bg-amber-200 transition-colors duration-200"
                      >
                        <span className="text-xl">⏪</span>
                      </button>

                      <button
                        onClick={togglePlayPause}
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 ${
                          isPlaying
                            ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white"
                            : "bg-gradient-to-r from-amber-500 to-yellow-500 text-white"
                        }`}
                      >
                        {isPlaying ? "⏸️" : "▶️"}
                      </button>

                      <button
                        onClick={skipForward}
                        className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 hover:bg-amber-200 transition-colors duration-200"
                      >
                        <span className="text-xl">⏩</span>
                      </button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center gap-3">
                      <span className="text-amber-700">🔈</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="flex-1 h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer slider-amber"
                      />
                      <span className="text-amber-700">🔊</span>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <button
                    onClick={resetPlayer}
                    className="w-full py-3 bg-amber-100 text-amber-700 font-medium rounded-xl hover:bg-amber-200 transition-colors duration-200"
                  >
                    Choose Different Meditation
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-6">🧘‍♀️</div>
                  <h4 className="text-xl font-bold text-amber-900 mb-3">
                    Select a Meditation
                  </h4>
                  <p className="text-amber-700/80">
                    Choose a theme from the left to begin your meditation
                    journey
                  </p>
                </div>
              )}

              {/* Hidden Audio Player */}
              {selectedTheme && (
                <audio
                  ref={audioRef}
                  src={meditationData[selectedTheme].audio}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={() =>
                    setDuration(audioRef.current?.duration || 0)
                  }
                  loop
                />
              )}
            </div>

            {/* Meditation Benefits */}
            <div className="bg-gradient-to-br from-amber-400/10 to-yellow-400/10 backdrop-blur-sm border border-amber-300/30 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-3">
                <span className="text-2xl">🌟</span>
                Benefits of Meditation
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-bold text-amber-900 mb-1">
                      Reduces Stress
                    </div>
                    <div className="text-sm text-amber-700/80">
                      Lowers cortisol levels and promotes relaxation
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-bold text-amber-900 mb-1">
                      Improves Focus
                    </div>
                    <div className="text-sm text-amber-700/80">
                      Enhances concentration and attention span
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-bold text-amber-900 mb-1">
                      Promotes Sleep
                    </div>
                    <div className="text-sm text-amber-700/80">
                      Calms the mind for better sleep quality
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-white/80 to-amber-50/80 backdrop-blur-sm border border-amber-200/50 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                Meditation Tips
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-600 text-xs">1</span>
                  </div>
                  <span className="text-amber-700/80 text-sm">
                    Find a quiet, comfortable space
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-600 text-xs">2</span>
                  </div>
                  <span className="text-amber-700/80 text-sm">
                    Use headphones for better immersion
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-600 text-xs">3</span>
                  </div>
                  <span className="text-amber-700/80 text-sm">
                    Focus on your breath throughout
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-600 text-xs">4</span>
                  </div>
                  <span className="text-amber-700/80 text-sm">
                    Practice regularly for best results
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Session Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-amber-400/10 to-yellow-400/10 backdrop-blur-sm border border-amber-300/30 rounded-3xl p-6 text-center">
            <div className="text-4xl mb-4">⏰</div>
            <h4 className="text-xl font-bold text-amber-900 mb-3">
              Daily Practice
            </h4>
            <p className="text-amber-700/80">
              Just 10 minutes daily can significantly reduce stress and improve
              mental clarity
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-400/10 to-amber-400/10 backdrop-blur-sm border border-yellow-300/30 rounded-3xl p-6 text-center">
            <div className="text-4xl mb-4">🧘‍♂️</div>
            <h4 className="text-xl font-bold text-amber-900 mb-3">
              Mindfulness
            </h4>
            <p className="text-amber-700/80">
              Stay present and aware without judgment to cultivate inner peace
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-400/10 to-yellow-400/10 backdrop-blur-sm border border-amber-300/30 rounded-3xl p-6 text-center">
            <div className="text-4xl mb-4">❤️</div>
            <h4 className="text-xl font-bold text-amber-900 mb-3">Self-Care</h4>
            <p className="text-amber-700/80">
              Taking time for meditation is an act of self-love and mental
              wellness
            </p>
          </div>
        </div>

        {/* CSS for slider */}
        <style jsx>{`
          .slider-amber::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: linear-gradient(to right, #f59e0b, #d97706);
            cursor: pointer;
            border: 2px solid #fef3c7;
          }
          .slider-amber::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: linear-gradient(to right, #f59e0b, #d97706);
            cursor: pointer;
            border: 2px solid #fef3c7;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </div>
  );
}

export default MeditationChoiceGame;