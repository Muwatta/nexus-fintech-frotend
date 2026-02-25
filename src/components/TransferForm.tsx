import React, { useState } from "react";
import api from "../api/api";

interface Props {
  onSuccess: () => void;
}

const TransferForm: React.FC<Props> = ({ onSuccess }) => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/tx/transfer/", { to, amount: parseFloat(amount) });
    setAmount("");
    setTo("");
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Recipient username"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border p-2 rounded w-full"
      />
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
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Transfer
      </button>
    </form>
  );
};

export default TransferForm;
