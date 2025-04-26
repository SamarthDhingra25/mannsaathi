import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EmergencySupport from './components/EmergencySupport';
import CallHelpline from './components/CallHelpline';
import GroundingExercise from './components/GroundingExercise';
import TalkToTherapist from './components/TalkToTherapist';
import MemoryGame from './components/MemoryGame';
import BreathingGame from './components/BreathingExercise';
import MeditationChoiceGame from './components/MeditationChoiceGame';
import TextChat from './components/TextChat';
import ColoringGame from './components/ColoringGame';
import AudioChat from './components/AudioChat';
import VideoChat from './components/VideoChat';
import Login from './components/Login';
import Register from './components/Register';
import MoodTracker from './components/MoodTracker';
import AssessmentQuiz from './components/AssessmentQuiz';

function App() {
  return (
    <Router>
      <div>
      <EmergencySupport/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callhelpline" element={<CallHelpline />} />
        <Route path="/groundingexercise" element={<GroundingExercise />} />
        <Route path="/talktotherapist" element={<TalkToTherapist />} />
        <Route path="/memory-game" element={<MemoryGame />} />
        <Route path="/breathing-game" element={<BreathingGame />} />
        <Route path="/meditation-choice-game" element={<MeditationChoiceGame />} />
        <Route path="/text-chat" element={<TextChat />} />
        <Route path="/audio-chat" element={<AudioChat />} />
        <Route path="/video-chat" element={<VideoChat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/coloring-game" element={<ColoringGame />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />
        <Route path="/assessment-quiz" element={<AssessmentQuiz />} />

      </Routes>
      </div>
    </Router>
  );
}

export default App;

