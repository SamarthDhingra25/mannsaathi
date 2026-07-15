import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { db } from "../firebase";
import {
  collection,
  getDocs
} from "firebase/firestore";

function AIInsights() {
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState("");

  useEffect(() => {
    fetchInsight();
  }, []);

  const fetchInsight = async () => {

    const moodRef = collection(
      db,
      "users",
      currentUser.uid,
      "moods"
    );

    const snapshot = await getDocs(moodRef);

    let moods = [];

    snapshot.forEach((doc) => {
      moods.push(doc.data().mood.label);
    });

    const prompt = `
User mood history:

${moods.join(", ")}

Give a short mental wellness suggestion.
Maximum 100 words.
Friendly tone.
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },

        body: JSON.stringify({

          model: "llama-3.3-70b-versatile",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],

        }),
      }
    );

    const data = await response.json();

    setInsight(
      data.choices[0].message.content
    );

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-5">
        🤖 AI Wellness Insight
      </h2>

      {loading ? (
        <p>Generating insight...</p>
      ) : (
        <p className="text-gray-700 leading-8">
          {insight}
        </p>
      )}

    </div>
  );
}

export default AIInsights;