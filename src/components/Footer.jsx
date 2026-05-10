import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-t from-gray-900 via-gray-900 to-black border-t border-gray-800/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-3">
                <span className="text-2xl font-bold text-white">MS</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">MannSaathi</h3>
                <p className="text-sm text-gray-400">Mental Wellness Partner</p>
              </div>
            </div>
            <p className="text-gray-400 mb-8 max-w-md">
              Providing compassionate mental health support through confidential
              conversations, therapeutic tools, and professional guidance.
            </p>
            <div className="flex space-x-3">
              <button className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-blue-600/20 transition-all duration-300">
                <span className="text-gray-300 text-lg">𝕏</span>
              </button>
              <button className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-blue-600/20 transition-all duration-300">
                <span className="text-gray-300 text-lg">f</span>
              </button>
              <button className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-pink-600/20 transition-all duration-300">
                <span className="text-gray-300 text-lg">ig</span>
              </button>
              <button className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-blue-400/20 transition-all duration-300">
                <span className="text-gray-300 text-lg">in</span>
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Services</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate("/text-chat")}
                  className="text-gray-400 hover:text-white transition-all duration-200 text-sm hover:underline"
                >
                  Text Chat
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/audio-chat")}
                  className="text-gray-400 hover:text-white transition-all duration-200 text-sm hover:underline"
                >
                  Audio Sessions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/video-chat")}
                  className="text-gray-400 hover:text-white transition-all duration-200 text-sm hover:underline"
                >
                  Video Therapy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/emergency")}
                  className="text-gray-400 hover:text-white transition-all duration-200 text-sm hover:underline"
                >
                  Emergency Support
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Resources</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate("/articles")}
                  className="text-gray-400 hover:text-white transition-all duration-200 text-sm hover:underline"
                >
                  Articles & Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/meditation")}
                  className="text-gray-400 hover:text-white transition-all duration-200 text-sm hover:underline"
                >
                  Meditation Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/self-care")}
                  className="text-gray-400 hover:text-white transition-all duration-200 text-sm hover:underline"
                >
                  Self-Care Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/faq")}
                  className="text-gray-400 hover:text-white transition-all duration-200 text-sm hover:underline"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Support</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="text-gray-400 hover:text-white transition-all duration-200 text-sm hover:underline"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/privacy")}
                  className="text-gray-400 hover:text-white transition-all duration-200 text-sm hover:underline"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/terms")}
                  className="text-gray-400 hover:text-white transition-all duration-200 text-sm hover:underline"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/crisis")}
                  className="text-gray-400 hover:text-red-400 transition-all duration-200 text-sm hover:underline"
                >
                  Crisis Hotlines
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800/50">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold text-white mb-4">
              Stay Updated
            </h4>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-5 py-3.5 bg-gray-800/50 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-900/30 transition-all duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 ml-5">
              Receive mental wellness tips and updates
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MannSaathi. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Need immediate help?</span>
            <button
              onClick={() => navigate("/emergency")}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-red-900/30 transition-all duration-300"
            >
              Emergency Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;