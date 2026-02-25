import React, { useEffect, useState } from "react";
import { fetchAccount } from "../api/account";
import { deposit, withdraw, transfer } from "../api/transaction";
import BalanceCard from "../components/BalanceCard";
import DepositForm from "../components/DepositForm";
import WithdrawForm from "../components/WithdrawForm";
import TransferForm from "../components/TransferForm";
import Navbar from "../components/Navbar";

interface Account {
  id: number;
  username: string;
  balance: number;
}

const Dashboard: React.FC = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAccount = async () => {
    try {
      const data = await fetchAccount();
      setAccount(data);
    } catch (err) {
      console.error("Failed to load account", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccount();
  }, []);

  const handleDeposit = async (amount: number) => {
    await deposit(amount);
    await loadAccount();
  };

  const handleWithdraw = async (amount: number) => {
    await withdraw(amount);
    await loadAccount();
  };

  const handleTransfer = async (recipient: string, amount: number) => {
    await transfer(recipient, amount);
    await loadAccount();
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!account) return <div className="p-6">Account not found</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar username={account.username} />

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <BalanceCard balance={account.balance} />

        <div className="grid md:grid-cols-3 gap-6">
          <DepositForm onDeposit={handleDeposit} />
          <WithdrawForm onWithdraw={handleWithdraw} />
          <TransferForm onTransfer={handleTransfer} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
