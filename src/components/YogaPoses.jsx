import React, { useState, useEffect, useRef } from 'react';
import './YogaPoses.css'; // This should be a separate CSS file

const yogaPoses = [
  {
    name: "Child's Pose (Balasana)",
    image: "/media/bal.jpg",
    benefit: "Relaxes the body and calms the mind.",
    duration: "Hold for 1-2 minutes",
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    name: "Cat-Cow Pose",
    image: "/media/download.jpg",
    benefit: "Relieves tension in spine and improves breathing.",
    duration: "Repeat 10-15 times",
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    name: "Legs-Up-the-Wall Pose",
    image: "/media/c.jpg",
    benefit: "Improves blood circulation and reduces swelling.",
    duration: "Hold for 5-10 minutes",
    color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    name: "Shavasana",
    image: "/media/sh.jpg",
    benefit: "Reduces stress and anxiety, promotes deep relaxation.",
    duration: "Hold for 5-15 minutes",
    color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
];

function YogaPoses() {
  const [isSessionActive, setSessionActive] = useState(false);
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  const musicURL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  useEffect(() => {
    if (isSessionActive) {
      // Start the pose timer
      setTimeLeft(10);
      
      // Clear any existing intervals
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      
      // Timer for pose countdown
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setCurrentPoseIndex(prevIndex => (prevIndex + 1) % yogaPoses.length);
            return 10;
          }
          return prev - 1;
        });
      }, 1000);

      // Progress bar update
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + (100 / 10); // Increment by 10% per second
        });
      }, 1000);

      // Play music
      const newAudio = new Audio(musicURL);
      newAudio.loop = true;
      newAudio.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log("Audio play failed:", error);
      });
      setAudio(newAudio);
    } else {
      // Clear intervals and reset
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeLeft(10);
      setProgress(0);
      
      // Stop music
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSessionActive]);

  const toggleSession = () => {
    setSessionActive(!isSessionActive);
  };

  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipToNextPose = () => {
    setCurrentPoseIndex((prevIndex) => (prevIndex + 1) % yogaPoses.length);
    setTimeLeft(10);
    setProgress(0);
  };

  const skipToPreviousPose = () => {
    setCurrentPoseIndex((prevIndex) => 
      prevIndex === 0 ? yogaPoses.length - 1 : prevIndex - 1
    );
    setTimeLeft(10);
    setProgress(0);
  };

  return (
    <div className="yoga-container">
      <div className="yoga-header">
        <h1 className="yoga-title">🧘‍♀️ Yoga for Stress Relief</h1>
        <p className="yoga-subtitle">Find your inner peace through mindful movement</p>
      </div>

      <div className="session-controls">
        <button
          className={`session-toggle-btn ${isSessionActive ? 'active' : ''}`}
          onClick={toggleSession}
        >
          <span className="btn-icon">{isSessionActive ? '⏸️' : '▶️'}</span>
          <span>{isSessionActive ? 'Pause Session' : 'Start Yoga Session'}</span>
        </button>
        
        {isSessionActive && audio && (
          <button
            className="music-toggle-btn"
            onClick={toggleMusic}
          >
            {isPlaying ? '🔊 Music On' : '🔇 Music Off'}
          </button>
        )}
      </div>

      {isSessionActive ? (
        <div className="active-session">
          <div 
            className="pose-display-container"
            style={{ background: yogaPoses[currentPoseIndex].color }}
          >
            <div className="pose-timer">
              <div className="timer-circle">
                <svg className="progress-ring" width="120" height="120">
                  <circle
                    className="progress-ring__circle"
                    strokeWidth="6"
                    stroke="white"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                    style={{
                      strokeDasharray: 327,
                      strokeDashoffset: 327 - (327 * progress) / 100
                    }}
                  />
                </svg>
                <span className="timer-text">{timeLeft}s</span>
              </div>
              <div className="pose-counter">
                Pose {currentPoseIndex + 1} of {yogaPoses.length}
              </div>
            </div>

            <div className="current-pose">
              <h2 className="pose-name">{yogaPoses[currentPoseIndex].name}</h2>
              <div className="pose-image-container">
                <img
                  src={yogaPoses[currentPoseIndex].image}
                  alt={yogaPoses[currentPoseIndex].name}
                  className="pose-image"
                />
                <div className="image-overlay"></div>
              </div>
              
              <div className="pose-details">
                <div className="detail-card">
                  <div className="detail-icon">💭</div>
                  <div>
                    <h4>Benefit</h4>
                    <p>{yogaPoses[currentPoseIndex].benefit}</p>
                  </div>
                </div>
                <div className="detail-card">
                  <div className="detail-icon">⏱️</div>
                  <div>
                    <h4>Duration</h4>
                    <p>{yogaPoses[currentPoseIndex].duration}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pose-navigation">
              <button 
                className="nav-btn prev-btn"
                onClick={skipToPreviousPose}
                disabled={!isSessionActive}
              >
                ← Previous
              </button>
              <button 
                className="nav-btn next-btn"
                onClick={skipToNextPose}
                disabled={!isSessionActive}
              >
                Next →
              </button>
            </div>
          </div>

          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentPoseIndex + 1) / yogaPoses.length) * 100}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <>
          <div className="poses-grid">
            {yogaPoses.map((pose, index) => (
              <div 
                key={index} 
                className="pose-card"
                style={{ background: pose.color }}
                onClick={() => {
                  setCurrentPoseIndex(index);
                  toggleSession();
                }}
              >
                <div className="pose-card-content">
                  <div className="pose-card-header">
                    <span className="pose-number">0{index + 1}</span>
                    <span className="pose-duration">{pose.duration}</span>
                  </div>
                  <h3 className="pose-card-title">{pose.name}</h3>
                  <p className="pose-card-benefit">{pose.benefit}</p>
                  <div className="pose-card-image">
                    <img
                      src={pose.image}
                      alt={pose.name}
                    />
                  </div>
                  <div className="pose-card-footer">
                    <span className="start-hint">Click to start →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="instructions">
            <h3>How to Use</h3>
            <div className="instruction-steps">
              <div className="step">
                <div className="step-number">1</div>
                <p>Click "Start Yoga Session" to begin</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <p>Each pose will automatically change every 10 seconds</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <p>Relaxing music will play during your session</p>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <p>Use navigation buttons to skip poses if needed</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default YogaPoses;