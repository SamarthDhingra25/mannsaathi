import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setIsLoading(true);

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Login Successful!");

    navigate("/dashboard");

  } catch (error) {
    alert(error.message);
  } finally {
    setIsLoading(false);
  }
};
const handleForgotPassword = async () => {
  if (!email) {
    alert("Please enter your email first.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent.");
  } catch (error) {
    alert(error.message);
  }
};
const handleSignUp = () => {
  navigate("/register");
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-sky-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-sky-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="w-full max-w-5xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div
                className="inline-flex items-center space-x-3 cursor-pointer group mb-6"
                onClick={() => navigate("/")}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-white px-5 py-3 rounded-2xl">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      MannSaathi
                    </span>
                  </div>
                </div>
                <span className="text-lg font-medium text-blue-600/70 hidden md:inline">
                  Your Mental Wellness Partner
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Welcome Back
                </span>
              </h1>

              <p className="text-blue-700/70 text-lg max-w-2xl mx-auto">
                Sign in to continue your journey towards better mental wellbeing
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Login Form */}
              <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-3xl p-10 shadow-2xl">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-blue-900 mb-3">
                    Sign In
                  </h2>
                  <p className="text-blue-700/70">
                    Access your personalized wellness tools
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Email Field */}
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-blue-900 font-medium text-lg">
                        Email Address
                      </span>
                      <div className="relative mt-2">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg
                            className="w-5 h-5 text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-blue-50/50 border border-blue-200 rounded-xl text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </label>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-blue-900 font-medium text-lg">
                        Password
                      </span>
                      <div className="relative mt-2">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg
                            className="w-5 h-5 text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-12 pr-12 py-4 bg-blue-50/50 border border-blue-200 rounded-xl text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-400 hover:text-blue-600"
                        >
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
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                      </div>
                    </label>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="sr-only"
                        />
                        <div
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                            rememberMe
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500 border-transparent"
                              : "border-blue-300"
                          }`}
                        >
                          {rememberMe && (
                            <svg
                              className="w-4 h-4 text-white"
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
                          )}
                        </div>
                      </div>
                      <span className="text-blue-800 font-medium">
                        Remember me
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center gap-3">
                      {isLoading ? (
                        <>
                          <svg
                            className="w-5 h-5 animate-spin"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In
                          <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-10">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-blue-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/80 text-blue-700/70">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-3 gap-4">
                  <button className="group p-4 bg-white border border-blue-200 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105">
                    <div className="flex justify-center text-2xl">
                      <span className="group-hover:scale-110 transition-transform duration-300">
                        G
                      </span>
                    </div>
                  </button>
                  <button className="group p-4 bg-white border border-blue-200 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105">
                    <div className="flex justify-center text-2xl text-blue-600">
                      <span className="group-hover:scale-110 transition-transform duration-300">
                        f
                      </span>
                    </div>
                  </button>
                  <button className="group p-4 bg-white border border-blue-200 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105">
                    <div className="flex justify-center text-2xl text-blue-400">
                      <span className="group-hover:scale-110 transition-transform duration-300">
                        in
                      </span>
                    </div>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="mt-10 text-center">
                  <p className="text-blue-700/70">
                    Don't have an account?{" "}
                    <button
                      onClick={handleSignUp}
                      className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 hover:underline"
                    >
                      Create Account
                    </button>
                  </p>
                </div>
              </div>

              {/* Right Side - Benefits & Features */}
              <div className="space-y-8">
                {/* Security Info */}
                <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 backdrop-blur-sm border border-blue-200 rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-blue-900">
                        Secure & Private
                      </h3>
                      <p className="text-blue-700/70">
                        Your data is encrypted and protected
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
                      <span className="text-blue-800">
                        End-to-end encryption
                      </span>
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
                      <span className="text-blue-800">Zero data sharing</span>
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
                      <span className="text-blue-800">HIPAA compliant</span>
                    </li>
                  </ul>
                </div>

                {/* Features */}
                <div className="bg-gradient-to-br from-sky-600/10 to-blue-600/10 backdrop-blur-sm border border-sky-200 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-6">
                    What's Inside?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-400 to-blue-400 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl text-white">💬</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">
                          Chat Support
                        </h4>
                        <p className="text-blue-700/70 text-sm">
                          24/7 confidential conversations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl text-white">🧘</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">
                          Wellness Tools
                        </h4>
                        <p className="text-blue-700/70 text-sm">
                          Meditation, yoga, and breathing exercises
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl text-white">🎮</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">
                          Therapeutic Games
                        </h4>
                        <p className="text-blue-700/70 text-sm">
                          Stress-relief activities and mindfulness games
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gradient-to-br from-cyan-600/10 to-blue-600/10 backdrop-blur-sm border border-cyan-200 rounded-3xl p-8">
                  <div className="text-5xl mb-4">❝</div>
                  <p className="text-blue-800 italic mb-6">
                    "MannSaathi helped me find peace during my most challenging
                    times. The tools and support are invaluable."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center">
                      <span className="text-white font-bold">A</span>
                    </div>
                    <div>
                      <div className="font-bold text-blue-900">Alex Morgan</div>
                      <div className="text-sm text-blue-700/70">
                        Member since 2023
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-12 text-center">
              <p className="text-blue-700/60 text-sm">
                By signing in, you agree to our{" "}
                <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Privacy Policy
                </button>
              </p>
              <p className="text-blue-700/60 text-sm mt-2">
                Need help?{" "}
                <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                  Contact Support
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;