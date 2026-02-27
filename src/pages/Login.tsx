import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { setToken } from "../utils/auth";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login/", { username, password });
      const token = res.data.access;
      if (!token) {
        setError("No token received from server. Please try again.");
        setIsLoading(false);
        return;
      }
      setToken(token);
      setAuthToken(token);
      console.log(
        "Login successful, token set:",
        token.substring(0, 20) + "...",
      );

      setAuth(true);
      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err: any) {
      console.error("Login error:", err);
      const statusCode = err?.response?.status;
      const backendMsg =
        err?.response?.data?.detail || err?.response?.data?.message;

      if (statusCode === 401) {
        setError(
          backendMsg ||
            "Invalid username or password. Please check your credentials.",
        );
      } else if (statusCode === 404) {
        setError("User not found. Please register first.");
      } else {
        setError(backendMsg || "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💎</div>
          <h1 className="text-4xl font-bold text-white mb-2">Nexus Fintech</h1>
          <p className="text-blue-300">Sign in to your account</p>
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

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-blue-500/30 bg-slate-700/50 text-white placeholder-gray-400 focus:border-blue-400 p-3 rounded-lg focus:outline-none transition"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "🔓 Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-blue-500/20 text-center">
            <p className="text-gray-400 text-sm mb-4">
              New to Nexus Fintech?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-400 font-semibold hover:text-blue-300 underline"
              >
                Create an account
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

export default Login;
