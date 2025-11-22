import { useFinancialStore } from "../store/financialStore";

// Individual hooks for specific data
export const useFinancialSummary = () => {
  const summary = useFinancialStore((state) => state.summary);
  const isLoading = useFinancialStore((state) => state.isLoading.summary);
  const error = useFinancialStore((state) => state.errors.summary);
  const fetchSummary = useFinancialStore((state) => state.fetchSummary);
  const refetchSummary = useFinancialStore((state) => state.refetchSummary);

  return { summary, isLoading, error, fetchSummary, refetchSummary };
};

export const useFinancialWorkingCapital = () => {
  const workingCapital = useFinancialStore((state) => state.workingCapital);
  const isLoading = useFinancialStore(
    (state) => state.isLoading.workingCapital
  );
  const error = useFinancialStore((state) => state.errors.workingCapital);
  const fetchWorkingCapital = useFinancialStore(
    (state) => state.fetchWorkingCapital
  );
  const refetchWorkingCapital = useFinancialStore(
    (state) => state.refetchWorkingCapital
  );
  return {
    workingCapital,
    isLoading,
    error,
    fetchWorkingCapital,
    refetchWorkingCapital,
  };
};

export const useFinancialWallet = () => {
  const wallet = useFinancialStore((state) => state.wallet);
  const isLoading = useFinancialStore((state) => state.isLoading.wallet);
  const error = useFinancialStore((state) => state.errors.wallet);
  const fetchWallet = useFinancialStore((state) => state.fetchWallet);
  const refetchWallet = useFinancialStore((state) => state.refetchWallet);
  return { wallet, isLoading, error, fetchWallet, refetchWallet };
};

export const useFinancialRecentTransactions = () => {
  const recentTransactions = useFinancialStore(
    (state) => state.recentTransactions
  );
  const isLoading = useFinancialStore(
    (state) => state.isLoading.recentTransactions
  );
  const error = useFinancialStore((state) => state.errors.recentTransactions);
  const fetchRecentTransactions = useFinancialStore(
    (state) => state.fetchRecentTransactions
  );
  const refetchRecentTransactions = useFinancialStore(
    (state) => state.refetchRecentTransactions
  );
  return {
    recentTransactions,
    isLoading,
    error,
    fetchRecentTransactions,
    refetchRecentTransactions,
  };
};

export const useFinancialScheduledTransfers = () => {
  const scheduledTransfers = useFinancialStore(
    (state) => state.scheduledTransfers
  );
  const isLoading = useFinancialStore(
    (state) => state.isLoading.scheduledTransfers
  );
  const error = useFinancialStore((state) => state.errors.scheduledTransfers);
  const fetchScheduledTransfers = useFinancialStore(
    (state) => state.fetchScheduledTransfers
  );
  const refetchScheduledTransfers = useFinancialStore(
    (state) => state.refetchScheduledTransfers
  );
  return {
    scheduledTransfers,
    isLoading,
    error,
    fetchScheduledTransfers,
    refetchScheduledTransfers,
  };
};
