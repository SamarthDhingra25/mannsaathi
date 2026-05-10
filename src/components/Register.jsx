import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-amber-200/20 to-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-to-r from-yellow-200/20 to-amber-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center space-x-3 cursor-pointer group mb-6"
              onClick={() => navigate("/")}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white px-5 py-3 rounded-2xl">
                  <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    MannSaathi
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent">
                Create Account
              </span>
            </h1>

            <p className="text-amber-700/80 text-lg">
              Join our community and start your wellness journey
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white/90 backdrop-blur-sm border border-amber-200 rounded-3xl p-8 shadow-xl">
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-amber-900 font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-amber-50/50 border border-amber-200 rounded-xl text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-amber-900 font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-amber-400"
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-amber-50/50 border border-amber-200 rounded-xl text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-amber-900 font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-amber-400"
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-amber-50/50 border border-amber-200 rounded-xl text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-amber-900 font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-amber-400"
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
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-amber-50/50 border border-amber-200 rounded-xl text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3">
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    id="terms"
                    className="sr-only"
                    required
                  />
                  <div className="w-5 h-5 rounded border-2 border-amber-300 flex items-center justify-center cursor-pointer">
                    <svg
                      className="w-3 h-3 text-amber-600 opacity-0"
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
                </div>
                <label
                  htmlFor="terms"
                  className="text-sm text-amber-700/80 cursor-pointer"
                >
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-amber-600 hover:text-amber-800 font-medium transition-colors duration-200"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-amber-600 hover:text-amber-800 font-medium transition-colors duration-200"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full py-5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
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
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-amber-700/70">
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social Sign Up */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <button className="group p-4 bg-white border border-amber-200 rounded-xl hover:bg-amber-50 transition-all duration-300 hover:scale-105">
                <div className="flex justify-center text-xl">
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    G
                  </span>
                </div>
              </button>
              <button className="group p-4 bg-white border border-amber-200 rounded-xl hover:bg-amber-50 transition-all duration-300 hover:scale-105">
                <div className="flex justify-center text-xl text-blue-600">
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    f
                  </span>
                </div>
              </button>
              <button className="group p-4 bg-white border border-amber-200 rounded-xl hover:bg-amber-50 transition-all duration-300 hover:scale-105">
                <div className="flex justify-center text-xl text-blue-400">
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    in
                  </span>
                </div>
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-amber-700/80">
                Already have an account?{" "}
                <button
                  onClick={handleLoginClick}
                  className="text-amber-600 hover:text-amber-800 font-semibold transition-colors duration-200 hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg">🔒</span>
              </div>
              <h4 className="font-bold text-amber-900 mb-1">
                Secure & Private
              </h4>
              <p className="text-amber-700/70 text-sm">
                Your data is always protected
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg">💬</span>
              </div>
              <h4 className="font-bold text-amber-900 mb-1">24/7 Support</h4>
              <p className="text-amber-700/70 text-sm">
                Always here when you need us
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg">🧘</span>
              </div>
              <h4 className="font-bold text-amber-900 mb-1">Wellness Tools</h4>
              <p className="text-amber-700/70 text-sm">
                Access all therapeutic features
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;