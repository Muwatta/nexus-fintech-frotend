import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { date: string; balance: number }[];
}

const FinanceChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Balance Trend</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
