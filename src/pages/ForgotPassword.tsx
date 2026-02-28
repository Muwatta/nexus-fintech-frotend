import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const res = await api.post("/auth/forgot-password/", { email });
      setSuccess(
        res.data?.detail || "Check your email for further instructions.",
      );
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Unable to send reset email. Please try again.",
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💎</div>
          <h1 className="text-4xl font-bold text-white mb-2">Nexus Fintech</h1>
          <p className="text-blue-300">Forgot your password?</p>
        </div>

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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-blue-500/30 bg-slate-700/50 text-white placeholder-gray-400 focus:border-blue-400 p-3 rounded-lg focus:outline-none transition"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-blue-500/20 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-gray-500 hover:text-gray-400 text-sm underline"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
