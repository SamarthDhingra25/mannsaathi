import React, { useState } from 'react';
import { sendMessageToGroq } from '../api/groqService';

function TextChat() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const newChat = { sender: 'You', message: userMessage };
    setChatHistory([...chatHistory, newChat]);
    setUserMessage('');
    setLoading(true);

    const aiReply = await sendMessageToGroq(userMessage);
    setChatHistory((prev) => [...prev, { sender: 'MannSaathi', message: aiReply }]);
    setLoading(false);
  };

  return (
    <div className="container">
      <h3 className="text-center mb-4">📝 MannSaathi Text Chat</h3>
      <div className="mb-3 p-3 border rounded" style={{ height: '300px', overflowY: 'auto', background: '#f8f9fa' }}>
        {chatHistory.map((chat, index) => (
          <div key={index} className={`mb-2 ${chat.sender === 'You' ? 'text-end' : 'text-start'}`}>
            <strong>{chat.sender}:</strong> {chat.message}
          </div>
        ))}
        {loading && <div className="text-muted text-center">Typing...</div>}
      </div>

      <form onSubmit={handleSend} className="d-flex">
        <input
          className="form-control me-2"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your feelings..."
        />
        <button className="btn btn-primary" type="submit">Send</button>
      </form>
    </div>
  );
}

export default TextChat;