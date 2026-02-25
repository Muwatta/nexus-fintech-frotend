import api from "./api";
import type { Account } from "../types/account";

export const fetchAccount = async (): Promise<Account> => {
  const res = await api.get("/accounts/me/");
  return res.data;
};
