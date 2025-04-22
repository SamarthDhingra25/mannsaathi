import axios from 'axios';  

const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const API_KEY = import.meta.env.VITE_GROQ_API_KEY; 

export const sendMessageToGroq = async (userMessage) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'You are a helpful, empathetic mental health assistant called AI-Saathi.' },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 400,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error sending message to Groq:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    return "Sorry, I'm having trouble responding right now. Please try again later.";
  }
};
