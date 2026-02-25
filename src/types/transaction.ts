export interface Transaction {
  id: number;
  type: "deposit" | "withdraw" | "transfer";
  amount: number;
  created_at: string;
}
