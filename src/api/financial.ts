import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type {
  FinancialSummaryResponse,
  FinancialWorkingCapitalResponse,
  FinancialWalletResponse,
  FinancialRecentTransactionsResponse,
  FinancialScheduledTransfersResponse,
} from "../types/financial";
import apiClient from "./client";

const PATHS = {
  SUMMARY: "/financial/summary",
  WORKING_CAPITAL: "/financial/working-capital",
  WALLET: "/financial/wallet",
  RECENT_TRANSACTIONS: "/financial/transactions/recent",
  SCHEDULED_TRANSFERS: "/financial/transfers/scheduled",
};

export const getFinancialSummary =
  async (): Promise<FinancialSummaryResponse> => {
    const response = await apiClient.get<FinancialSummaryResponse>(
      PATHS.SUMMARY
    );
    return response.data;
  };

export const getFinancialWorkingCapital =
  async (): Promise<FinancialWorkingCapitalResponse> => {
    const response = await apiClient.get<FinancialWorkingCapitalResponse>(
      PATHS.WORKING_CAPITAL
    );
    return response.data;
  };

export const getFinancialWallet =
  async (): Promise<FinancialWalletResponse> => {
    const response = await apiClient.get<FinancialWalletResponse>(PATHS.WALLET);
    return response.data;
  };

export const getFinancialRecentTransactions =
  async (): Promise<FinancialRecentTransactionsResponse> => {
    const response = await apiClient.get<FinancialRecentTransactionsResponse>(
      PATHS.RECENT_TRANSACTIONS
    );
    return response.data;
  };

export const getFinancialScheduledTransfers =
  async (): Promise<FinancialScheduledTransfersResponse> => {
    const response = await apiClient.get<FinancialScheduledTransfersResponse>(
      PATHS.SCHEDULED_TRANSFERS
    );
    return response.data;
  };

// React Query hooks
type FinancialQueryType =
  | "summary"
  | "working-capital"
  | "wallet"
  | "recent-transactions"
  | "scheduled-transfers";

type FinancialResponseMap = {
  summary: FinancialSummaryResponse;
  "working-capital": FinancialWorkingCapitalResponse;
  wallet: FinancialWalletResponse;
  "recent-transactions": FinancialRecentTransactionsResponse;
  "scheduled-transfers": FinancialScheduledTransfersResponse;
};

const financialQueryMap = {
  summary: {
    queryKey: ["financial-summary"],
    queryFn: getFinancialSummary,
  },
  "working-capital": {
    queryKey: ["financial-working-capital"],
    queryFn: getFinancialWorkingCapital,
  },
  wallet: {
    queryKey: ["financial-wallet"],
    queryFn: getFinancialWallet,
  },
  "recent-transactions": {
    queryKey: ["financial-recent-transactions"],
    queryFn: getFinancialRecentTransactions,
  },
  "scheduled-transfers": {
    queryKey: ["financial-scheduled-transfers"],
    queryFn: getFinancialScheduledTransfers,
  },
} as const;

export const useFinancial = <T extends FinancialQueryType>(
  type: T,
  options?: Omit<
    UseQueryOptions<FinancialResponseMap[T], Error>,
    "queryKey" | "queryFn"
  >
) => {
  const { queryKey, queryFn } = financialQueryMap[type];
  return useQuery({
    queryKey,
    queryFn: queryFn as () => Promise<FinancialResponseMap[T]>,
    ...options,
  });
};

export const useAllFinancialData = () => {
  const summary = useFinancial("summary");
  const workingCapital = useFinancial("working-capital");
  const wallet = useFinancial("wallet");
  const recentTransactions = useFinancial("recent-transactions");
  const scheduledTransfers = useFinancial("scheduled-transfers");

  return {
    summary,
    workingCapital,
    wallet,
    recentTransactions,
    scheduledTransfers,
    isLoading:
      summary.isLoading ||
      workingCapital.isLoading ||
      wallet.isLoading ||
      recentTransactions.isLoading ||
      scheduledTransfers.isLoading,
    isError:
      summary.isError ||
      workingCapital.isError ||
      wallet.isError ||
      recentTransactions.isError ||
      scheduledTransfers.isError,
  };
};
