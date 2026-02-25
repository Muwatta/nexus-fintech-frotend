import api from "./api";
import type { Transaction } from "../types/transaction";

export const getTransactions = async (
  page: number,
): Promise<{ results: Transaction[]; count: number }> => {
  const res = await api.get(`/transactions/history/?page=${page}`);
  return res.data;
};

export const deposit = async (amount: number): Promise<{ balance: number }> => {
  const res = await api.post("/accounts/deposit/", { amount });
  return res.data;
};

export const withdraw = async (
  amount: number,
): Promise<{ balance: number }> => {
  const res = await api.post("/accounts/withdraw/", { amount });
  return res.data;
};

export const transfer = async (
  recipient: string,
  amount: number,
): Promise<{ balance: number }> => {
  const res = await api.post("/transactions/transfer/", { recipient, amount });
  return res.data;
};
