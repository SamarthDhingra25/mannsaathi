import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="container">
      <h3 className="mb-4 text-center">Login to MannSaathi</h3>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required />
        </div>
        <div className="mb-4">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" required />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
