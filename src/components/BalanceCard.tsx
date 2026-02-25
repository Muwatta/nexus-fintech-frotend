import React from "react";

const BalanceCard: React.FC<{ balance: number }> = ({ balance }) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg p-8 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-blue-100 text-sm font-medium">Available Balance</p>
          <p className="text-4xl font-bold mt-3">₦{balance.toLocaleString()}</p>
        </div>
        <div className="text-5xl opacity-20">💳</div>
      </div>
      <div className="mt-6 pt-4 border-t border-blue-400 flex justify-between text-sm">
        <span className="text-blue-100">Total Assets</span>
        <span className="font-semibold">₦{balance.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default BalanceCard;
