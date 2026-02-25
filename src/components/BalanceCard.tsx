import React from "react";

const BalanceCard: React.FC<{ balance: number }> = ({ balance }) => {
  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <h2 className="text-lg text-gray-500">Current Balance</h2>
      <p className="text-3xl font-bold mt-2">₦{balance}</p>
    </div>
  );
};

export default BalanceCard;
