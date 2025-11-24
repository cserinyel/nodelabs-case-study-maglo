import type { FinancialTransactionStatusType } from "../../../../../types/financial";

export type RecentTransactionsTableData = {
  id: string;
  name: string;
  business: string;
  image: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
  status: FinancialTransactionStatusType;
};
