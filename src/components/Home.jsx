import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import YogaPoses from "./YogaPoses";
import EmergencySupport from "./EmergencySupport";

function Home() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [fullText] = useState("You're not alone. We're here for you");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (index < fullText.length && !isDeleting) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (index === fullText.length && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && text.length > 0) {
      const timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
      }, 30);
      return () => clearTimeout(timeout);
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setIndex(0);
    }
  }, [index, isDeleting, text, fullText]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 text-gray-800 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              {/* Typewriter Badge */}
              <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-gray-200 shadow-lg">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  <span className="inline-block min-w-[280px] h-5">
                    {text}
                    <span className="animate-pulse">|</span>
                  </span>
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block text-gray-900 mb-2">Mental Wellness</span>
                <span className="block text-gray-900">Companion</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Your Journey to<br />
                <span className="text-2xl font-semibold text-blue-700">Mental Wellness</span>
              </p>

              <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
                Compassionate AI-powered mental health support through text, voice & video — anytime, anywhere.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() => navigate("/register")}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg text-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-3">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Start Your Journey
                  </span>
                </button>
                <button
                  onClick={() => navigate("/services")}
                  className="group px-8 py-4 bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-700 font-semibold rounded-lg text-lg transition-all duration-300 hover:bg-white hover:border-gray-400 hover:scale-105 shadow-lg"
                >
                  <span className="flex items-center justify-center gap-3">
                    Learn More
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">24/7</div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-700">100%</div>
                  <div className="text-sm text-gray-600">Confidential</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-700">50K+</div>
                  <div className="text-sm text-gray-600">Sessions Helped</div>
                </div>
              </div>
            </div>

            {/* Right Column - Illustration Card */}
            <div className="relative">
              <div className="relative bg-white border border-gray-200 rounded-2xl p-8 h-full min-h-[400px] shadow-2xl">
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-4">
                  <div className="text-5xl mb-6">🧠💬🎯</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    AI-Powered Support
                  </h3>
                  <p className="text-gray-600 max-w-md mb-6">
                    Intelligent conversations that understand and respond to your emotional needs with empathy and care.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Real-time emotional analysis
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 right-4 bg-blue-100 rounded-full p-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                </div>
                <div className="absolute bottom-4 left-4 bg-purple-100 rounded-full p-2">
                  <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-6 mb-32">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Connect Anonymously
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            Choose your preferred way to connect with professional support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "Text Chat",
              color: "bg-blue-100",
              desc: "Anonymous text-based support",
              icon: "💬",
              path: "/text-chat",
            },
           /* {
              title: "Audio Chat",
              color: "bg-green-100",
              desc: "Voice conversations with therapists",
              icon: "🎙️",
              path: "/audio-chat",
            },*/
            {
              title: "Video Chat",
              color: "bg-purple-100",
              desc: "Face-to-face professional sessions",
              icon: "📹",
              path: "/video-chat",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
              onClick={() => navigate(service.path)}
            >
              <div className="relative bg-white border border-gray-200 rounded-xl p-8 transition-all duration-300 group-hover:scale-[1.02] group-hover:border-blue-300 group-hover:shadow-xl overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 ${service.color} opacity-30 rounded-full -translate-y-16 translate-x-16`}></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-8">{service.desc}</p>
                  <button className="px-6 py-3 bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 group-hover:text-blue-800 transition-all duration-300 group-hover:bg-blue-100 group-hover:shadow-md">
                    Start Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stress Relief Tools */}
      <section className="container mx-auto px-6 mb-32">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Therapeutic Activities
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            Designed to reduce stress and improve focus
          </p>
        </div>

        <div className="flex space-x-20 pb-8 overflow-x-auto hide-scrollbar px-4">
          {[
            {
              title: "Memory Game",
              color: "bg-cyan-100",
              emoji: "🧠",
              path: "/memory-game",
            },
            {
              title: "Breathing Exercise",
              color: "bg-green-100",
              emoji: "🌬️",
              path: "/breathing-game",
            },
            {
              title: "Guided Meditation",
              color: "bg-purple-100",
              emoji: "🕉️",
              path: "/meditation-choice-game",
            },
            {
              title: "Coloring Therapy",
              color: "bg-pink-100",
              emoji: "🎨",
              path: "/coloring-game",
            },
            // {
            //   title: "Mindful Journal",
            //   color: "bg-orange-100",
            //   emoji: "📓",
            //   path: "/journal",
            // },
            // {
            //   title: "Sleep Stories",
            //   color: "bg-blue-100",
            //   emoji: "🌙",
            //   path: "/sleep-stories",
            // },
          ].map((tool, index) => (
            <div
              key={index}
              className="group flex-shrink-0 w-64 cursor-pointer"
              onClick={() => navigate(tool.path)}
            >
              <div className="relative h-72 bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                <div
                  className={`absolute inset-0 ${tool.color} opacity-30`}
                ></div>
                <div className="relative h-full p-6 flex flex-col ">
                  <div className="text-4xl mb-4">{tool.emoji}</div>
                  <div >
                    <h3 className="text-xl font-bold text-gray-900 mb-2 ">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-600 ">
                      Reduce stress and improve focus through therapeutic activities
                    </p>
                  </div>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Yoga & Wellness Section */}
      <section className="container mx-auto px-6 mb-32">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <YogaPoses />
        </div>
      </section>

      <Footer />

      {/* Emergency Support Component */}
      <EmergencySupport />

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default Home;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import YogaPoses from "./YogaPoses";
// import EmergencySupport from "./EmergencySupport";

// function Home() {
//   const navigate = useNavigate();
//   const [text, setText] = useState("");
//   const [fullText] = useState("You're not alone. We're here for you");
//   const [index, setIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     if (index < fullText.length && !isDeleting) {
//       const timeout = setTimeout(() => {
//         setText((prev) => prev + fullText[index]);
//         setIndex((prev) => prev + 1);
//       }, 50);
//       return () => clearTimeout(timeout);
//     } else if (index === fullText.length && !isDeleting) {
//       const timeout = setTimeout(() => setIsDeleting(true), 2000);
//       return () => clearTimeout(timeout);
//     } else if (isDeleting && text.length > 0) {
//       const timeout = setTimeout(() => {
//         setText((prev) => prev.slice(0, -1));
//       }, 30);
//       return () => clearTimeout(timeout);
//     } else if (isDeleting && text.length === 0) {
//       setIsDeleting(false);
//       setIndex(0);
//     }
//   }, [index, isDeleting, text, fullText]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-x-hidden">
//       {/* Background Effects */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-900/10 to-purple-900/10 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/3 -left-40 w-96 h-96 bg-gradient-to-r from-purple-900/10 to-blue-900/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-700/5 to-purple-700/5 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-gradient-to-t from-blue-900/5 via-transparent to-transparent"></div>
//       </div>

//       <Navbar />

//       {/* Hero Section */}
//       <section className="relative container mx-auto px-6 pt-20 pb-32">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Column */}
//             <div>
//               {/* Typewriter Badge - Enlarged */}
//               <div className="inline-flex items-center space-x-3 bg-gray-800/40 backdrop-blur-sm rounded-full px-6 py-4 mb-10 border border-gray-700/50">
//                 <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
//                 <span className="text-lg font-medium text-gray-300">
//                   <span className="inline-block min-w-[340px] h-7">
//                     {text}
//                     <span className="animate-pulse text-xl">|</span>
//                   </span>
//                 </span>
//               </div>

//               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
//                 <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
//                   Find Peace in
//                 </span>
//                 <br />
//                 <span className="text-gray-100">Every Conversation</span>
//               </h1>

//               <p className="text-xl text-gray-400 mb-12 leading-relaxed">
//                 MannSaathi provides compassionate support through confidential
//                 conversations, therapeutic tools, and professional guidance—all
//                 in one calm, secure environment.
//               </p>

//               <div className="flex flex-wrap gap-4 mb-10">
//                 <button
//                   onClick={() => navigate("/register")}
//                   className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/40 hover:scale-105"
//                 >
//                   <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
//                   <span className="relative flex items-center gap-3">
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                     Start Your Journey
//                   </span>
//                 </button>
//                 <button
//                   onClick={() => navigate("/services")}
//                   className="group px-10 py-5 bg-gray-800/40 backdrop-blur-sm border border-gray-700 text-gray-300 font-semibold rounded-full text-lg transition-all duration-300 hover:bg-gray-800/60 hover:border-gray-600 hover:scale-105"
//                 >
//                   <span className="flex items-center justify-center gap-3">
//                     Watch Demo
//                     <svg
//                       className="w-6 h-6 text-purple-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                   </span>
//                 </button>
//               </div>

//               {/* Stats */}
//               <div className="flex flex-wrap gap-10 pt-10 border-t border-gray-800/50">
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-blue-400">24/7</div>
//                   <div className="text-sm text-gray-400">Support Available</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-purple-400">100%</div>
//                   <div className="text-sm text-gray-400">Confidential</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-green-400">50K+</div>
//                   <div className="text-sm text-gray-400">Sessions Helped</div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="relative">
//               <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-8 h-full min-h-[400px]">
//                 <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-transparent"></div>

//                 <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
//                 <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full animate-pulse delay-1000"></div>

//                 <div className="relative z-10 h-full flex flex-col justify-center items-center">
//                   <div className="text-6xl mb-6">💭</div>
//                   <h3 className="text-2xl font-bold text-gray-100 mb-4 text-center">
//                     Safe & Secure
//                   </h3>
//                   <p className="text-gray-400 text-center max-w-md">
//                     Your privacy is our priority. All conversations are
//                     encrypted and anonymous.
//                   </p>

//                   <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full p-3 backdrop-blur-sm">
//                     <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
//                   </div>
//                   <div className="absolute bottom-6 left-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full p-3 backdrop-blur-sm">
//                     <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="container mx-auto px-6 mb-32">
//         <div className="flex items-center justify-between mb-10">
//           <div>
//             <h2 className="text-4xl font-bold text-gray-100">
//               Connect Anonymously
//             </h2>
//             <p className="text-gray-400 mt-2">
//               Choose your preferred way to connect
//             </p>
//           </div>
//           <button className="px-6 py-3 text-gray-400 hover:text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 rounded-full hover:bg-gray-800/30">
//             View all services
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {[
//             {
//               title: "Text Chat",
//               color: "from-blue-500 to-blue-700",
//               desc: "Anonymous text-based support",
//               icon: "💬",
//               path: "/text-chat",
//             },
//             {
//               title: "Audio Chat",
//               color: "from-green-500 to-green-700",
//               desc: "Voice conversations with therapists",
//               icon: "🎙️",
//               path: "/audio-chat",
//             },
//             {
//               title: "Video Chat",
//               color: "from-purple-500 to-purple-700",
//               desc: "Face-to-face professional sessions",
//               icon: "📹",
//               path: "/video-chat",
//             },
//           ].map((service, index) => (
//             <div
//               key={index}
//               className="group relative cursor-pointer"
//               onClick={() => navigate(service.path)}
//             >
//               <div className="absolute inset-0 bg-gradient-to-br via-gray-900/50 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
//               <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 transition-all duration-300 group-hover:scale-[1.02] group-hover:border-gray-600 group-hover:shadow-2xl overflow-hidden">
//                 <div
//                   className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-full -translate-y-16 translate-x-16`}
//                 ></div>
//                 <div className="relative z-10">
//                   <div className="text-5xl mb-6">{service.icon}</div>
//                   <h3 className="text-2xl font-bold text-gray-100 mb-4">
//                     {service.title}
//                   </h3>
//                   <p className="text-gray-400 mb-8">{service.desc}</p>
//                   <button className="px-6 py-3 bg-gray-800/50 rounded-full text-sm font-medium text-gray-300 group-hover:text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600/50 group-hover:to-purple-600/50">
//                     Start Session
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Stress Relief Tools */}
//       <section className="container mx-auto px-6 mb-32">
//         <div className="flex items-center justify-between mb-10">
//           <div>
//             <h2 className="text-4xl font-bold text-gray-100">
//               Therapeutic Activities
//             </h2>
//             <p className="text-gray-400 mt-2">
//               Designed to reduce stress and improve focus
//             </p>
//           </div>
//           <button className="px-6 py-3 text-gray-400 hover:text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 rounded-full hover:bg-gray-800/30">
//             Show all
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </div>

//         <div className="flex space-x-6 pb-4 overflow-x-auto hide-scrollbar">
//           {[
//             {
//               title: "Memory Game",
//               color: "from-cyan-500 to-blue-600",
//               emoji: "🧠",
//               path: "/memory-game",
//             },
//             {
//               title: "Breathing Exercise",
//               color: "from-emerald-500 to-green-600",
//               emoji: "🌬️",
//               path: "/breathing-game",
//             },
//             {
//               title: "Guided Meditation",
//               color: "from-violet-500 to-purple-600",
//               emoji: "🕉️",
//               path: "/meditation-choice-game",
//             },
//             {
//               title: "Coloring Therapy",
//               color: "from-pink-500 to-rose-600",
//               emoji: "🎨",
//               path: "/coloring-game",
//             },
//             {
//               title: "Mindful Journal",
//               color: "from-amber-500 to-orange-600",
//               emoji: "📓",
//               path: "/journal",
//             },
//             {
//               title: "Sleep Stories",
//               color: "from-indigo-500 to-blue-700",
//               emoji: "🌙",
//               path: "/sleep-stories",
//             },
//           ].map((tool, index) => (
//             <div
//               key={index}
//               className="group flex-shrink-0 w-72 cursor-pointer"
//               onClick={() => navigate(tool.path)}
//             >
//               <div className="relative h-80 rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-20`}
//                 ></div>
//                 <div className="relative h-full p-6 flex flex-col justify-between">
//                   <div className="text-5xl mb-4">{tool.emoji}</div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-100 mb-2">
//                       {tool.title}
//                     </h3>
//                     <p className="text-sm text-gray-400">
//                       Reduce stress and improve focus through therapeutic
//                       activities
//                     </p>
//                   </div>
//                   <button className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-gray-300 mt-4 group-hover:bg-white group-hover:text-gray-900 transition-all duration-300">
//                     Start Activity
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Yoga & Wellness Section - With Images */}
//       <section className="container mx-auto px-6 mb-32">
       
// <YogaPoses></YogaPoses>
             
//                </section>

//       <Footer />

//       {/* Hide scrollbar styles */}
//       <style jsx>{`
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Home;