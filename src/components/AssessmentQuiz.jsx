import React, { useState } from 'react';

const questions = [
  {
    question: "How often do you feel nervous or anxious?",
    options: ["Never", "Sometimes", "Often", "Always"],
    scores: [0, 1, 2, 3],
  },
  {
    question: "How well are you sleeping lately?",
    options: ["Very well", "Okay", "Not great", "Poor"],
    scores: [0, 1, 2, 3],
  },
  {
    question: "How often do you feel overwhelmed?",
    options: ["Rarely", "Sometimes", "Often", "Almost Always"],
    scores: [0, 1, 2, 3],
  },
  {
    question: "Do you experience sudden mood changes?",
    options: ["Never", "Occasionally", "Frequently", "All the time"],
    scores: [0, 1, 2, 3],
  },
  {
    question: "How connected do you feel with friends/family?",
    options: ["Very connected", "Somewhat", "Not much", "Disconnected"],
    scores: [0, 1, 2, 3],
  },
];

function AssessmentQuiz() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
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
    if (score <= 5) return "You're doing great! Keep it up. 🧘‍♀️";
    if (score <= 9) return "You're under moderate stress. Consider mindfulness or breathing exercises.";
    return "High stress levels detected. Try relaxing activities or talk to someone. 💬";
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🧠 Anxiety & Stress Self-Assessment</h2>
      {!submitted ? (
        questions.map((q, i) => (
          <div key={i} className="mb-4">
            <h5>{i + 1}. {q.question}</h5>
            {q.options.map((option, j) => (
              <div key={j} className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name={`question-${i}`}
                  id={`q${i}-option${j}`}
                  checked={answers[i] === j}
                  onChange={() => handleOptionChange(i, j)}
                />
                <label className="form-check-label" htmlFor={`q${i}-option${j}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="alert alert-info text-center">
          <h4>Your Score: {score}</h4>
          <p>{getResultText()}</p>
        </div>
      )}
      {!submitted && (
        <div className="text-center">
          <button
            className="btn btn-primary mt-3"
            disabled={answers.includes(null)}
            onClick={calculateScore}
          >
            Submit Assessment
          </button>
        </div>
      )}
    </div>
  );
}

export default AssessmentQuiz;
