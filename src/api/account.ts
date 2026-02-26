import api from "./api";

// Fetch logged-in user's account info
export const fetchAccount = async () => {
  const res = await api.get("/accounts/dashboard/");
  return res.data;
};

export const deposit = async (amount: number) => {
  const res = await api.post("/accounts/deposit/", { amount });
  return res.data;
};

// Withdraw from account
export const withdraw = async (amount: number) => {
  const res = await api.post("/accounts/withdraw/", { amount });
  return res.data;
};
