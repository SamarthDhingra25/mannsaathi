import React from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>MannSaathi</h2>
        <button className="btn btn-link" onClick={() => navigate('/login')}>Already have an account?</button>
      </div>
      <h3>Create Account</h3>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;
