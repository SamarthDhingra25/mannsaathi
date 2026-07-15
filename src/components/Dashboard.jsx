import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import AIInsights from "./AIInsights";
import { doc, getDoc } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { useEffect, useState } from "react";

function Dashboard() {
  const [assessment, setAssessment] = useState("Not Taken");
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [latestMood, setLatestMood] = useState("No Mood");
  const [moodCount, setMoodCount] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!currentUser) return;

    const fetchMoodData = async () => {
      try {
        const moodRef = collection(
          db,
          "users",
          currentUser.uid,
          "moods"
        );

        const snapshot = await getDocs(moodRef);

        setMoodCount(snapshot.size);

        let moods = [];

        snapshot.forEach((doc) => {
          moods.push(doc.data());
        });

        moods.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        if (moods.length > 0) {
          setLatestMood(moods[0].mood.label);
        }
        const assessmentRef = doc(
          db,
          "users",
          currentUser.uid,
          "assessment",
          "latest"
        );

        const assessmentSnap = await getDoc(assessmentRef);

        if (assessmentSnap.exists()) {
          setAssessment(assessmentSnap.data().level);
        }

        // ---------- Calculate Streak ----------
        let currentStreak = 0;

        const dates = moods.map((m) => m.date);

        const today = new Date();

        for (let i = 0; i < dates.length; i++) {
          const expected = new Date();
          expected.setDate(today.getDate() - i);

          const expectedDate = expected
            .toISOString()
            .split("T")[0];

          if (dates.includes(expectedDate))
            currentStreak++;
          else break;
        }

        setStreak(currentStreak);

      } catch (err) {
        console.log(err);
      }
    };

    fetchMoodData();

  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          👋 Welcome
        </h1>

        <p className="text-lg text-gray-600 mb-10">
          {currentUser?.email}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-gray-500">Today's Mood</h2>
            <p className="text-3xl mt-3">{latestMood}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-gray-500">Mood Entries</h2>
            <p className="text-3xl mt-3">{moodCount}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-gray-500">Current Streak</h2>
            <p className="text-3xl mt-3">{streak} 🔥🔥</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-gray-500">Assessment</h2>
            <p className="text-2xl mt-3">{assessment}</p>
          </div>


        </div>
        <div className="mt-10">
          <AIInsights />
        </div>

        <div className="mt-10 flex gap-4">

          <button
            onClick={() => navigate("/mood-tracker")}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl"
          >
            Mood Tracker
          </button>

          <button
            onClick={() => navigate("/assessment-quiz")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
          >
            Take Assessment
          </button>
          <button
            onClick={() => navigate("/home")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            Home
          </button>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;