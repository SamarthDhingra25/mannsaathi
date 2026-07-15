import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
    navigate("/login");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-transparent backdrop-blur-xl transition-all duration-300 border-b border-gray-800/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gray-900 px-5 py-3 rounded-2xl">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  MannSaathi
                </span>
              </div>
            </div>
            <span className="text-xs font-medium text-gray-400 hidden md:inline">
              Your Mental Wellness Partner
            </span>
          </Link>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className="px-5 py-2.5 text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium rounded-full hover:bg-gray-800/30"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="px-5 py-2.5 text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium rounded-full hover:bg-gray-800/30"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="px-5 py-2.5 text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium rounded-full hover:bg-gray-800/30"
            >
              About
            </Link>
           
          </div>

          {/* Action Buttons - Right Side */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Link
                to="/assessment-quiz"
                className="px-4 py-2 text-sm font-medium text-red-300 hover:text-red-100 transition-all duration-200 rounded-full border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/10"
              >
                Self-Assessment
              </Link>

              <Link
                to="/mood-tracker"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-200 rounded-full border border-gray-700 hover:border-gray-600 hover:bg-gray-800/30"
              >
                Mood Tracker
              </Link>
            </div>

            <div className="h-6 w-px bg-gray-700"></div>

            <div className="flex items-center space-x-3">
  {currentUser ? (
    <button
      onClick={handleLogout}
      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-medium transition"
    >
      Logout
    </button>
  ) : (
    <>
      <Link
        to="/login"
        className="px-6 py-2.5 text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium rounded-full hover:bg-gray-800/30"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full text-sm transition-all duration-300 overflow-hidden group hover:shadow-xl hover:shadow-blue-900/30 hover:scale-105"
      >
        Register
      </Link>
    </>
  )}
</div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="absolute right-6 top-5 text-gray-400 hover:text-white"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          {isMenuOpen && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex flex-col space-y-3">
                <Link
                  to="/"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/30 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/services"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/30 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  to="/about"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/30 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/assessment-quiz"
                  className="px-4 py-2 text-red-300 hover:text-red-100 hover:bg-red-500/10 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Self-Assessment
                </Link>
                <Link
                  to="/mood-tracker"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/30 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mood Tracker
                </Link>
               <div className="pt-2 space-y-2">
  {currentUser ? (
    <button
      onClick={() => {
        handleLogout();
        setIsMenuOpen(false);
      }}
      className="w-full px-4 py-2 bg-red-600 text-white rounded-lg"
    >
      Logout
    </button>
  ) : (
    <>
      <Link
        to="/login"
        className="block px-4 py-2 text-center text-gray-300 hover:text-white hover:bg-gray-800/30 rounded-lg"
        onClick={() => setIsMenuOpen(false)}
      >
        Login
      </Link>

      <Link
        to="/register"
        className="block px-4 py-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
        onClick={() => setIsMenuOpen(false)}
      >
        Register
      </Link>
    </>
  )}
</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;