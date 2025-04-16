
import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const cardsArray = [
  { id: 1, content: "🧠" },
  { id: 2, content: "🌈" },
  { id: 3, content: "☀️" },
  { id: 4, content: "🌙" },
  { id: 5, content: "🌸" },
  { id: 6, content: "🌊" },
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const shuffled = [...cardsArray, ...cardsArray]
      .sort(() => 0.5 - Math.random())
      .map((card, index) => ({ ...card, uniqueId: index }));
    setCards(shuffled);
  }, []);

  const handleClick = (card) => {
    if (selected.length < 2 && !selected.includes(card)) {
      setSelected([...selected, card]);
    }
  };

  useEffect(() => {
    if (selected.length === 2) {
      if (selected[0].content === selected[1].content) {
        setMatched([...matched, selected[0].content]);
      }
      setTimeout(() => setSelected([]), 1000);
    }
  }, [selected]);

  return (
    <div className="container text-center my-5">
      <h3 className="mb-4">🧘 Stress Relief Memory Game</h3>
      <div className="memory-grid">
        {cards.map((card) => {
          const isFlipped =
            selected.includes(card) || matched.includes(card.content);
          return (
            <div
              key={card.uniqueId}
              className={`memory-card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => handleClick(card)}
            >
              {isFlipped ? card.content : "❓"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGame;
