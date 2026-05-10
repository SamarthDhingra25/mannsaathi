import React, { useState, useRef, useEffect } from "react";
import { sendMessageToGroq } from "../api/groqService";

function TextChat() {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "MannSaathi",
      message:
        "Hello! I'm MannSaathi, your mental wellness companion. How are you feeling today?",
      timestamp: new Date(),
      id: Date.now(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const userChat = {
      sender: "You",
      message: userMessage,
      timestamp: new Date(),
      id: Date.now(),
    };

    setChatHistory((prev) => [...prev, userChat]);
    setUserMessage("");
    setLoading(true);
    setIsTyping(true);

    try {
      const aiReply = await sendMessageToGroq(userMessage);

      // Simulate typing delay for better UX
      setTimeout(() => {
        const aiChat = {
          sender: "MannSaathi",
          message: aiReply,
          timestamp: new Date(),
          id: Date.now() + 1,
        };
        setChatHistory((prev) => [...prev, aiChat]);
        setLoading(false);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      const errorChat = {
        sender: "MannSaathi",
        message: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date(),
        id: Date.now() + 1,
      };
      setChatHistory((prev) => [...prev, errorChat]);
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleQuickReply = (message) => {
    setUserMessage(message);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setChatHistory([
        {
          sender: "MannSaathi",
          message:
            "Hello! I'm MannSaathi, your mental wellness companion. How are you feeling today?",
          timestamp: new Date(),
          id: Date.now(),
        },
      ]);
    }
  };

  const quickReplies = [
    "I'm feeling anxious today",
    "Can you help me relax?",
    "I'm having trouble sleeping",
    "Tell me something positive",
    "I'm feeling overwhelmed",
    "How can I reduce stress?",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full px-5 py-2.5 mb-6 border border-blue-200">
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700">
              Confidential Chat Support
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Text Chat Support
            </span>
            <br />
            <span className="text-gray-800">with MannSaathi AI</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Share your thoughts and feelings in a safe, anonymous space. Our AI
            companion is here to listen and support you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Chat Features */}
          <div className="space-y-8">
            {/* Privacy Card */}
            <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                  <span className="text-2xl">🔒</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    100% Private
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your conversations are secure
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">End-to-end encrypted</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">No data storage</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">Completely anonymous</span>
                </li>
              </ul>
            </div>

            {/* Quick Replies */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm border border-blue-200 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                Quick Messages
              </h3>
              <div className="space-y-3">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="w-full text-left p-4 bg-white/50 hover:bg-white border border-blue-200 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                  >
                    <div className="text-gray-700 text-sm">{reply}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center Panel - Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-3xl p-8 shadow-xl">
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-2xl">💬</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      MannSaathi AI
                    </h3>
                    <p className="text-gray-600">Your wellness companion</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-sm text-blue-700">
                    <span className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Online
                    </span>
                  </div>
                  <button
                    onClick={clearChat}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    Clear Chat
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-[400px] mb-6 rounded-2xl bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 overflow-hidden">
                <div className="h-full overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {chatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      className={`flex ${
                        chat.sender === "You" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] ${
                          chat.sender === "You" ? "ml-auto" : "mr-auto"
                        }`}
                      >
                        {/* Message Header */}
                        <div
                          className={`flex items-center gap-2 mb-2 ${
                            chat.sender === "You"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              chat.sender === "You"
                                ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                                : "bg-gradient-to-r from-purple-500 to-pink-500"
                            }`}
                          >
                            <span className="text-sm text-white">
                              {chat.sender === "You" ? "👤" : "🤖"}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-700">
                            {chat.sender}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatTime(chat.timestamp)}
                          </div>
                        </div>

                        {/* Message Bubble */}
                        <div
                          className={`rounded-2xl p-4 ${
                            chat.sender === "You"
                              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none"
                              : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                          }`}
                        >
                          <p className="leading-relaxed whitespace-pre-wrap">
                            {chat.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-sm text-white">🤖</span>
                          </div>
                          <div className="text-sm font-medium text-gray-700">
                            MannSaathi
                          </div>
                        </div>
                        <div className="rounded-2xl p-4 bg-white border border-gray-200 rounded-bl-none shadow-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                            <span className="ml-2 text-gray-600 text-sm">
                              Thinking...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Input */}
              <form onSubmit={handleSend} className="space-y-4">
                <div className="relative">
                  <input
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pr-24"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type your message here..."
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={!userMessage.trim() || loading}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div>
                    Press{" "}
                    <kbd className="px-2 py-1 bg-gray-100 rounded">Enter</kbd>{" "}
                    to send
                  </div>
                  <div>{chatHistory.length - 1} messages</div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm border border-blue-200 rounded-3xl p-6">
            <div className="text-4xl mb-4">🤝</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">
              Non-judgmental
            </h4>
            <p className="text-gray-600">
              Share anything without fear of judgment. This is your safe space.
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 backdrop-blur-sm border border-indigo-200 rounded-3xl p-6">
            <div className="text-4xl mb-4">⏰</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">
              24/7 Available
            </h4>
            <p className="text-gray-600">
              Always here whenever you need someone to talk to, day or night.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-sm border border-purple-200 rounded-3xl p-6">
            <div className="text-4xl mb-4">💡</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">
              Helpful Guidance
            </h4>
            <p className="text-gray-600">
              Receive compassionate responses and helpful suggestions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextChat;