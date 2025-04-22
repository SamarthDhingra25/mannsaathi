import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import YogaPoses from '../components/YogaPoses'; 

function Home() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100">
    <Navbar />
    <div className="container text-center">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">MannSaathi</h2>
        <button className="btn btn-outline-secondary" onClick={() => navigate('/register')}>
          Create Account
        </button>
      </div>

      <div className="my-5">
        <h1 className="display-5 mb-3">Are you feeling low? We are here for you!</h1>
      </div>

      <div className="d-grid gap-3 col-md-6 mx-auto">
        <button className="btn btn-outline-primary btn-lg" onClick={() => navigate('/text-chat')}> Text Chat</button>
        <button className="btn btn-outline-success btn-lg" onClick={() => navigate('/audio-chat')}> Audio Chat</button>
        <button className="btn btn-outline-warning btn-lg" onClick={() => navigate('/video-chat')}> Video Chat</button>
      </div>

      <div className="my-5 pt-5 border-top">
        <h3 className="text-center mb-4"> Stress Relief Games</h3>
        <div className="d-flex justify-content-center gap-4">
          <button className="btn btn-outline-info" onClick={() => navigate('/memory-game')}> Memory Game</button>
          <button className="btn btn-outline-success" onClick={() => navigate('/breathing-game')}> Breathing Exercise</button>
          <button className="btn btn-outline-warning" onClick={() => navigate('/meditation-choice-game')}> Guided Meditation</button>
          <button className="btn btn-outline-info" onClick={() => navigate('/coloring-game')}> Coloring Game</button>
        </div>
        <YogaPoses/>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Home;
 