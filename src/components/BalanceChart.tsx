import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { Transaction } from "../types/transaction";

interface Props {
  transactions: Transaction[];
}

const BalanceChart: React.FC<Props> = ({ transactions }) => {
  // Map transactions to cumulative balance over time
  const chartData = transactions
    .slice() // make a copy
    .reverse() // oldest first
    .reduce<{ date: string; balance: number }[]>((acc, tx) => {
      const lastBalance = acc.length ? acc[acc.length - 1].balance : 0;
      const newBalance =
        tx.type === "deposit"
          ? lastBalance + tx.amount
          : tx.type === "withdraw"
            ? lastBalance - tx.amount
            : lastBalance;
      acc.push({
        date: new Date(tx.created_at).toLocaleDateString(),
        balance: newBalance,
      });
      return acc;
    }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Balance Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;
