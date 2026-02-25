import React, { useState } from "react";

const DepositForm: React.FC<{ onDeposit: (amount: number) => void }> = ({
  onDeposit,
}) => {
  const [amount, setAmount] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onDeposit(Number(amount));
    setAmount("");
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Deposit</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full mb-3"
        placeholder="Amount"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Deposit
      </button>
    </form>
  );
};

export default DepositForm;
