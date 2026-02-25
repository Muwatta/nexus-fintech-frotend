import React, { useEffect, useState } from "react";
import BalanceCard from "../components/BalanceCard";
import DepositForm from "../components/DepositForm";
import WithdrawForm from "../components/WithdrawForm";
import TransferForm from "../components/TransferForm";
import api from "../api/api";
import Navbar from "../components/Navbar";

const Dashboard: React.FC = () => {
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    const res = await api.get("/accounts/balance/");
    setBalance(res.data.balance);
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    api.defaults.headers.common["Authorization"] = "";
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} />
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <BalanceCard balance={balance} />
        <DepositForm onSuccess={fetchBalance} />
        <WithdrawForm onSuccess={fetchBalance} />
        <TransferForm onSuccess={fetchBalance} />
      </div>
    </div>
  );
};

export default Dashboard;
