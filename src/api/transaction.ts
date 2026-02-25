import api from "./api";

export const deposit = async (amount: number) => {
  await api.post("/transactions/deposit/", { amount });
};

export const withdraw = async (amount: number) => {
  await api.post("/transactions/withdraw/", { amount });
};

export const transfer = async (recipient: string, amount: number) => {
  await api.post("/transactions/transfer/", {
    recipient,
    amount,
  });
};
