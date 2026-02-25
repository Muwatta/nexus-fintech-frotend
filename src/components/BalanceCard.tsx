import React from "react";

interface Props {
  balance: number;
}

const BalanceCard: React.FC<Props> = ({ balance }) => {
  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <h2 className="text-xl font-semibold mb-2">Current Balance</h2>
      <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
    </div>
  );
};

export default BalanceCard;
