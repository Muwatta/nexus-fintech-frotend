export interface User {
  username: string;
  password: string;
}

export interface Account {
  id: number;
  balance: number;
}

export interface Transaction {
  id: number;
  type: "deposit" | "withdraw" | "transfer";
  amount: number;
  created_at: string;
  from_account?: Account;
  to_account?: Account;
}
