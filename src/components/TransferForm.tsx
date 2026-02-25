import React, { useState } from "react";

const TransferForm: React.FC<{
  onTransfer: (recipient: string, amount: number) => void;
}> = ({ onTransfer }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount || Number(amount) <= 0) return;
    onTransfer(recipient, Number(amount));
    setRecipient("");
    setAmount("");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white border-l-4 border-purple-500 rounded-lg shadow-md p-6 hover:shadow-lg transition"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🔄</span>
        <h3 className="font-bold text-lg text-gray-800">Transfer</h3>
      </div>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="border-2 border-gray-200 focus:border-purple-500 p-3 rounded-lg w-full mb-3 focus:outline-none transition"
        placeholder="Recipient username"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border-2 border-gray-200 focus:border-purple-500 p-3 rounded-lg w-full mb-4 focus:outline-none transition"
        placeholder="Enter amount"
        min="0"
        required
      />
      <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-lg w-full font-semibold hover:from-purple-600 hover:to-purple-700 transition transform hover:scale-105">
        💌 Send Transfer
      </button>
    </form>
  );
};

export default TransferForm;
