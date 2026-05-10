import React, { useState } from "react";

const questions = [
  { question: "How often do you feel nervous or anxious?", options: ["Never", "Sometimes", "Often", "Always"], scores: [0,1,2,3], icon:"😌"},
  { question: "How well are you sleeping lately?", options: ["Very well","Okay","Not great","Poor"], scores:[0,1,2,3], icon:"😴"},
  { question: "How often do you feel overwhelmed?", options: ["Rarely","Sometimes","Often","Almost Always"], scores:[0,1,2,3], icon:"😰"},
  { question: "Do you experience sudden mood changes?", options: ["Never","Occasionally","Frequently","All the time"], scores:[0,1,2,3], icon:"🎭"},
  { question: "How connected do you feel with friends/family?", options: ["Very connected","Somewhat","Not much","Disconnected"], scores:[0,1,2,3], icon:"👨‍👩‍👧‍👦"},
];

function AssessmentQuiz() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleOptionChange = (qIdx, oIdx) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = oIdx;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const total = answers.reduce((acc, answer, i) => {
      return acc + (answer !== null ? questions[i].scores[answer] : 0);
    }, 0);
    setScore(total);
    setSubmitted(true);
  };

  const getResultText = () => {
    if (score <= 5) return "You're doing great! Keep up the good work. 🧘‍♀️";
    if (score <= 9) return "You're under moderate stress. Consider mindfulness or breathing exercises.";
    return "High stress levels detected. Try relaxing activities or talk to someone. 💬";
  };

  const getResultColor = () => {
    if (score <= 5) return "from-emerald-500 to-green-600";
    if (score <= 9) return "from-amber-500 to-orange-600";
    return "from-rose-500 to-red-600";
  };

  const getResultLevel = () => {
    if (score <= 5) return "Low Stress";
    if (score <= 9) return "Moderate Stress";
    return "High Stress";
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setSubmitted(false);
    setAnswers(Array(questions.length).fill(null));
    setScore(0);
    setCurrentQuestion(0);
  };

  // Calculate response counts
  const lowStressCount = answers.filter(a => a === 0).length;
  const moderateCount = answers.filter(a => a === 1 || a === 2).length;
  const highStressCount = answers.filter(a => a === 3).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-x-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-900/10 to-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-gradient-to-r from-purple-900/10 to-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-4xl relative">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-6">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-300">Self-Assessment Tool</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Mental Wellness</span>
            <br className="hidden sm:block" />
            <span className="text-gray-100"> Self-Assessment</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Take a few minutes to understand your current mental state. This assessment helps identify areas where you might need support.
          </p>
        </div>

        {/* Progress Bar - Only show when quiz is active */}
        {!submitted && (
          <div className="mb-6 sm:mb-8 px-4">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm text-gray-400">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-xs sm:text-sm font-medium text-purple-400">
                {(((currentQuestion + 1) / questions.length) * 100).toFixed(0)}% Complete
              </span>
            </div>
            <div className="h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Quiz Content */}
        {!submitted ? (
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mx-4">
            {/* Current Question */}
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl sm:text-2xl">{questions[currentQuestion].icon}</span>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">Question {currentQuestion + 1}</div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100">{questions[currentQuestion].question}</h3>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {questions[currentQuestion].options.map((option, j) => (
                  <div 
                    key={j} 
                    className={`group cursor-pointer transition-all duration-300 ${answers[currentQuestion] === j ? "transform scale-[1.02]" : "hover:scale-[1.02]"}`} 
                    onClick={() => handleOptionChange(currentQuestion, j)}
                  >
                    <div className={`relative overflow-hidden rounded-xl sm:rounded-2xl border-2 ${answers[currentQuestion] === j ? "border-purple-500 bg-gradient-to-br from-purple-600/20 to-blue-600/20" : "border-gray-700/50 bg-gray-800/20 hover:border-purple-500/50"} p-4 sm:p-6 backdrop-blur-sm`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${answers[currentQuestion] === j ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-700/50"}`}>
                            {answers[currentQuestion] === j ? (
                              <span className="text-sm sm:text-lg">✓</span>
                            ) : (
                              <span className="text-gray-400 text-sm sm:text-base">{String.fromCharCode(65 + j)}</span>
                            )}
                          </div>
                          <span className={`text-base sm:text-lg font-medium ${answers[currentQuestion] === j ? "text-white" : "text-gray-300"}`}>
                            {option}
                          </span>
                        </div>
                        {answers[currentQuestion] === j && (
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <button 
                  onClick={prevQuestion} 
                  disabled={currentQuestion === 0}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 ${currentQuestion === 0 ? "opacity-50 cursor-not-allowed" : "text-gray-400 hover:text-white hover:bg-gray-800/30"}`}
                  aria-label="Previous question"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm sm:text-base">Previous</span>
                </button>

                <div className="flex items-center gap-3 sm:gap-4">
                  {answers.every(a => a !== null) && currentQuestion === questions.length - 1 ? (
                    <button 
                      onClick={calculateScore}
                      className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/40 hover:scale-105"
                      aria-label="Submit assessment"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                      <span className="relative flex items-center gap-2 sm:gap-3">
                        Submit Assessment
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    </button>
                  ) : (
                    <button 
                      onClick={nextQuestion} 
                      disabled={answers[currentQuestion] === null}
                      className={`group px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 flex items-center gap-2 sm:gap-3 ${answers[currentQuestion] === null ? "opacity-50 cursor-not-allowed bg-gray-700/30 text-gray-500" : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-blue-900/40 hover:scale-105"}`}
                      aria-label="Next question"
                    >
                      {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Question Dots */}
            <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
              {questions.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentQuestion(idx)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${currentQuestion === idx ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-125" : answers[idx] !== null ? "bg-gray-500 hover:bg-gray-400" : "bg-gray-700 hover:bg-gray-600"}`}
                  title={`Question ${idx + 1}`}
                  aria-label={`Go to question ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mx-4 overflow-hidden">
            {/* Score Circle */}
            <div className="flex flex-col items-center mb-8 sm:mb-10">
              <div className="relative mb-6 sm:mb-8">
                <div className={`absolute inset-0 bg-gradient-to-r ${getResultColor()} rounded-full blur-2xl opacity-30`}></div>
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/30 flex flex-col items-center justify-center">
                  <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${getResultColor()} bg-clip-text text-transparent mb-2`}>
                    {score}
                  </div>
                  <div className="text-base sm:text-lg text-gray-400">Total Score</div>
                  <div className={`text-xs sm:text-sm font-semibold mt-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r ${getResultColor()}/20 backdrop-blur-sm`}>
                    {getResultLevel()}
                  </div>
                </div>
              </div>

              <div className="text-center max-w-2xl">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-4 sm:mb-6">Assessment Results</h3>
                <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                  {getResultText()}
                </p>

                {/* Score Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
                  <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-1 sm:mb-2">{lowStressCount}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Low Stress Responses</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-amber-400 mb-1 sm:mb-2">{moderateCount}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Moderate Responses</div>
                  </div>
                  <div className="bg-gradient-to-br from-rose-900/20 to-red-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-rose-400 mb-1 sm:mb-2">{highStressCount}</div>
                    <div className="text-xs sm:text-sm text-gray-400">High Stress Responses</div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-100 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">💡</span>Recommended Next Steps
                  </h4>
                  <div className="space-y-3 sm:space-y-4">
                    {score <= 5 ? (
                      <>
                        <p className="text-gray-300 text-sm sm:text-base">Continue your healthy habits! Consider exploring:</p>
                        <ul className="text-gray-400 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full"></div>
                            Mindful meditation for maintenance
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full"></div>
                            Regular breathing exercises
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full"></div>
                            Stress relief games for relaxation
                          </li>
                        </ul>
                      </>
                    ) : score <= 9 ? (
                      <>
                        <p className="text-gray-300 text-sm sm:text-base">Try these stress-relief techniques:</p>
                        <ul className="text-gray-400 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full"></div>
                            Guided meditation sessions
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full"></div>
                            Deep breathing exercises
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full"></div>
                            Connect with our text chat support
                          </li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-300 text-sm sm:text-base">We recommend immediate attention:</p>
                        <ul className="text-gray-400 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500 rounded-full"></div>
                            Connect with audio/video therapy
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500 rounded-full"></div>
                            Try emergency breathing exercises
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500 rounded-full"></div>
                            Access emergency support resources
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button
                    onClick={resetQuiz}
                    className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/40 hover:scale-105"
                    aria-label="Retake the assessment quiz"
                  >
                    Retake Assessment
                  </button>
                  <button
                    onClick={() => alert("This is a demo. In a real app, this would connect you to resources.")}
                    className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-full text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-gray-900/40 hover:scale-105 border border-gray-600"
                    aria-label="Get additional resources"
                  >
                    Get Resources
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssessmentQuiz;