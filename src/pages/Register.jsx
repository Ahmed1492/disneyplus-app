import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaPhone, FaCheckCircle } from "react-icons/fa";

export const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("dToken");
    if (token) navigate("/");
  }, [navigate]);

  const collectData = (e) => {
    setError("");
    setSuccess("");
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!userData.fullName || !userData.email || !userData.password || !userData.mobile) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post(
        "https://dc77528ae38f.ngrok-free.app/Registers/SignUp",
        userData
      );
      // Also save locally for offline/demo use
      const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
      localUsers.push(userData);
      localStorage.setItem("localUsers", JSON.stringify(localUsers));
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      // ── Offline fallback: save locally ──
      const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
      const exists = localUsers.find(u => u.email === userData.email);
      if (exists) {
        setError("An account with this email already exists.");
      } else {
        localUsers.push(userData);
        localStorage.setItem("localUsers", JSON.stringify(localUsers));
        setSuccess("Account created! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleRegister();
  };

  const fields = [
    { name: "fullName",  type: "text",     placeholder: "Enter your full name",  label: "Full Name",      icon: FaUser },
    { name: "email",     type: "email",    placeholder: "Enter your email",       label: "Email Address",  icon: FaEnvelope },
    { name: "mobile",    type: "tel",      placeholder: "Enter your phone number",label: "Phone Number",   icon: FaPhone },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#0f1014] text-white flex items-center justify-center py-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1014] via-[#1a1d29] to-[#0f1014]" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-[#02E7F5]/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[150px]" />

      <div className="relative z-10 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[480px] mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/disneyHeaderLogo.svg" alt="Disney+" className="w-36 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300" />
        </div>

        {/* Card */}
        <div className="w-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm">Join Disney+ and start streaming today</p>
          </div>

          {/* Error */}
          {error && (
            <div className="w-full bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-2 animate-fade-in">
              <span className="text-lg">⚠️</span> {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="w-full bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-2 animate-fade-in">
              <FaCheckCircle className="text-lg flex-shrink-0" /> {success}
            </div>
          )}

          {/* Text fields */}
          <div className="space-y-5">
            {fields.map(({ name, type, placeholder, label, icon: Icon }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-300 mb-2">{label}</label>
                <div className={`relative group transition-all duration-300 ${focusedField === name ? "scale-[1.02]" : ""}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#02E7F5]/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center">
                    <Icon className="absolute left-4 text-gray-400 group-hover:text-[#02E7F5] transition-colors" />
                    <input
                      onChange={collectData}
                      onFocus={() => setFocusedField(name)}
                      onBlur={() => setFocusedField("")}
                      onKeyPress={handleKeyPress}
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      value={userData[name]}
                      className="pl-12 pr-4 py-3.5 w-full outline-none rounded-xl bg-white/5 border border-white/10 focus:border-[#02E7F5]/50 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
              <div className={`relative group transition-all duration-300 ${focusedField === "password" ? "scale-[1.02]" : ""}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#02E7F5]/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  <FaLock className="absolute left-4 text-gray-400 group-hover:text-[#02E7F5] transition-colors" />
                  <input
                    onChange={collectData}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                    onKeyPress={handleKeyPress}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={userData.password}
                    className="pl-12 pr-12 py-3.5 w-full outline-none rounded-xl bg-white/5 border border-white/10 focus:border-[#02E7F5]/50 focus:bg-white/10 transition-all text-white placeholder-gray-500"
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
          </div>

          {/* Submit */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="relative w-full mt-8 rounded-xl py-4 bg-gradient-to-r from-[#02E7F5] to-[#0266c7] hover:from-[#02E7F5] hover:to-[#02E7F5] transition-all duration-300 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group shadow-lg shadow-[#02E7F5]/20 hover:shadow-[#02E7F5]/40 hover:scale-[1.02] disabled:hover:scale-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Account...
                </span>
              ) : "Create Account"}
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-gray-500 text-xs uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Sign in link */}
          <div className="text-center">
            <span className="text-gray-400 text-sm">Already have an account? </span>
            <Link to="/login" className="text-[#02E7F5] hover:text-white font-semibold text-sm transition-colors relative group inline-block">
              Sign In
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#02E7F5] group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>

        <p className="text-gray-500 text-xs text-center mt-8">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};
