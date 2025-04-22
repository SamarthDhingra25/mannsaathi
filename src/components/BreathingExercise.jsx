import React, { useState, useEffect } from 'react';
import './BreathingExercise.css';

function BreathingExercise() {
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [animationClass, setAnimationClass] = useState('inhale');

  useEffect(() => {
    const timer = setInterval(() => {
      setBreathingPhase((prevPhase) => (prevPhase === 'inhale' ? 'exhale' : 'inhale'));
      setAnimationClass((prevClass) => (prevClass === 'inhale' ? 'exhale' : 'inhale'));
    }, 5000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="breathing-exercise">
      <h2 className="title">Breathing Exercise</h2>
      <div className="circle-container">
        <div className={`breathing-circle ${animationClass}`}></div>
      </div>
      <p className="instruction">
        {breathingPhase === 'inhale' ? 'Inhale' : 'Exhale'}
      </p>
      <p className="tip">Take deep, slow breaths. Focus on your breath to feel more relaxed.</p>
    </div>
  );
}

export default BreathingExercise;
