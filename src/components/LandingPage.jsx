import CalmBackground from "./CalmBackground";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Brain,
  Users,
  Shield,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Headphones,
  Video
} from "lucide-react";

export default function LandingPage() {
  const { currentUser } = useAuth();
const navigate = useNavigate();

const handleLogout = async () => {
  await signOut(auth);
  navigate("/login");
};
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

 return (
  <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">

    {/* 🌊 CALM BACKGROUND ANIMATION */}
    <CalmBackground />

    {/* 🌟 FOREGROUND CONTENT */}
    <div className="relative z-10">

      {/* 🔹 NAVBAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Brain className="text-indigo-400" />
            MannSaathi
          </div>

          <div className="hidden md:flex gap-6 items-center">
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-indigo-400 transition"
            >
              Features
            </button>
            {currentUser ? (
  <button
    onClick={handleLogout}
    className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
  >
    Logout
  </button>
) : (
  <>
    <a
      href="/login"
      className="px-4 py-2 rounded-lg border border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-black transition"
    >
      Login
    </a>

    <a
      href="/register"
      className="px-5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-black font-semibold transition"
    >
      Get Started
    </a>
  </>
)}
          </div>
        </div>
      </nav>

      {/* 🔹 HERO */}
      <section className="pt-32 pb-28 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto text-center px-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm">
            <Sparkles size={14} /> Mental Wellness Companion
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
            Your Journey to
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Mental Wellness
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
            Compassionate AI-powered mental health support through
            text, voice & video — anytime, anywhere.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <a
              href="/home"
              className="px-8 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-black font-semibold flex items-center gap-2 transition"
            >
              Start Your Journey <ArrowRight size={18} />
            </a>
            <button
              onClick={() => scrollToSection("how")}
              className="px-8 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]" />
      </section>

      {/* 🔹 SERVICES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <MessageCircle size={40} />,
              title: "Text Chat",
              desc: "Private, AI-powered emotional conversations",
              color: "text-indigo-400"
            },
            {
              icon: <Headphones size={40} />,
              title: "Audio Chat",
              desc: "Talk freely with a calm AI voice",
              color: "text-emerald-400"
            },
            {
              icon: <Video size={40} />,
              title: "Video Chat",
              desc: "Face-to-face AI comfort experience",
              color: "text-cyan-400"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:scale-[1.03] transition"
            >
              <div className={`${item.color} mb-4 flex justify-center`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Shield, text: "100% Confidential", color: "text-indigo-400" },
            { icon: Users, text: "Expert Guidance", color: "text-emerald-400" },
            { icon: Heart, text: "24/7 Support", color: "text-rose-400" },
            { icon: Brain, text: "Personalized Care", color: "text-cyan-400" }
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <f.icon className={`${f.color} mx-auto mb-3`} size={36} />
              <p className="font-medium">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 FOOTER */}
      <footer className="border-t border-white/10 py-6 text-center text-slate-400">
        © 2026 MannSaathi. All rights reserved.
      </footer>
    </div>
    </div>
  );
}
