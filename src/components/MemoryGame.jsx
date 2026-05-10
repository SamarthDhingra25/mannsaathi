import React, { useState, useEffect } from "react";

const initialCardsArray = [
  { id: 1, content: "🧠", name: "Brain", category: "mind" },
  { id: 2, content: "🌈", name: "Rainbow", category: "nature" },
  { id: 3, content: "☀️", name: "Sun", category: "nature" },
  { id: 4, content: "🌙", name: "Moon", category: "space" },
  { id: 5, content: "🌸", name: "Flower", category: "nature" },
  { id: 6, content: "🌊", name: "Wave", category: "water" },
  { id: 7, content: "🌳", name: "Tree", category: "nature" },
  { id: 8, content: "🦋", name: "Butterfly", category: "animals" },
  { id: 9, content: "🍃", name: "Leaf", category: "nature" },
  { id: 10, content: "🕊️", name: "Dove", category: "animals" },
  { id: 11, content: "💧", name: "Water", category: "water" },
  { id: 12, content: "✨", name: "Sparkle", category: "magic" },
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing"); // playing, won
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [difficulty, setDifficulty] = useState("medium"); // easy: 6 cards, medium: 12, hard: 18
  const [hints, setHints] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  useEffect(() => {
    if (matched.length > 0 && matched.length === cards.length / 2) {
      setGameStatus("won");
      setIsTimerRunning(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [matched, cards]);

  const startNewGame = () => {
    let numPairs;
    switch (difficulty) {
      case "easy":
        numPairs = 6;
        break;
      case "medium":
        numPairs = 8;
        break;
      case "hard":
        numPairs = 12;
        break;
      default:
        numPairs = 8;
    }

    const selectedCards = initialCardsArray.slice(0, numPairs);
    const duplicatedCards = [...selectedCards, ...selectedCards]
      .sort(() => 0.5 - Math.random())
      .map((card, index) => ({
        ...card,
        uniqueId: index,
        isHint: false,
      }));

    setCards(duplicatedCards);
    setSelected([]);
    setMatched([]);
    setMoves(0);
    setTime(0);
    setGameStatus("playing");
    setIsTimerRunning(true);
    setHints(3);
  };

  const handleClick = (card) => {
    if (gameStatus === "won") return;
    if (
      selected.length < 2 &&
      !selected.find((c) => c.uniqueId === card.uniqueId)
    ) {
      setSelected([...selected, card]);
      setMoves((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      if (first.content === second.content) {
        setMatched((prev) => [...prev, first.content]);
        setTimeout(() => setSelected([]), 500);
      } else {
        setTimeout(() => setSelected([]), 1000);
      }
    }
  }, [selected]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const useHint = () => {
    if (hints > 0 && gameStatus === "playing") {
      const unmatchedCards = cards.filter(
        (card) =>
          !matched.includes(card.content) &&
          !selected.find((c) => c.uniqueId === card.uniqueId)
      );

      if (unmatchedCards.length >= 2) {
        const randomCard =
          unmatchedCards[Math.floor(Math.random() * unmatchedCards.length)];
        const matchingCard = unmatchedCards.find(
          (card) =>
            card.content === randomCard.content &&
            card.uniqueId !== randomCard.uniqueId
        );

        const updatedCards = cards.map((card) =>
          card.uniqueId === randomCard.uniqueId ||
          card.uniqueId === matchingCard.uniqueId
            ? { ...card, isHint: true }
            : card
        );

        setCards(updatedCards);
        setHints((prev) => prev - 1);

        setTimeout(() => {
          const resetCards = updatedCards.map((card) => ({
            ...card,
            isHint: false,
          }));
          setCards(resetCards);
        }, 1500);
      }
    }
  };

  const calculateScore = () => {
    const timeBonus = Math.max(0, 300 - time);
    const movesBonus = Math.max(0, 50 - moves);
    const difficultyMultiplier = {
      easy: 1,
      medium: 1.5,
      hard: 2,
    }[difficulty];

    return Math.floor(
      (timeBonus + movesBonus + hints * 10) * difficultyMultiplier
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-900/10 to-teal-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-900/10 to-emerald-900/10 rounded-full blur-3xl"></div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              {
                ["✨", "🎉", "🥳", "🌟", "💫", "🎊"][
                  Math.floor(Math.random() * 6)
                ]
              }
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-full px-5 py-2.5 mb-6">
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-emerald-300">
              Brain Training Game
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Memory Match
            </span>
            <br />
            <span className="text-gray-100">Mindfulness Game</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Improve your memory and focus while reducing stress. Match all pairs
            to win!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Game Stats */}
          <div className="space-y-8">
            {/* Game Stats */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                <span className="text-2xl">📊</span>
                Game Statistics
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">
                      {moves}
                    </div>
                    <div className="text-sm text-gray-400">Moves</div>
                  </div>
                  <div className="bg-gradient-to-br from-teal-900/20 to-emerald-900/20 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-teal-400 mb-2">
                      {formatTime(time)}
                    </div>
                    <div className="text-sm text-gray-400">Time</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-emerald-400">
                      {matched.length}/{cards.length / 2} Pairs
                    </span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (matched.length / (cards.length / 2)) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">
                    Current Score
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {calculateScore()}
                  </div>
                </div>
              </div>
            </div>

            {/* Difficulty Settings */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                <span className="text-2xl">⚙️</span>
                Game Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="text-gray-400 mb-3">Difficulty Level</div>
                  <div className="grid grid-cols-3 gap-2">
                    {["easy", "medium", "hard"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          difficulty === level
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                            : "bg-gray-800/50 text-gray-400 hover:bg-gray-800/70"
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    {difficulty === "easy" && "6 pairs • Relaxed pace"}
                    {difficulty === "medium" && "8 pairs • Balanced challenge"}
                    {difficulty === "hard" && "12 pairs • Memory test"}
                  </div>
                </div>
              </div>
            </div>

            {/* Hints */}
            <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-sm border border-emerald-800/30 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                Hints Available
              </h3>

              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-emerald-400 mb-2">
                  {hints}
                </div>
                <div className="text-gray-400">Hints Remaining</div>
              </div>

              <button
                onClick={useHint}
                disabled={hints === 0 || gameStatus !== "playing"}
                className={`w-full py-4 rounded-xl font-medium transition-all duration-300 ${
                  hints > 0 && gameStatus === "playing"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:scale-105 hover:shadow-xl hover:shadow-emerald-900/30"
                    : "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                }`}
              >
                Use Hint ({hints} left)
              </button>

              <p className="text-xs text-gray-400 mt-4 text-center">
                Reveals a matching pair for 1.5 seconds
              </p>
            </div>
          </div>

          {/* Center - Game Board */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-8">
              {/* Game Header */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-100">
                      Memory Board
                    </h3>
                    <p className="text-gray-400">Match all pairs to win</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={startNewGame}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-full hover:scale-105 hover:shadow-xl hover:shadow-emerald-900/30 transition-all duration-300"
                  >
                    New Game
                  </button>
                </div>
              </div>

              {/* Game Status */}
              {gameStatus === "won" ? (
                <div className="mb-8 bg-gradient-to-r from-emerald-900/20 to-teal-900/20 rounded-2xl p-6 text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-3xl font-bold text-emerald-400 mb-2">
                    Perfect Memory!
                  </h3>
                  <p className="text-gray-300 mb-4">
                    You matched all {cards.length / 2} pairs in {moves} moves
                    and {formatTime(time)}!
                  </p>
                  <div className="text-2xl font-bold text-emerald-300 mb-4">
                    Final Score: {calculateScore()}
                  </div>
                  <button
                    onClick={startNewGame}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full text-lg hover:scale-105 hover:shadow-xl hover:shadow-emerald-900/30 transition-all duration-300"
                  >
                    Play Again
                  </button>
                </div>
              ) : (
                <div className="mb-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        Pairs Found
                      </div>
                      <div className="text-3xl font-bold text-emerald-400">
                        {matched.length}/{cards.length / 2}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Time</div>
                      <div className="text-3xl font-bold text-teal-400">
                        {formatTime(time)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Moves</div>
                      <div className="text-3xl font-bold text-emerald-400">
                        {moves}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Memory Grid */}
              <div className="memory-grid">
                {cards.map((card) => {
                  const isFlipped =
                    selected.find((c) => c.uniqueId === card.uniqueId) ||
                    matched.includes(card.content);
                  const isHint = card.isHint;

                  return (
                    <div
                      key={card.uniqueId}
                      className={`memory-card group relative cursor-pointer transition-all duration-500 ${
                        isFlipped ? "flipped" : ""
                      } ${isHint ? "hint" : ""}`}
                      onClick={() => handleClick(card)}
                    >
                      {/* Card Back */}
                      <div className="memory-card-back absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl">
                        <div className="text-4xl">?</div>
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-2xl"></div>
                      </div>

                      {/* Card Front */}
                      <div className="memory-card-front absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-emerald-500/30">
                        <div className="text-5xl mb-2">{card.content}</div>
                        <div className="text-sm text-gray-400 font-medium">
                          {card.name}
                        </div>
                        <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-emerald-900/30 text-emerald-300">
                          {card.category}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Instructions */}
              <div className="mt-8 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-gray-100 mb-3 flex items-center gap-2">
                  <span className="text-xl">📋</span>
                  How to Play
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-400">1</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-100 mb-1">
                        Click Cards
                      </div>
                      <div className="text-sm text-gray-300">
                        Click on cards to flip them over
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-400">2</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-100 mb-1">
                        Match Pairs
                      </div>
                      <div className="text-sm text-gray-300">
                        Find two cards with matching emojis
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-400">3</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-100 mb-1">
                        Use Strategy
                      </div>
                      <div className="text-sm text-gray-300">
                        Remember positions to make fewer moves
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-400">4</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-100 mb-1">
                        Win the Game
                      </div>
                      <div className="text-sm text-gray-300">
                        Match all pairs to complete the game
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-sm border border-emerald-800/30 rounded-3xl p-6">
            <div className="text-4xl mb-4">🧘</div>
            <h4 className="text-xl font-bold text-gray-100 mb-3">
              Reduces Stress
            </h4>
            <p className="text-gray-300">
              Memory games promote mindfulness and help calm the mind by
              focusing attention.
            </p>
          </div>
          <div className="bg-gradient-to-br from-teal-900/20 to-emerald-900/20 backdrop-blur-sm border border-teal-800/30 rounded-3xl p-6">
            <div className="text-4xl mb-4">💪</div>
            <h4 className="text-xl font-bold text-gray-100 mb-3">
              Improves Focus
            </h4>
            <p className="text-gray-300">
              Regular play enhances concentration, attention span, and cognitive
              flexibility.
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-sm border border-emerald-800/30 rounded-3xl p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-xl font-bold text-gray-100 mb-3">
              Brain Exercise
            </h4>
            <p className="text-gray-300">
              Challenges your working memory and spatial recall abilities for
              mental fitness.
            </p>
          </div>
        </div>

        {/* CSS Styles */}
        <style jsx>{`
          .memory-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin: 0 auto;
          }

          @media (min-width: 768px) {
            .memory-grid {
              grid-template-columns: repeat(4, 1fr);
              gap: 20px;
            }
          }

          @media (min-width: 1024px) {
            .memory-grid {
              grid-template-columns: repeat(4, 1fr);
              gap: 24px;
            }
          }

          .memory-card {
            position: relative;
            aspect-ratio: 3/4;
            transform-style: preserve-3d;
            transition: transform 0.6s;
            border-radius: 16px;
          }

          .memory-card.flipped {
            transform: rotateY(180deg);
          }

          .memory-card.hint .memory-card-back {
            animation: hintGlow 1.5s ease-in-out;
          }

          .memory-card-back,
          .memory-card-front {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .memory-card-front {
            transform: rotateY(180deg);
          }

          .memory-card:hover:not(.flipped) .memory-card-back {
            transform: scale(1.05);
          }

          @keyframes hintGlow {
            0%,
            100% {
              box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
            }
            50% {
              box-shadow: 0 0 30px rgba(16, 185, 129, 0.8);
            }
          }

          @keyframes fall {
            0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default MemoryGame;