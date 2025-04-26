import React, { useState, useEffect } from 'react';

const yogaPoses = [
  {
    name: "Child's Pose (Balasana)",
    image: "/media/bal.jpg",
    benefit: "Relaxes the body and calms the mind.",
  },
  {
    name: "Cat-Cow Pose",
    image: "/media/download.jpg",
    benefit: "Relieves tension in spine and improves breathing.",
  },
  {
    name: "Legs-Up-the-Wall Pose (Viparita Karani)",
    image: "/media/c.jpg",
    benefit: "Improves blood circulation.",
  },
  {
    name: "Shavasana",
    image: "/media/sh.jpg",
    benefit: "Reduces stress.",
  },
];

function YogaPoses() {
  const [isSessionActive, setSessionActive] = useState(false);
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [audio, setAudio] = useState(null);

  const musicURL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  useEffect(() => {
    let interval;
    if (isSessionActive) {
      interval = setInterval(() => {
        setCurrentPoseIndex((prevIndex) => (prevIndex + 1) % yogaPoses.length);
      }, 10000); 
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  const toggleSession = () => {
    if (!isSessionActive) {
   
      const newAudio = new Audio(musicURL);
      newAudio.loop = true; 
      newAudio.play();
      setAudio(newAudio);
    } else {
     
      if (audio) {
        audio.pause();
        audio.currentTime = 0; 
      }
      setAudio(null);
    }
    setSessionActive(!isSessionActive);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">🧘 Yoga for Stress Relief</h3>

      <button
        className="btn btn-primary mb-4 d-block mx-auto"
        onClick={toggleSession}
      >
        {isSessionActive ? 'End Session' : 'Start Yoga Session'}
      </button>

      {isSessionActive ? (
        <div className="text-center">
          <h5>Pose: {yogaPoses[currentPoseIndex].name}</h5>
          <img
            src={yogaPoses[currentPoseIndex].image}
            alt={yogaPoses[currentPoseIndex].name}
            className="img-fluid mb-3"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
          <p>{yogaPoses[currentPoseIndex].benefit}</p>
        </div>
      ) : (
        <div className="row">
          {yogaPoses.map((pose, index) => (
            <div key={index} className="col-md-6 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={pose.image}
                  className="card-img-top"
                  alt={pose.name}
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{pose.name}</h5>
                  <p className="card-text">{pose.benefit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YogaPoses;
