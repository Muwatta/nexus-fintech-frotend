import React from "react";
import type { Transaction } from "../types/transaction";

interface Props {
  data: Transaction[];
  page: number;
  total: number;
  onPageChange: (p: number) => void;
}

const TransactionTable: React.FC<Props> = ({
  data,
  page,
  total,
  onPageChange,
}) => {
  const pages = Math.ceil(total / 10);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return "📥";
      case "withdraw":
        return "📤";
      case "transfer":
        return "🔄";
      default:
        return "💳";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "success"
      ? "text-green-600 bg-green-50"
      : "text-red-600 bg-red-50";
  };

  return (
    <div>
      {data.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No transactions yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Type
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Amount
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Date & Time
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-gray-100 hover:bg-blue-50 transition"
                >
                  <td className="py-4 px-4 font-medium text-gray-800">
                    <span className="text-xl mr-2">{getTypeIcon(tx.type)}</span>
                    <span className="capitalize">{tx.type}</span>
                  </td>
                  <td className="py-4 px-4 font-bold text-lg text-gray-800">
                    ₦{tx.amount.toLocaleString()}
                  </td>
                  <td
                    className={`py-4 px-4 font-semibold ${getStatusColor(tx.status)} px-3 py-1 rounded-full inline-block`}
                  >
                    {tx.status === "success" ? "✅ Success" : "❌ Failed"}
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-sm">
                    {new Date(tx.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Showing {data.length > 0 ? (page - 1) * 10 + 1 : 0} to{" "}
          {Math.min(page * 10, total)} of {total} transactions
        </div>

        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            ← Prev
          </button>

          <div className="px-4 py-2 flex items-center font-semibold text-gray-800">
            Page {page} of {pages}
          </div>

          <button
            disabled={page >= pages}
            onClick={() => onPageChange(page + 1)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
