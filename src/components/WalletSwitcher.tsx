import React from "react";
import type { Wallet } from "../types/wallet";

interface Props {
  wallets: Wallet[];
  current: number;
  onChange: (id: number) => void;
}

const WalletSwitcher: React.FC<Props> = ({ wallets, current, onChange }) => {
  return (
    <div className="bg-white p-3 rounded shadow flex gap-2">
      {wallets.map((w) => (
        <button
          key={w.id}
          onClick={() => onChange(w.id)}
          className={`px-3 py-1 rounded border ${
            current === w.id ? "bg-blue-600 text-white" : ""
          }`}
        >
          {w.name} ₦{w.balance}
        </button>
      ))}
    </div>
  );
};

export default WalletSwitcher;
