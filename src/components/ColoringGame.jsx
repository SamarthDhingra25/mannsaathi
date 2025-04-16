import React, { useState } from 'react';
import './ColoringGame.css';

function ColoringGame() {
  const [selectedColor, setSelectedColor] = useState('#000000'); // Default color is black
  const [isDrawing, setIsDrawing] = useState(false);
  const [coordinates, setCoordinates] = useState([]);

  // Function to start drawing
  const startDrawing = (e) => {
    setIsDrawing(true);
    setCoordinates([e.clientX, e.clientY]);
  };

  // Function to stop drawing
  const stopDrawing = () => {
    setIsDrawing(false);
    setCoordinates([]);
  };

  // Function to draw the line
  const draw = (e) => {
    if (!isDrawing) return;
    const newCoordinates = [...coordinates, e.clientX, e.clientY];
    setCoordinates(newCoordinates);
  };

  return (
    <div className="coloring-game">
      <h2>Coloring Game</h2>
      <div className="palette">
        <button className="color" style={{ backgroundColor: '#FF6347' }} onClick={() => setSelectedColor('#FF6347')}></button>
        <button className="color" style={{ backgroundColor: '#4682B4' }} onClick={() => setSelectedColor('#4682B4')}></button>
        <button className="color" style={{ backgroundColor: '#32CD32' }} onClick={() => setSelectedColor('#32CD32')}></button>
        <button className="color" style={{ backgroundColor: '#FFD700' }} onClick={() => setSelectedColor('#FFD700')}></button>
        <button className="color" style={{ backgroundColor: '#8A2BE2' }} onClick={() => setSelectedColor('#8A2BE2')}></button>
      </div>
      <div
        className="canvas"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      >
        {coordinates.length > 0 && (
          <svg width="100%" height="100%">
            <polyline
              points={coordinates.join(' ')}
              stroke={selectedColor}
              strokeWidth="4"
              fill="none"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

export default ColoringGame;
