import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      await api.post("/auth/register/", { username, password });
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Registration failed. Please try again.",
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💎</div>
          <h1 className="text-4xl font-bold text-white mb-2">Nexus Fintech</h1>
          <p className="text-blue-300">Join our growing community</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800/50 backdrop-blur rounded-3xl shadow-2xl p-8 border border-blue-500/30">
          {error && (
            <div className="mb-4 p-4 bg-red-900/50 border border-red-500/50 rounded-xl">
              <p className="text-red-200 text-sm">❌ {error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-900/50 border border-green-500/50 rounded-xl">
              <p className="text-green-200 text-sm">✅ {success}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-2 border-blue-500/30 bg-slate-700/50 text-white placeholder-gray-400 focus:border-blue-400 p-3 rounded-lg focus:outline-none transition"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-blue-500/30 bg-slate-700/50 text-white placeholder-gray-400 focus:border-blue-400 p-3 rounded-lg focus:outline-none transition"
                required
                disabled={isLoading}
              />
              <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border-2 border-blue-500/30 bg-slate-700/50 text-white placeholder-gray-400 focus:border-blue-400 p-3 rounded-lg focus:outline-none transition"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "✍️ Create Account"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-blue-500/20 text-center">
            <p className="text-gray-400 text-sm mb-4">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-400 font-semibold hover:text-blue-300 underline"
              >
                Sign in instead
              </button>
            </p>
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 hover:text-gray-400 text-sm underline"
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
