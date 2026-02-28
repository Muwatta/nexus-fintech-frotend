import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DepositForm from "../components/DepositForm";
import { deposit } from "../api/transaction";

const Deposit: React.FC = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleDeposit = async (amount: number) => {
    setError("");
    try {
      const res = await deposit(amount);
      setSuccess(`Deposit successful. New balance: $${res.balance.toFixed(2)}`);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: any) {
      console.error("Deposit error:", err);
      setError(err.response?.data?.error || err.message || "Deposit failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-white mb-6">💰 Deposit Funds</h1>
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
        <DepositForm onDeposit={handleDeposit} />
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 text-sm text-gray-300 underline hover:text-gray-200"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Deposit;
