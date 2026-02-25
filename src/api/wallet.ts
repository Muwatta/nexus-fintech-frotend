import api from "./api";
import type { Wallet } from "../types/wallet";

export const getWallets = async (): Promise<Wallet[]> => {
  const res = await api.get("/wallets/");
  return res.data;
};

export const selectWallet = (id: number) => {
  localStorage.setItem("wallet_id", id.toString());
};
