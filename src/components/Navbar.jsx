// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-primary" to="/">MannSaathi</Link>
        <div className="ms-auto d-flex align-items-center gap-3">
        <Link to="/assessment-quiz" className="btn btn-outline-danger">Self-Assessment</Link>
        <Link to="/mood-tracker" className="btn btn-outline-dark">
  Mood Tracker
</Link>
          <Link to="/login" className="btn btn-outline-primary">Login</Link>
          <Link to="/register" className="btn btn-primary">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
