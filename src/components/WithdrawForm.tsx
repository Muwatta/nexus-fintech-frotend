import React, { useState } from "react";

const WithdrawForm: React.FC<{ onWithdraw: (amount: number) => void }> = ({
  onWithdraw,
}) => {
  const [amount, setAmount] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    onWithdraw(Number(amount));
    setAmount("");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white border-l-4 border-red-500 rounded-lg shadow-md p-6 hover:shadow-lg transition"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📤</span>
        <h3 className="font-bold text-lg text-gray-800">Withdraw</h3>
      </div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border-2 border-gray-200 focus:border-red-500 p-3 rounded-lg w-full mb-4 focus:outline-none transition"
        placeholder="Enter amount"
        min="0"
      />
      <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg w-full font-semibold hover:from-red-600 hover:to-red-700 transition transform hover:scale-105">
        💸 Withdraw Now
      </button>
    </form>
  );
};

export default WithdrawForm;
