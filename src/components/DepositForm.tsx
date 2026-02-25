import React, { useState } from "react";

const DepositForm: React.FC<{ onDeposit: (amount: number) => void }> = ({
  onDeposit,
}) => {
  const [amount, setAmount] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    onDeposit(Number(amount));
    setAmount("");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white border-l-4 border-green-500 rounded-lg shadow-md p-6 hover:shadow-lg transition"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📥</span>
        <h3 className="font-bold text-lg text-gray-800">Deposit</h3>
      </div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border-2 border-gray-200 focus:border-green-500 p-3 rounded-lg w-full mb-4 focus:outline-none transition"
        placeholder="Enter amount"
        min="0"
      />
      <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg w-full font-semibold hover:from-green-600 hover:to-green-700 transition transform hover:scale-105">
        💰 Deposit Now
      </button>
    </form>
  );
};

export default DepositForm;
