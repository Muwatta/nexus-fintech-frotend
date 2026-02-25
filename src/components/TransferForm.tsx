import React, { useState } from "react";

const TransferForm: React.FC<{
  onTransfer: (recipient: string, amount: number) => void;
}> = ({ onTransfer }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onTransfer(recipient, Number(amount));
    setRecipient("");
    setAmount("");
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Transfer</h3>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="border p-2 rounded w-full mb-3"
        placeholder="Recipient username"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full mb-3"
        placeholder="Amount"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Transfer
      </button>
    </form>
  );
};

export default TransferForm;
