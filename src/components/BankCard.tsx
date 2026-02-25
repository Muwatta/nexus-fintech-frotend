import React from "react";

interface Props {
  holder: string;
  number: string;
  expiry: string;
}

const BankCard: React.FC<Props> = ({ holder, number, expiry }) => {
  return (
    <div className="w-full h-56 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-8 shadow-2xl border border-blue-500 hover:shadow-3xl transition transform hover:scale-105">
      <div className="flex justify-between items-start mb-12">
        <div>
          <div className="text-sm font-semibold opacity-75">NEXUS BANK</div>
          <div className="text-xl font-bold mt-1">💳</div>
        </div>
        <div className="text-2xl opacity-50">💰</div>
      </div>

      <div className="text-2xl tracking-widest font-mono mb-8 break-all">
        {number}
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs opacity-75">CARDHOLDER</p>
          <p className="text-lg font-semibold">{holder}</p>
        </div>
        <div>
          <p className="text-xs opacity-75">EXPIRES</p>
          <p className="text-lg font-semibold">{expiry}</p>
        </div>
      </div>
    </div>
  );
};

export default BankCard;
