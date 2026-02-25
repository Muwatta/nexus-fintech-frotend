import React, { useState } from "react";
import api from "../api/api";

interface Props {
  onSuccess: () => void;
}

const DepositForm: React.FC<Props> = ({ onSuccess }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/accounts/deposit/", { amount: parseFloat(amount) });
    setAmount("");
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Deposit
      </button>
    </form>
  );
};

export default DepositForm;
