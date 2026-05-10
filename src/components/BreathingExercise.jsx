import React, { useState, useEffect, useRef } from "react";

function BreathingExercise() {
  const [breathingPhase, setBreathingPhase] = useState("inhale");
  const [animationClass, setAnimationClass] = useState("inhale");
  const [countdown, setCountdown] = useState(4);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [breathType, setBreathType] = useState("calm"); // calm, focus, sleep, energy
  const [breathPattern, setBreathPattern] = useState({
    inhale: 4,
    hold: 2,
    exhale: 6,
    pause: 1,
  });

  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const timeRef = useRef(null);

  const breathPatterns = {
    calm: {
      inhale: 4,
      hold: 2,
      exhale: 6,
      pause: 1,
      color: "from-emerald-500 to-teal-600",
    },
    focus: {
      inhale: 4,
      hold: 4,
      exhale: 4,
      pause: 2,
      color: "from-green-500 to-emerald-600",
    },
    sleep: {
      inhale: 4,
      hold: 0,
      exhale: 8,
      pause: 0,
      color: "from-teal-500 to-cyan-600",
    },
    energy: {
      inhale: 2,
      hold: 1,
      exhale: 2,
      pause: 1,
      color: "from-lime-500 to-green-600",
    },
  };

  useEffect(() => {
    if (isPlaying) {
      startBreathingCycle();
      startTimer();
    }

    return () => {
      clearInterval(timerRef.current);
      clearInterval(countdownRef.current);
      clearInterval(timeRef.current);
    };
  }, [isPlaying, breathType]);

  const startBreathingCycle = () => {
    clearInterval(timerRef.current);
    clearInterval(countdownRef.current);

    const pattern = breathPatterns[breathType];
    const totalCycleTime =
      (pattern.inhale + pattern.hold + pattern.exhale + pattern.pause) * 1000;
    let phaseIndex = 0;
    const phases = ["inhale", "hold", "exhale", "pause"];

    const updatePhase = () => {
      const phase = phases[phaseIndex];
      setBreathingPhase(phase);
      setAnimationClass(phase);

      let nextCountdown;
      switch (phase) {
        case "inhale":
          nextCountdown = pattern.inhale;
          break;
        case "hold":
          nextCountdown = pattern.hold;
          break;
        case "exhale":
          nextCountdown = pattern.exhale;
          break;
        case "pause":
          nextCountdown = pattern.pause;
          break;
        default:
          nextCountdown = 4;
      }
      setCountdown(nextCountdown);

      phaseIndex = (phaseIndex + 1) % phases.length;
      if (phase === "exhale") {
        setCycleCount((prev) => prev + 1);
      }
    };

    updatePhase();

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          updatePhase();
          const phase =
            phases[(phases.indexOf(breathingPhase) + 1) % phases.length];
          switch (phase) {
            case "inhale":
              return pattern.inhale;
            case "hold":
              return pattern.hold;
            case "exhale":
              return pattern.exhale;
            case "pause":
              return pattern.pause;
            default:
              return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    timerRef.current = setInterval(() => {
      updatePhase();
    }, totalCycleTime);
  };

  const startTimer = () => {
    clearInterval(timeRef.current);
    timeRef.current = setInterval(() => {
      setTotalTime((prev) => prev + 1);
    }, 1000);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      clearInterval(timerRef.current);
      clearInterval(countdownRef.current);
      clearInterval(timeRef.current);
    } else {
      startBreathingCycle();
      startTimer();
    }
    setIsPlaying(!isPlaying);
  };

  const resetExercise = () => {
    setIsPlaying(false);
    setBreathingPhase("inhale");
    setAnimationClass("inhale");
    setCountdown(4);
    setCycleCount(0);
    setTotalTime(0);
    clearInterval(timerRef.current);
    clearInterval(countdownRef.current);
    clearInterval(timeRef.current);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getPhaseInstruction = () => {
    switch (breathingPhase) {
      case "inhale":
        return "Breathe in slowly through your nose";
      case "hold":
        return "Hold your breath gently";
      case "exhale":
        return "Breathe out slowly through your mouth";
      case "pause":
        return "Rest and relax";
      default:
        return "Breathe deeply";
    }
  };

  const getPhaseEmoji = () => {
    switch (breathingPhase) {
      case "inhale":
        return "🌬️";
      case "hold":
        return "⏱️";
      case "exhale":
        return "🌀";
      case "pause":
        return "😌";
      default:
        return "💨";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-900/10 to-teal-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-900/10 to-emerald-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-gradient-to-t from-emerald-900/5 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-full px-5 py-2.5 mb-6">
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-emerald-300">
              Mindful Breathing
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Guided Breathing
            </span>
            <br />
            <span className="text-gray-100">Exercise</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Calm your mind and reduce stress through mindful breathing. Follow
            the rhythm to find your center.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Breathing Circle */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-8">
              {/* Main Breathing Circle */}
              <div className="relative flex justify-center items-center mb-8">
                <div className="relative">
                  {/* Outer Ring */}
                  <div className="absolute inset-0">
                    <div
                      className={`w-[400px] h-[400px] rounded-full border-4 border-emerald-500/20 animate-pulse`}
                    ></div>
                  </div>

                  {/* Animated Circle */}
                  <div
                    className={`relative w-[350px] h-[350px] rounded-full flex items-center justify-center transition-all duration-1000 ${
                      animationClass === "inhale"
                        ? "scale-110 bg-gradient-to-r from-emerald-500/30 to-teal-500/30"
                        : animationClass === "hold"
                        ? "scale-100 bg-gradient-to-r from-emerald-500/20 to-teal-500/20"
                        : animationClass === "exhale"
                        ? "scale-90 bg-gradient-to-r from-teal-500/20 to-emerald-500/20"
                        : "scale-95 bg-gradient-to-r from-emerald-500/10 to-teal-500/10"
                    }`}
                  >
                    {/* Inner Content */}
                    <div className="text-center">
                      <div className="text-6xl mb-4">{getPhaseEmoji()}</div>
                      <div className="text-7xl font-bold text-emerald-400 mb-2">
                        {countdown}
                      </div>
                      <div className="text-2xl font-bold text-gray-100 uppercase tracking-wider">
                        {breathingPhase}
                      </div>
                    </div>

                    {/* Breathing Guides */}
                    <div className="absolute inset-0">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-4 h-4 rounded-full ${
                            animationClass === "inhale"
                              ? "bg-emerald-400"
                              : animationClass === "exhale"
                              ? "bg-teal-400"
                              : "bg-emerald-300/50"
                          }`}
                          style={{
                            top: `${
                              50 + 40 * Math.cos((i * 45 * Math.PI) / 180)
                            }%`,
                            left: `${
                              50 + 40 * Math.sin((i * 45 * Math.PI) / 180)
                            }%`,
                            animation:
                              animationClass === "inhale"
                                ? `pulse 2s infinite ${i * 0.1}s`
                                : animationClass === "exhale"
                                ? `pulse 2s infinite reverse ${i * 0.1}s`
                                : "none",
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Phase Indicators */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {["inhale", "hold", "exhale", "pause"].map((phase) => (
                      <div
                        key={phase}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          breathingPhase === phase
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                            : "bg-gray-800/50 text-gray-400"
                        }`}
                      >
                        {phase.charAt(0).toUpperCase() + phase.slice(1)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Control Panel */}
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="text-center sm:text-left">
                    <div className="text-sm text-gray-400 mb-1">
                      Current Pattern
                    </div>
                    <div className="text-xl font-bold text-emerald-400 capitalize">
                      {breathType}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-400">
                        {cycleCount}
                      </div>
                      <div className="text-sm text-gray-400">Cycles</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-teal-400">
                        {formatTime(totalTime)}
                      </div>
                      <div className="text-sm text-gray-400">Duration</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={togglePlayPause}
                      className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    >
                      {isPlaying ? (
                        <span className="text-xl">⏸️</span>
                      ) : (
                        <span className="text-xl">▶️</span>
                      )}
                    </button>
                    <button
                      onClick={resetExercise}
                      className="w-14 h-14 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    >
                      <span className="text-xl">↺</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Instruction Panel */}
              <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-2xl p-6 border border-emerald-800/30">
                <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-3">
                  <span className="text-2xl">📝</span>
                  Breathing Guide
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600/20 to-teal-600/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{getPhaseEmoji()}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-300 mb-1">
                        {breathingPhase.charAt(0).toUpperCase() +
                          breathingPhase.slice(1)}{" "}
                        Phase
                      </h4>
                      <p className="text-gray-300">{getPhaseInstruction()}</p>
                      <div className="mt-2 text-sm text-gray-400">
                        {countdown} second{countdown !== 1 ? "s" : ""} remaining
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Patterns and Stats */}
          <div className="space-y-8">
            {/* Breathing Patterns */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                Breathing Patterns
              </h3>
              <div className="space-y-4">
                {Object.entries(breathPatterns).map(([type, pattern]) => (
                  <button
                    key={type}
                    onClick={() => {
                      setBreathType(type);
                      if (isPlaying) {
                        resetExercise();
                        setIsPlaying(true);
                      }
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                      breathType === type
                        ? `bg-gradient-to-r ${pattern.color}/20 border-emerald-500/50`
                        : "bg-gray-800/20 border-gray-700/30 hover:border-emerald-500/30"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-bold text-gray-100 capitalize">
                        {type}
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs ${
                          breathType === type
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                            : "bg-gray-800/50 text-gray-400"
                        }`}
                      >
                        {pattern.inhale}-{pattern.hold}-{pattern.exhale}-
                        {pattern.pause}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">
                      {type === "calm" && "Reduce anxiety and find peace"}
                      {type === "focus" && "Improve concentration and clarity"}
                      {type === "sleep" &&
                        "Prepare your body for restful sleep"}
                      {type === "energy" &&
                        "Boost energy and refresh your mind"}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Panel */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                <span className="text-2xl">📊</span>
                Session Stats
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Calm Progress</span>
                    <span className="text-emerald-400">
                      {Math.min(cycleCount * 5, 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(cycleCount * 5, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-400 mb-1">
                      {cycleCount}
                    </div>
                    <div className="text-sm text-gray-400">Breath Cycles</div>
                  </div>
                  <div className="bg-gradient-to-br from-teal-900/20 to-emerald-900/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-teal-400 mb-1">
                      {totalTime}
                    </div>
                    <div className="text-sm text-gray-400">Seconds</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700/30">
                  <h4 className="font-bold text-gray-100 mb-3">
                    Benefits Achieved
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <span className="text-emerald-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-300 text-sm">
                        Reduced heart rate
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <span className="text-emerald-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-300 text-sm">
                        Lowered stress levels
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <span
                          className={`text-emerald-400 text-sm ${
                            cycleCount >= 3 ? "" : "opacity-30"
                          }`}
                        >
                          {cycleCount >= 3 ? "✓" : "○"}
                        </span>
                      </div>
                      <span
                        className={`text-sm ${
                          cycleCount >= 3 ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Improved focus
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-sm border border-emerald-800/30 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                Tips for Better Breathing
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-400 text-sm">1</span>
                  </div>
                  <span className="text-gray-300 text-sm">
                    Sit comfortably with your back straight
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-400 text-sm">2</span>
                  </div>
                  <span className="text-gray-300 text-sm">
                    Close your eyes to enhance focus
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-400 text-sm">3</span>
                  </div>
                  <span className="text-gray-300 text-sm">
                    Place one hand on your chest, one on your belly
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-400 text-sm">4</span>
                  </div>
                  <span className="text-gray-300 text-sm">
                    Practice daily for best results
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CSS for animations */}
        <style jsx>{`
          @keyframes pulse {
            0%,
            100% {
              opacity: 0.5;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
          }
          @keyframes pulseReverse {
            0%,
            100% {
              opacity: 1;
              transform: scale(1.2);
            }
            50% {
              opacity: 0.5;
              transform: scale(0.8);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default BreathingExercise;