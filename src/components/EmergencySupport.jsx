import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import './EmergencySupport.css';

function EmergencySupport() {
  const [open, setOpen] = useState(false); 

  const toggleOptions = () => setOpen(!open);

  return (
    <>
      <div className="emergency-button" onClick={toggleOptions}>
        🤝 
      </div>

      {open && (
        <div className="emergency-options">
          <Link to="/callhelpline" className="option-btn"> Call Helpline</Link>
          <Link to="/talktotherapist" className="option-btn"> Talk to Therapist</Link>
          <Link to="/groundingexercise" className="option-btn"> Grounding Exercise</Link>
        </div>
      )}
    </>
  );
}

export default EmergencySupport;
