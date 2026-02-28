import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { getToken, removeToken } from "../utils/auth";

const Dashboard = () => {
  const [account, setAccount] = useState<{
    username: string;
    email?: string;
    balance: number;
    kyc_verified: boolean;
  } | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAccount = async () => {
      const token = getToken();

      if (!token) {
        setError("Not authenticated. Please login again.");
        setIsLoading(false);
        navigate("/login");
        return;
      }

      try {
        setError("");
        const res = await api.get("/accounts/me/");
        const data = res?.data ?? {};
        console.log("Account data received:", data);

        if (!data || !data.username) {
          setError("No account data received. Please check your profile.");
          setIsLoading(false);
          return;
        }

        setAccount({
          username: data.username || "Unknown User",
          email: data.email || undefined,
          balance: Number(data.balance) || 0,
          kyc_verified: data.kyc_verified ?? false,
        });
      } catch (err: any) {
        console.error("Dashboard loadAccount error:", err);
        console.error("Error details:", {
          status: err?.response?.status,
          data: err?.response?.data,
          message: err?.message,
        });

        const status = err?.response?.status;
        const backendMsg =
          err?.response?.data?.error ||
          err?.response?.data?.detail ||
          err?.response?.data?.message;

        if (status === 401) {
          setError("Session expired or invalid token. Please login again.");
          removeToken();
          navigate("/login");
        } else if (status === 404) {
          // could be missing URL or missing wallet/account
          setError(
            backendMsg ||
              "Resource not found. Check backend configuration or your account.",
          );
        } else {
          setError(backendMsg || err?.message || "Failed to load account.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadAccount();
  }, [navigate]);

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-2xl font-bold text-white">
            Loading your account...
          </p>
        </div>
      </div>
    );
  }

  if (error || !account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-red-900/20 border-2 border-red-500/50 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Unable to Load Dashboard
          </h2>
          <p className="text-red-200 mb-6">
            {error || "Failed to load your account. Please check your profile."}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              Refresh Page
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation Bar */}
      <nav className="bg-slate-900/95 backdrop-blur border-b border-blue-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">💎</div>
            <h1 className="text-2xl font-bold text-white">Nexus Fintech</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">
              Welcome, <strong>{account?.username}</strong>
            </span>
            <button
              onClick={() => navigate("/change-password")}
              className="px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-300 hover:text-yellow-200 font-semibold rounded-lg border border-yellow-500/30 transition"
            >
              🔐 Password
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-red-200 font-semibold rounded-lg border border-red-500/30 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Dashboard</h2>
          <p className="text-gray-400">
            Manage your finances with ease and confidence
          </p>
        </div>

        {/* Primary Balance Card */}
        <div className="mb-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl">
          <p className="text-blue-100 mb-2">Total Balance</p>
          <h3 className="text-5xl font-bold mb-8">
            ${(Number(account?.balance) || 0).toFixed(2)}
          </h3>
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`px-3 py-1 rounded-full ${
                account?.kyc_verified
                  ? "bg-green-500/30 text-green-200"
                  : "bg-yellow-500/30 text-yellow-200"
              }`}
            >
              {account?.kyc_verified ? "✓ KYC Verified" : "⚠ KYC Pending"}
            </span>
          </div>
        </div>

        {/* Account Info Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Account Info Card */}
          <div className="bg-slate-800/50 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-400/60 transition">
            <div className="text-3xl mb-3">👤</div>
            <h4 className="text-lg font-bold text-white mb-4">Account Info</h4>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">Username</p>
                <p className="text-white font-semibold">{account?.username}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-semibold">
                  {account?.email || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-slate-800/50 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-400/60 transition">
            <div className="text-3xl mb-3">📊</div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Transactions</span>
                <span className="text-white font-semibold">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Account Age</span>
                <span className="text-white font-semibold">Fresh</span>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-slate-800/50 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-400/60 transition">
            <div className="text-3xl mb-3">🔐</div>
            <h4 className="text-lg font-bold text-white mb-4">Security</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-gray-300">2FA Enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-gray-300">Verified Email</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "💰",
                label: "Deposit",
                color: "from-green-600 to-emerald-600",
                route: "/deposit",
              },
              {
                icon: "💸",
                label: "Withdraw",
                color: "from-orange-600 to-amber-600",
                route: "/withdraw",
              },
              {
                icon: "🔄",
                label: "Transfer",
                color: "from-purple-600 to-pink-600",
                route: "/transfer",
              },
              {
                icon: "📈",
                label: "Invest",
                color: "from-blue-600 to-cyan-600",
                route: "/invest",
              },
            ].map((action, i) => (
              <button
                key={i}
                onClick={() => navigate(action.route)}
                className={`bg-gradient-to-br ${action.color} rounded-xl p-6 text-white font-bold hover:shadow-lg transition transform hover:scale-105 text-center`}
              >
                <div className="text-4xl mb-2">{action.icon}</div>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-slate-800/50 border border-blue-500/30 rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-white mb-6">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              {
                type: "Deposit",
                amount: "+$500.00",
                date: "Today",
                status: "✓",
              },
              {
                type: "Transfer",
                amount: "-$150.00",
                date: "Yesterday",
                status: "✓",
              },
              {
                type: "Withdrawal",
                amount: "-$100.00",
                date: "2 days ago",
                status: "✓",
              },
            ].map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">
                    {tx.type === "Deposit"
                      ? "📥"
                      : tx.type === "Transfer"
                        ? "🔄"
                        : "📤"}
                  </span>
                  <div>
                    <p className="text-white font-semibold">{tx.type}</p>
                    <p className="text-gray-400 text-sm">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${tx.amount.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                  >
                    {tx.amount}
                  </p>
                  <p className="text-green-400 text-sm">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-blue-500/20 py-8 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>© 2026 Nexus Fintech. Secure banking for everyone.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
