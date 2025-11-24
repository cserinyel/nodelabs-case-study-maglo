import { createColumnHelper } from "@tanstack/react-table";
import type { FinancialTransaction } from "../../../../../types/financial";

export const columnHelper = createColumnHelper<FinancialTransaction>();

export const recentTransactionsTableItemPicker = (
  data: FinancialTransaction[],
  amount: number = 5
) => {
  const sortedData = data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return sortedData.slice(0, amount);
};
