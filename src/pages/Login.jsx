import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("dToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const collectData = (e) => {
    setError("");
    let key = e.target.name;
    let value = e.target.value;
    let newObj = { ...userData };
    newObj[key] = value;
    setUserData(newObj);
  };

  const handleLogin = async () => {
    if (!userData.email || !userData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let myResponse = await axios.post(
        "https://dc77528ae38f.ngrok-free.app/Registers/CheckAndGenerateToken",
        userData
      );
      let token = myResponse?.data;
      localStorage.setItem("dToken", token);
      // Merge with any existing stored profile data (e.g. fullName from register)
      const existing = JSON.parse(localStorage.getItem("userData") || "{}");
      localStorage.setItem("userData", JSON.stringify({ ...existing, ...userData }));
      navigate("/");
    } catch (error) {
      // ── Offline / demo fallback: store locally so the app works without backend ──
      const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
      const match = localUsers.find(u => u.email === userData.email && u.password === userData.password);
      if (match) {
        const mockToken = btoa(`${match.email}:${Date.now()}`);
        localStorage.setItem("dToken", mockToken);
        localStorage.setItem("userData", JSON.stringify(match));
        navigate("/");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0f1014] text-white flex items-center justify-center py-8 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1014] via-[#1a1d29] to-[#0f1014]" />
      
      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-[#02E7F5]/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 flex w-[90%] sm:w-[80%] md:w-[60%] lg:w-[450px] items-center m-auto flex-col">
        {/* Logo */}
        <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
          <img
            className="object-cover w-[10rem] drop-shadow-2xl"
            src="/disneyHeaderLogo.svg"
            alt="Disney+"
          />
        </div>

        {/* Login Card */}
        <div className="w-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm">
              Sign in to continue your journey
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="w-full bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm mb-6 backdrop-blur-sm animate-fade-in flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Email Input */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email Address
            </label>
            <div className={`relative group transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#02E7F5]/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-4 text-gray-400 group-hover:text-[#02E7F5] transition-colors" />
                <input
                  onChange={collectData}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  onKeyPress={handleKeyPress}
                  name="email"
                  className="pl-12 pr-4 py-3.5 w-full outline-none rounded-xl bg-white/5 border border-white/10 focus:border-[#02E7F5]/50 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                  type="email"
                  placeholder="Enter your email"
                  value={userData.email}
                />
              </div>
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Password
            </label>
            <div className={`relative group transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#02E7F5]/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-gray-400 group-hover:text-[#02E7F5] transition-colors" />
                <input
                  onChange={collectData}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  onKeyPress={handleKeyPress}
                  className="pl-12 pr-12 py-3.5 w-full outline-none rounded-xl bg-white/5 border border-white/10 focus:border-[#02E7F5]/50 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={userData.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-[#02E7F5] transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="relative w-full rounded-xl py-4 bg-gradient-to-r from-[#02E7F5] to-[#0266c7] hover:from-[#02E7F5] hover:to-[#02E7F5] transition-all duration-300 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group shadow-lg shadow-[#02E7F5]/20 hover:shadow-[#02E7F5]/40 hover:scale-[1.02] disabled:hover:scale-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Sign In"
              )}
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-gray-500 text-xs uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-gray-400 text-sm">Don't have an account? </span>
            <Link 
              className="text-[#02E7F5] hover:text-white font-semibold text-sm transition-colors relative group inline-block" 
              to="/register"
            >
              Sign Up
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#02E7F5] group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-gray-500 text-xs text-center mt-8 max-w-md">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};
