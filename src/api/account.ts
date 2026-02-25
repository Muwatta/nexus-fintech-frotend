import api from "./api";
import { Account } from "../types/account";

export const fetchAccount = async (): Promise<Account> => {
  const res = await api.get("/accounts/me/");
  return res.data;
};
