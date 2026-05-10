import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Video paths - Update these with your actual video file names
const VIDEO_PATHS = {
  girl: {
    idle: "/videos/ai-girl-listening.mp4",      // Default/Listening state
    listening: "/videos/ai-girl-listening.mp4", // Listening animation
    thinking: "/videos/ai-girl-thinking.mp4",   // Thinking animation
    speaking: "/videos/ai-girl-speaking.mp4",   // Speaking animation
  },
  boy: {
    idle: "/videos/ai-boy-listening.mp4",       // Default/Listening state
    listening: "/videos/ai-boy-listening.mp4",  // Listening animation
    thinking: "/videos/ai-boy-thinking.mp4",    // Thinking animation
    speaking: "/videos/ai-boy-speaking.mp4",    // Speaking animation
  },
};

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const MODEL = "llama-3.3-70b-versatile";

export default function MannSaathiCall() {
  const navigate = useNavigate();
  const userVideoRef = useRef(null);
  const aiVideoRef = useRef(null);
  const recognitionRef = useRef(null);
  const streamRef = useRef(null);

  const [status, setStatus] = useState("Ready to start call");
  const [aiState, setAiState] = useState("idle");
  const [callActive, setCallActive] = useState(false);
  const [voices, setVoices] = useState([]);
  const [aiGender, setAiGender] = useState("girl");
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isMicActive, setIsMicActive] = useState(true);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");

  /* ================= LOAD VOICES ================= */
  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) {
        setVoices(v);
        console.log("Available voices:", v.map(voice => ({
          name: voice.name,
          lang: voice.lang,
          gender: voice.name.toLowerCase().includes('female') ? 'female' : 'male'
        })));
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  /* ================= USER CAMERA ================= */
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      setStatus("Camera access required");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    if (userVideoRef.current) {
      userVideoRef.current.srcObject = null;
    }
  };

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
    if (!isCameraActive && callActive) {
      startCamera();
    } else if (isCameraActive && callActive) {
      stopCamera();
    }
  };

  /* ================= AI VIDEO MANAGEMENT ================= */
  useEffect(() => {
    const videoPath = VIDEO_PATHS[aiGender][aiState] || VIDEO_PATHS[aiGender].idle;
    console.log(`Video update: Gender=${aiGender}, State=${aiState}, Path=${videoPath}`);
    setCurrentVideoSrc(videoPath);
    
    if (aiVideoRef.current) {
      const video = aiVideoRef.current;
      
      // Store current playback state
      const wasPlaying = !video.paused;
      const currentTime = video.currentTime;
      
      // Only change source if it's different
      if (video.src !== window.location.origin + videoPath) {
        video.src = videoPath;
        
        video.onloadeddata = () => {
          console.log(`Video loaded: ${videoPath}`);
          // Try to resume from similar time if possible
          video.currentTime = Math.min(currentTime, video.duration || 0);
          if (wasPlaying) {
            video.play().catch(e => console.error("Video play error:", e));
          }
        };
        
        video.onerror = (e) => {
          console.error(`Video load error for ${videoPath}:`, e);
          // Fallback to idle video
          const fallbackPath = VIDEO_PATHS[aiGender].idle;
          if (video.src !== window.location.origin + fallbackPath) {
            video.src = fallbackPath;
          }
        };
        
        // Start playing immediately
        video.play().catch(e => console.error("Initial video play error:", e));
      }
    }
  }, [aiState, aiGender]);

  /* ================= SPEECH RECOGNITION ================= */
  const startListening = () => {
    if (!isMicActive) {
      setStatus("Microphone is disabled");
      return;
    }

    setAiState("listening");
    setStatus("🎤 Listening...");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      console.log("Speech recognition started");
    };

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      console.log("Speech recognized:", text);
      setStatus("You: " + text);
      askGroq(text);
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e.error);
      setStatus("Speech recognition error");
      if (callActive) {
        setTimeout(startListening, 1000);
      }
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      if (callActive && aiState === "listening") {
        // Restart listening if still in listening state
        setTimeout(startListening, 500);
      }
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (error) {
      console.error("Failed to start recognition:", error);
      setStatus("Failed to start listening");
    }
  };

  /* ================= GROQ ================= */
  async function askGroq(text) {
    setAiState("thinking");
    setStatus("🤖 Thinking...");

    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [
              {
                role: "system",
                content: `You are MannSaathi, a calm emotional support AI. Speak in a soothing, comforting tone. 
                Provide empathetic responses that make the user feel heard and supported.
                Keep responses concise but meaningful.`
              },
              { role: "user", content: text }
            ],
            max_tokens: 150
          })
        }
      );

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      if (!data.choices || !data.choices[0]) {
        throw new Error("No response from AI");
      }

      const reply = data.choices[0].message.content;
      console.log("AI response:", reply);
      speak(reply);
    } catch (error) {
      console.error("Groq API error:", error);
      setStatus("❌ Error getting response");
      if (callActive) {
        setAiState("listening");
        setTimeout(startListening, 1000);
      }
    }
  }

  /* ================= TEXT TO SPEECH ================= */
  const getVoiceForGender = (voices, gender) => {
    // Get all available voices
    const availableVoices = voices || window.speechSynthesis.getVoices();
    
    // Filter for English voices
    const englishVoices = availableVoices.filter(v => 
      v.lang.startsWith('en') || v.lang.includes('en-')
    );

    if (!englishVoices.length) {
      console.warn("No English voices found");
      return null;
    }

    if (gender === "boy") {
      // Try to find a male voice
      const maleVoices = englishVoices.filter(v => 
        v.name.toLowerCase().includes('male') ||
        v.name.toLowerCase().includes('man') ||
        v.name.toLowerCase().includes('david') ||
        v.name.toLowerCase().includes('alex') ||
        !v.name.toLowerCase().includes('female')
      );
      
      console.log("Male voices found:", maleVoices.map(v => v.name));
      return maleVoices.length > 0 ? maleVoices[0] : englishVoices[0];
    } else {
      // Try to find a female voice
      const femaleVoices = englishVoices.filter(v => 
        v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('woman') ||
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('karen') ||
        v.name.toLowerCase().includes('veena')
      );
      
      console.log("Female voices found:", femaleVoices.map(v => v.name));
      return femaleVoices.length > 0 ? femaleVoices[0] : englishVoices[0];
    }
  };

  function speak(text) {
    if (!window.speechSynthesis) {
      setStatus("Speech synthesis not supported");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";

    // Get appropriate voice for gender
    const selectedVoice = getVoiceForGender(voices, aiGender);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log(`Using voice for ${aiGender}:`, selectedVoice.name);
    }

    // Configure speech parameters
    utterance.rate = 0.85; // Slower for calmness
    utterance.pitch = aiGender === "girl" ? 1.05 : 0.95; // Higher for female, lower for male
    utterance.volume = 0.9;

    utterance.onstart = () => {
      console.log("Speech started");
      setAiState("speaking");
      setStatus("🧠 MannSaathi Speaking...");
    };

    utterance.onend = () => {
      console.log("Speech ended");
      setAiState("listening");
      if (callActive) {
        setTimeout(startListening, 500);
      }
    };

    utterance.onerror = (e) => {
      console.error("Speech error:", e);
      setAiState("listening");
      setStatus("Speech error");
      if (callActive) startListening();
    };

    // Add slight delay before speaking for natural feel
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 300);
  }

  /* ================= CALL CONTROLS ================= */
  const startCall = async () => {
    setCallActive(true);
    setAiState("listening");
    setStatus("Starting call...");
    
    try {
      await startCamera();
      // Small delay before starting to listen
      setTimeout(() => {
        startListening();
      }, 1000);
    } catch (error) {
      setStatus("Failed to start call");
      setCallActive(false);
    }
  };

  const endCall = () => {
    window.speechSynthesis.cancel();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error("Error stopping recognition:", e);
      }
    }
    stopCamera();
    setCallActive(false);
    setAiState("idle");
    setStatus("Call ended");
  };

  const toggleMicrophone = () => {
    setIsMicActive(!isMicActive);
    setStatus(isMicActive ? "Microphone muted" : "Microphone enabled");
  };

  // Handle AI gender change
  const handleGenderChange = (gender) => {
    if (!callActive) {
      setAiGender(gender);
      setStatus(`AI set to ${gender === "girl" ? "female" : "male"} voice`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-sky-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-sky-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full px-5 py-2.5 mb-6 border border-blue-200">
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700">Live Comfort Call</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              AI Comfort Call
            </span>
            <br />
            <span className="text-blue-900">with MannSaathi</span>
          </h1>
          
          <p className="text-blue-700/80 text-lg max-w-2xl mx-auto">
            Connect with our AI companion for emotional support and comforting conversations
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - User Camera */}
          <div className="space-y-8">
            {/* User Camera Card */}
            <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-blue-900">Your Camera</h3>
                  <p className="text-blue-700/70 text-sm">Live video feed</p>
                </div>
                <button
                  onClick={toggleCamera}
                  disabled={!callActive}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCameraActive && callActive
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                  } ${!callActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isCameraActive && callActive ? '📹' : '📴'}
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/10 to-cyan-900/10 aspect-video">
                {callActive && isCameraActive ? (
                  <video
                    ref={userVideoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                    playsInline
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📹</div>
                      <p className="text-blue-700/70">
                        {callActive ? 'Camera is off' : 'Camera will activate when call starts'}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                  You
                </div>
              </div>
            </div>

            {/* AI Selection & Audio Controls */}
            <div className="bg-gradient-to-br from-blue-600/5 to-cyan-600/5 backdrop-blur-sm border border-blue-200 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-6">AI Settings</h3>
              
              <div className="space-y-6">
                {/* AI Gender Selection */}
                <div>
                  <div className="text-sm text-blue-700/70 mb-3">AI Companion Type</div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleGenderChange("girl")}
                      disabled={callActive}
                      className={`p-4 rounded-xl text-center transition-all duration-300 ${
                        aiGender === "girl"
                          ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-300'
                          : 'bg-white/50 border border-blue-200'
                      } ${callActive ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    >
                      <div className="text-3xl mb-2">👩</div>
                      <div className="font-medium text-blue-900">Female AI</div>
                      <div className="text-xs text-blue-600">Calm & Nurturing</div>
                    </button>
                    <button
                      onClick={() => handleGenderChange("boy")}
                      disabled={callActive}
                      className={`p-4 rounded-xl text-center transition-all duration-300 ${
                        aiGender === "boy"
                          ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-300'
                          : 'bg-white/50 border border-blue-200'
                      } ${callActive ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    >
                      <div className="text-3xl mb-2">👨</div>
                      <div className="font-medium text-blue-900">Male AI</div>
                      <div className="text-xs text-blue-600">Supportive & Calm</div>
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-blue-500">
                    Current: {aiGender === "girl" ? "Female" : "Male"} AI
                  </div>
                </div>

                {/* Microphone Control */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isMicActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {isMicActive ? '🎤' : '🔇'}
                    </div>
                    <div>
                      <div className="font-bold text-blue-900">Microphone</div>
                      <div className="text-sm text-blue-700/70">
                        {isMicActive ? 'Active - Ready to listen' : 'Muted'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={toggleMicrophone}
                    disabled={!callActive}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isMicActive
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                    } ${!callActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isMicActive ? 'Mute' : 'Unmute'}
                  </button>
                </div>

                {/* Current AI State Display */}
                <div className="pt-4 border-t border-blue-200">
                  <div className="text-sm text-blue-700/70 mb-2">AI State</div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full animate-pulse ${
                      aiState === 'idle' ? 'bg-blue-400' :
                      aiState === 'listening' ? 'bg-amber-400' :
                      aiState === 'thinking' ? 'bg-purple-400' :
                      'bg-green-400'
                    }`}></div>
                    <span className="text-blue-900 font-medium capitalize">
                      {aiState === 'idle' ? 'Ready' : aiState}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - AI Companion */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-3xl p-8 shadow-xl">
              {/* AI Companion Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    aiGender === "girl" 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                  }`}>
                    <span className="text-3xl">{aiGender === "girl" ? '👩' : '👨'}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900">
                      {aiGender === "girl" ? "Female AI Companion" : "Male AI Companion"}
                    </h3>
                    <p className="text-blue-700/70">
                      {aiGender === "girl" ? "Calm & nurturing voice" : "Supportive & calm voice"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    aiState === 'idle' ? 'bg-blue-100 text-blue-700' :
                    aiState === 'listening' ? 'bg-amber-100 text-amber-700' :
                    aiState === 'thinking' ? 'bg-purple-100 text-purple-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {aiState === 'idle' && 'Ready'}
                    {aiState === 'listening' && 'Listening'}
                    {aiState === 'thinking' && 'Thinking'}
                    {aiState === 'speaking' && 'Speaking'}
                  </div>
                </div>
              </div>

              {/* AI Video Container */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/10 to-cyan-900/10 mb-8"
                   style={{ height: '400px' }}>
                <video
                  ref={aiVideoRef}
                  key={`${aiGender}-${aiState}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-contain bg-black"
                  style={{ 
                    objectFit: 'contain',
                    backgroundColor: 'black'
                  }}
                  onError={(e) => {
                    console.error("Video error:", e);
                    setStatus("AI video failed to load");
                  }}
                  onLoadedData={() => {
                    console.log("AI video loaded successfully");
                  }}
                />
                
                {/* Status overlay */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                  {aiGender === "girl" ? "Female AI" : "Male AI"} • {aiState}
                </div>
                
                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    aiState === 'idle' ? 'bg-blue-400' :
                    aiState === 'listening' ? 'bg-amber-400' :
                    aiState === 'thinking' ? 'bg-purple-400' :
                    'bg-green-400'
                  }`}></div>
                  MannSaathi AI
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mb-8">
                <div className="text-center">
                  <div className="text-lg font-medium text-blue-900 mb-2">Status</div>
                  <div className={`text-xl font-bold ${
                    status.includes('Ready') ? 'text-green-600' :
                    status.includes('Listening') || status.includes('🎤') ? 'text-amber-600' :
                    status.includes('Thinking') || status.includes('🤖') ? 'text-purple-600' :
                    status.includes('Speaking') || status.includes('🧠') ? 'text-blue-600' :
                    status.includes('❌') ? 'text-red-600' :
                    status.includes('Error') ? 'text-red-600' :
                    'text-blue-900'
                  }`}>
                    {status}
                  </div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!callActive ? (
                  <button
                    onClick={startCall}
                    className="group relative px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/30 hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center gap-3">
                      <span className="text-2xl">📞</span>
                      Start Comfort Call
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={endCall}
                    className="group relative px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-rose-900/30 hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center gap-3">
                      <span className="text-2xl">❌</span>
                      End Call
                    </span>
                  </button>
                )}
              </div>

              {/* Video Debug Info */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
                <div className="font-medium mb-1">Video Status:</div>
                <div>Gender: {aiGender}</div>
                <div>State: {aiState}</div>
                <div>Video: {currentVideoSrc}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Video File Check */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
          <h4 className="font-bold text-yellow-800 mb-2">📁 Video File Checklist:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {["girl", "boy"].map(gender => (
              <div key={gender} className="p-2 bg-white rounded-lg">
                <div className="font-medium text-blue-900 capitalize mb-1">{gender} AI:</div>
                {["listening", "thinking", "speaking"].map(state => (
                  <div key={state} className="text-xs text-gray-600 flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-1 ${
                      VIDEO_PATHS[gender][state] ? 'bg-green-500' : 'bg-red-500'
                    }`}></span>
                    {state}.mp4
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 backdrop-blur-sm border border-blue-200 rounded-3xl p-6">
            <div className="text-4xl mb-4">🤝</div>
            <h4 className="text-xl font-bold text-blue-900 mb-3">Emotional Support</h4>
            <p className="text-blue-700/80">
              Compassionate conversations to help you process feelings and find comfort
            </p>
          </div>
          <div className="bg-gradient-to-br from-cyan-600/10 to-blue-600/10 backdrop-blur-sm border border-cyan-200 rounded-3xl p-6">
            <div className="text-4xl mb-4">🔒</div>
            <h4 className="text-xl font-bold text-blue-900 mb-3">100% Confidential</h4>
            <p className="text-blue-700/80">
              Your conversations are private, secure, and never stored
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 backdrop-blur-sm border border-blue-200 rounded-3xl p-6">
            <div className="text-4xl mb-4">⏰</div>
            <h4 className="text-xl font-bold text-blue-900 mb-3">Always Available</h4>
            <p className="text-blue-700/80">
              Access emotional support anytime, day or night
            </p>
          </div>
        </div>
      </div>

      {/* CSS for video fixes */}
      <style jsx>{`
        video {
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        video {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </div>
  );
}