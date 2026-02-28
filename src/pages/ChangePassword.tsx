import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { getToken, removeToken } from "../utils/auth";

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validations
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    if (oldPassword === newPassword) {
      setError("New password must be different from current password.");
      setIsLoading(false);
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }

      await api.post("/accounts/change-password/", {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      setSuccess(
        "Password changed successfully! You will be logged out in 2 seconds...",
      );

      setTimeout(() => {
        removeToken();
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      console.error("Change password error:", err);
      const backendMsg =
        err?.response?.data?.error || err?.response?.data?.message;
      setError(backendMsg || "Failed to change password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <nav className="mb-8 flex items-center justify-between max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 font-semibold rounded-lg border border-blue-500/30 transition"
        >
          ← Back to Dashboard
        </button>
      </nav>

      <div className="max-w-md mx-auto">
        {/* Card */}
        <div className="bg-slate-800/50 backdrop-blur rounded-3xl shadow-2xl p-8 border border-blue-500/30">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Change Password
            </h1>
            <p className="text-gray-400">Update your account password</p>
          </div>

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

          <form onSubmit={handleChangePassword} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter your current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full border-2 border-blue-500/30 bg-slate-700/50 text-white placeholder-gray-400 focus:border-blue-400 p-3 rounded-lg focus:outline-none transition"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border-2 border-blue-500/30 bg-slate-700/50 text-white placeholder-gray-400 focus:border-blue-400 p-3 rounded-lg focus:outline-none transition"
                required
                disabled={isLoading}
              />
              <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm your new password"
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
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Updating..." : "🔐 Change Password"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-blue-500/20 text-center">
            <p className="text-gray-500 text-sm">
              Password changed? You'll be redirected to login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
