import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAccount } from "../api/account";
import {
  deposit,
  withdraw,
  transfer,
  getTransactions,
} from "../api/transaction";

import { getWallets } from "../api/wallet";
import { getNotifications } from "../api/notification";
import { connectTransactionsWS } from "../api/ws";

import Navbar from "../components/Navbar";
import BalanceCard from "../components/BalanceCard";
import DepositForm from "../components/DepositForm";
import WithdrawForm from "../components/WithdrawForm";
import TransferForm from "../components/TransferForm";
import TransactionTable from "../components/TransactionTable";
import KYCBanner from "../components/KYCBanner";
import Toast from "../components/Toast";

import WalletSwitcher from "../components/WalletSwitcher";
import BalanceChart from "../components/BalanceChart";
import NotificationsPanel from "../components/NotificationsPanel";
import BankCard from "../components/BankCard";

import { useToast } from "../hooks/useToast";

import type { Account } from "../types/account";
import type { Transaction } from "../types/transaction";
import type { Wallet } from "../types/wallet";
import type { Notification } from "../types/notification";

const Dashboard: React.FC = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalTx, setTotalTx] = useState(0);
  const [page, setPage] = useState(1);

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [currentWallet, setCurrentWallet] = useState<number | null>(null);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { toast, showToast } = useToast();
  const navigate = useNavigate();

  // ---------- LOADERS ----------

  const loadAccount = async () => {
    try {
      const data = await fetchAccount();
      setAccount(data);
      setError(null);
    } catch (err: any) {
      console.error("Failed to load account:", err);
      const errorMsg =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to load account data";
      setError(
        `${errorMsg}. Make sure the backend is running at http://127.0.0.1:8000`,
      );
      showToast("Failed to load account", "error");
    }
  };

  const loadTransactions = async (p = page) => {
    try {
      const data = await getTransactions(p);
      setTransactions(data.results);
      setTotalTx(data.count);
    } catch (err) {
      console.error("Failed to load transactions", err);
      showToast("Failed to load transactions", "error");
    }
  };

  const loadWallets = async () => {
    try {
      const data = await getWallets();
      setWallets(data);
      if (data.length && !currentWallet) {
        setCurrentWallet(data[0].id);
      }
    } catch (err) {
      console.error("Failed to load wallets", err);
    }
  };

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  // ---------- INITIAL LOAD ----------

  useEffect(() => {
    const initDashboard = async () => {
      setIsLoading(true);
      console.log("🚀 Initializing dashboard...");
      console.log(
        "📌 Token:",
        localStorage.getItem("access_token") ? "✅ Found" : "❌ Missing",
      );

      try {
        await Promise.all([
          loadAccount(),
          loadTransactions(),
          loadWallets(),
          loadNotifications(),
        ]);

        connectTransactionsWS(() => {
          loadAccount();
          loadTransactions();
        });
      } catch (err) {
        console.error("❌ Failed to initialize dashboard", err);
        setError("Failed to load dashboard. Please refresh.");
      } finally {
        setIsLoading(false);
      }
    };

    initDashboard();
  }, []);

  // ---------- REALTIME BALANCE POLL FALLBACK ----------

  useEffect(() => {
    const i = setInterval(loadAccount, 10000);
    return () => clearInterval(i);
  }, []);

  // ---------- ACTIONS ----------

  const handleDeposit = async (amount: number) => {
    try {
      await deposit(amount);
      showToast("Deposit successful ✅", "success");
      loadAccount();
      loadTransactions();
    } catch {
      showToast("Deposit failed ❌", "error");
    }
  };

  const handleWithdraw = async (amount: number) => {
    try {
      await withdraw(amount);
      showToast("Withdraw successful ✅", "success");
      loadAccount();
      loadTransactions();
    } catch {
      showToast("Withdraw failed ❌", "error");
    }
  };

  const handleTransfer = async (recipient: string, amount: number) => {
    try {
      await transfer(recipient, amount);
      showToast("Transfer successful ✅", "success");
      loadAccount();
      loadTransactions();
    } catch {
      showToast("Transfer failed ❌", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    showToast("Logged out successfully", "success");
    setTimeout(() => navigate("/login"), 500);
  };

  // ---------- LOADING STATE ----------

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="h-20 bg-gradient-to-r from-blue-700 to-blue-900"></div>

        <div className="max-w-7xl mx-auto p-6">
          <div className="space-y-6">
            {/* Skeleton KYC Banner */}
            <div className="h-16 bg-white rounded-lg shadow animate-pulse"></div>

            {/* Skeleton Balance Cards */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow animate-pulse"></div>
              <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow animate-pulse"></div>
              <div className="h-40 bg-white rounded-lg shadow animate-pulse"></div>
            </div>

            {/* Skeleton Form Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="h-48 bg-white rounded-lg shadow animate-pulse"></div>
              <div className="h-48 bg-white rounded-lg shadow animate-pulse"></div>
              <div className="h-48 bg-white rounded-lg shadow animate-pulse"></div>
            </div>

            {/* Loading Text */}
            <div className="text-center mt-12">
              <div className="inline-block">
                <div className="h-8 w-32 bg-gray-300 rounded animate-pulse mb-4"></div>
                <div className="flex gap-1 justify-center">
                  <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div
                    className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- ERROR STATE ----------

  if (error || !account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl text-center border-l-4 border-red-500">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Backend Connection Error
          </h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            {error || "Failed to connect to the backend API."}
          </p>

          {/* Troubleshooting Info */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left rounded">
            <h3 className="font-bold text-gray-800 mb-3">
              🔧 Troubleshooting Steps:
            </h3>
            <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
              <li>
                Make sure your Django backend is running on{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  http://127.0.0.1:8000
                </code>
              </li>
              <li>Check that your backend has the correct API endpoints</li>
              <li>Verify your login token is valid</li>
              <li>
                Check browser DevTools Console (F12) for detailed error messages
              </li>
              <li>Ensure CORS is properly configured in Django settings</li>
            </ol>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              🔄 Retry
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              🚪 Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- SUCCESS STATE ----------

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-lg p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {account.username}! 👋
          </h1>
          <p className="text-blue-100">
            Your financial dashboard is ready to go
          </p>
        </div>

        {/* KYC Banner */}
        <KYCBanner verified={account.kyc_verified} />

        {/* Wallet Switch */}
        {wallets.length > 0 && currentWallet && (
          <WalletSwitcher
            wallets={wallets}
            current={currentWallet}
            onChange={(id) => setCurrentWallet(id)}
          />
        )}

        {/* Top Section: Balance, Card, Notifications */}
        <div className="grid lg:grid-cols-3 gap-6">
          <BalanceCard balance={account.balance} />
          <BankCard
            holder={account.username}
            number="5399 1234 5678 9010"
            expiry="12/29"
          />
          <NotificationsPanel items={notifications} />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <DepositForm onDeposit={handleDeposit} />
          <WithdrawForm onWithdraw={handleWithdraw} />
          <TransferForm onTransfer={handleTransfer} />
        </div>

        {/* Analytics Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📊 Balance History
          </h2>
          <BalanceChart transactions={transactions} />
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-green-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📄 Recent Transactions
          </h2>
          <TransactionTable
            data={transactions}
            page={page}
            total={totalTx}
            onPageChange={(p) => {
              setPage(p);
              loadTransactions(p);
            }}
          />
        </div>

        {/* Footer Info */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-lg p-6 text-white text-center">
          <p className="text-sm opacity-90">
            🔒 Your account is secure and encrypted • Last update:{" "}
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Toast Notifications */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50">
          <Toast message={toast.message} type={toast.type} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
