import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
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
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <Router>
      <div>
      {/* <EmergencySupport/> */}
      <Routes>
         <Route path="/" element={<LandingPage />} />
       <Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>
        <Route path="/callhelpline" element={<CallHelpline />} />
        <Route path="/groundingexercise" element={<GroundingExercise />} />
        <Route path="/talktotherapist" element={<TalkToTherapist />} />
        <Route path="/memory-game" element={<MemoryGame />} />
        <Route path="/breathing-game" element={<BreathingGame />} />
        <Route path="/meditation-choice-game" element={<MeditationChoiceGame />} />
       <Route
  path="/text-chat"
  element={
    <ProtectedRoute>
      <TextChat />
    </ProtectedRoute>
  }
/>

<Route
  path="/audio-chat"
  element={
    <ProtectedRoute>
      <AudioChat />
    </ProtectedRoute>
  }
/>

<Route
  path="/video-chat"
  element={
    <ProtectedRoute>
      <VideoChat />
    </ProtectedRoute>
  }
/>

<Route
  path="/mood-tracker"
  element={
    <ProtectedRoute>
      <MoodTracker />
    </ProtectedRoute>
  }
/>

<Route
  path="/assessment-quiz"
  element={
    <ProtectedRoute>
      <AssessmentQuiz />
    </ProtectedRoute>
  }
/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/coloring-game" element={<ColoringGame />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

      </Routes>
      </div>
    </Router>

  );
}

export default App;

