import { create } from "zustand";
import toast from "react-hot-toast";
import type {
  FinancialSummary,
  FinancialWorkingCapital,
  FinancialWallet,
  FinancialRecentTransactions,
  FinancialScheduledTransfers,
} from "../types/financial";
import {
  getFinancialSummary,
  getFinancialWorkingCapital,
  getFinancialWallet,
  getFinancialRecentTransactions,
  getFinancialScheduledTransfers,
} from "../api/financial";

interface FinancialState {
  // Data
  summary: FinancialSummary | null;
  workingCapital: FinancialWorkingCapital | null;
  wallet: FinancialWallet | null;
  recentTransactions: FinancialRecentTransactions | null;
  scheduledTransfers: FinancialScheduledTransfers | null;

  // Loading states
  isLoading: {
    summary: boolean;
    workingCapital: boolean;
    wallet: boolean;
    recentTransactions: boolean;
    scheduledTransfers: boolean;
  };

  // Error states
  errors: {
    summary: Error | null;
    workingCapital: Error | null;
    wallet: Error | null;
    recentTransactions: Error | null;
    scheduledTransfers: Error | null;
  };

  // Fetch Actions
  fetchSummary: () => Promise<void>;
  fetchWorkingCapital: () => Promise<void>;
  fetchWallet: () => Promise<void>;
  fetchRecentTransactions: () => Promise<void>;
  fetchScheduledTransfers: () => Promise<void>;
  fetchAll: () => Promise<void>;

  // Refetch actions
  refetchSummary: () => Promise<void>;
  refetchWorkingCapital: () => Promise<void>;
  refetchWallet: () => Promise<void>;
  refetchRecentTransactions: () => Promise<void>;
  refetchScheduledTransfers: () => Promise<void>;
  refetchAll: () => Promise<void>;

  // Reset actions
  resetSummary: () => void;
  resetWorkingCapital: () => void;
  resetWallet: () => void;
  resetRecentTransactions: () => void;
  resetScheduledTransfers: () => void;
  resetAll: () => void;
}

export const useFinancialStore = create<FinancialState>((set, get) => ({
  // Initial state
  summary: null,
  workingCapital: null,
  wallet: null,
  recentTransactions: null,
  scheduledTransfers: null,

  isLoading: {
    summary: false,
    workingCapital: false,
    wallet: false,
    recentTransactions: false,
    scheduledTransfers: false,
  },

  errors: {
    summary: null,
    workingCapital: null,
    wallet: null,
    recentTransactions: null,
    scheduledTransfers: null,
  },

  // Fetch actions
  fetchSummary: async () => {
    set((state) => ({
      isLoading: { ...state.isLoading, summary: true },
      errors: { ...state.errors, summary: null },
    }));

    try {
      const response = await getFinancialSummary();
      set((state) => ({
        summary: response.data,
        isLoading: { ...state.isLoading, summary: false },
      }));
    } catch (error) {
      set((state) => ({
        isLoading: { ...state.isLoading, summary: false },
        errors: { ...state.errors, summary: error as Error },
      }));
      throw error;
    }
  },

  fetchWorkingCapital: async () => {
    set((state) => ({
      isLoading: { ...state.isLoading, workingCapital: true },
      errors: { ...state.errors, workingCapital: null },
    }));

    try {
      const response = await getFinancialWorkingCapital();
      set((state) => ({
        workingCapital: response.data,
        isLoading: { ...state.isLoading, workingCapital: false },
      }));
    } catch (error) {
      set((state) => ({
        isLoading: { ...state.isLoading, workingCapital: false },
        errors: { ...state.errors, workingCapital: error as Error },
      }));
      throw error;
    }
  },

  fetchWallet: async () => {
    set((state) => ({
      isLoading: { ...state.isLoading, wallet: true },
      errors: { ...state.errors, wallet: null },
    }));

    try {
      const response = await getFinancialWallet();
      set((state) => ({
        wallet: response.data,
        isLoading: { ...state.isLoading, wallet: false },
      }));
    } catch (error) {
      set((state) => ({
        isLoading: { ...state.isLoading, wallet: false },
        errors: { ...state.errors, wallet: error as Error },
      }));
      throw error;
    }
  },

  fetchRecentTransactions: async () => {
    set((state) => ({
      isLoading: { ...state.isLoading, recentTransactions: true },
      errors: { ...state.errors, recentTransactions: null },
    }));

    try {
      const response = await getFinancialRecentTransactions();
      set((state) => ({
        recentTransactions: response.data,
        isLoading: { ...state.isLoading, recentTransactions: false },
      }));
    } catch (error) {
      set((state) => ({
        isLoading: { ...state.isLoading, recentTransactions: false },
        errors: { ...state.errors, recentTransactions: error as Error },
      }));
      throw error;
    }
  },

  fetchScheduledTransfers: async () => {
    set((state) => ({
      isLoading: { ...state.isLoading, scheduledTransfers: true },
      errors: { ...state.errors, scheduledTransfers: null },
    }));

    try {
      const response = await getFinancialScheduledTransfers();
      set((state) => ({
        scheduledTransfers: response.data,
        isLoading: { ...state.isLoading, scheduledTransfers: false },
      }));
    } catch (error) {
      set((state) => ({
        isLoading: { ...state.isLoading, scheduledTransfers: false },
        errors: { ...state.errors, scheduledTransfers: error as Error },
      }));
      throw error;
    }
  },

  fetchAll: async () => {
    const {
      fetchSummary,
      fetchWorkingCapital,
      fetchWallet,
      fetchRecentTransactions,
      fetchScheduledTransfers,
    } = get();
    // Fetch all in parallel
    const results = await Promise.allSettled([
      fetchSummary(),
      fetchWorkingCapital(),
      fetchWallet(),
      fetchRecentTransactions(),
      fetchScheduledTransfers(),
    ]);
    if (results.some((result) => result.status === "rejected")) {
      throw new Error("Failed to fetch all financial data");
    }
  },

  // Refetch actions
  refetchSummary: async () => {
    set((state) => ({
      isLoading: { ...state.isLoading, summary: true },
      errors: { ...state.errors, summary: null },
    }));

    await toast.promise(
      (async () => {
        try {
          const response = await getFinancialSummary();
          set((state) => ({
            summary: response.data,
            isLoading: { ...state.isLoading, summary: false },
          }));
        } catch (error) {
          set((state) => ({
            isLoading: { ...state.isLoading, summary: false },
            errors: { ...state.errors, summary: error as Error },
          }));
          throw error;
        }
      })(),
      {
        loading: "Refetching summary...",
        success: "Summary refetched successfully!",
        error: (err: Error) =>
          err?.message || "Failed to refetch summary. Please try again.",
      }
    );
  },

  refetchWorkingCapital: async () => {
    set((state) => ({
      isLoading: { ...state.isLoading, workingCapital: true },
      errors: { ...state.errors, workingCapital: null },
    }));

    await toast.promise(
      (async () => {
        try {
          const response = await getFinancialWorkingCapital();
          set((state) => ({
            workingCapital: response.data,
            isLoading: { ...state.isLoading, workingCapital: false },
          }));
        } catch (error) {
          set((state) => ({
            isLoading: { ...state.isLoading, workingCapital: false },
            errors: { ...state.errors, workingCapital: error as Error },
          }));
          throw error;
        }
      })(),
      {
        loading: "Refetching working capital...",
        success: "Working capital refetched successfully!",
        error: (err: Error) =>
          err?.message ||
          "Failed to refetch working capital. Please try again.",
      }
    );
  },

  refetchWallet: async () => {
    set((state) => ({
      isLoading: { ...state.isLoading, wallet: true },
      errors: { ...state.errors, wallet: null },
    }));

    await toast.promise(
      (async () => {
        try {
          const response = await getFinancialWallet();
          set((state) => ({
            wallet: response.data,
            isLoading: { ...state.isLoading, wallet: false },
          }));
        } catch (error) {
          set((state) => ({
            isLoading: { ...state.isLoading, wallet: false },
            errors: { ...state.errors, wallet: error as Error },
          }));
          throw error;
        }
      })(),
      {
        loading: "Refetching wallet...",
        success: "Wallet refetched successfully!",
        error: (err: Error) =>
          err?.message || "Failed to refetch wallet. Please try again.",
      }
    );
  },

  refetchRecentTransactions: async () => {
    set((state) => ({
      isLoading: { ...state.isLoading, recentTransactions: true },
      errors: { ...state.errors, recentTransactions: null },
    }));

    await toast.promise(
      (async () => {
        try {
          const response = await getFinancialRecentTransactions();
          set((state) => ({
            recentTransactions: response.data,
            isLoading: { ...state.isLoading, recentTransactions: false },
          }));
        } catch (error) {
          set((state) => ({
            isLoading: { ...state.isLoading, recentTransactions: false },
            errors: { ...state.errors, recentTransactions: error as Error },
          }));
          throw error;
        }
      })(),
      {
        loading: "Refetching recent transactions...",
        success: "Recent transactions refetched successfully!",
        error: (err: Error) =>
          err?.message ||
          "Failed to refetch recent transactions. Please try again.",
      }
    );
  },

  refetchScheduledTransfers: async () => {
    set((state) => ({
      isLoading: { ...state.isLoading, scheduledTransfers: true },
      errors: { ...state.errors, scheduledTransfers: null },
    }));

    await toast.promise(
      (async () => {
        try {
          const response = await getFinancialScheduledTransfers();
          set((state) => ({
            scheduledTransfers: response.data,
            isLoading: { ...state.isLoading, scheduledTransfers: false },
          }));
        } catch (error) {
          set((state) => ({
            isLoading: { ...state.isLoading, scheduledTransfers: false },
            errors: { ...state.errors, scheduledTransfers: error as Error },
          }));
          throw error;
        }
      })(),
      {
        loading: "Refetching scheduled transfers...",
        success: "Scheduled transfers refetched successfully!",
        error: (err: Error) =>
          err?.message ||
          "Failed to refetch scheduled transfers. Please try again.",
      }
    );
  },

  refetchAll: async () => {
    const {
      refetchSummary,
      refetchWorkingCapital,
      refetchWallet,
      refetchRecentTransactions,
      refetchScheduledTransfers,
    } = get();

    // Refetch all in parallel
    await Promise.allSettled([
      refetchSummary(),
      refetchWorkingCapital(),
      refetchWallet(),
      refetchRecentTransactions(),
      refetchScheduledTransfers(),
    ]);
  },

  // Reset actions
  resetSummary: () =>
    set({ summary: null, errors: { ...get().errors, summary: null } }),
  resetWorkingCapital: () =>
    set({
      workingCapital: null,
      errors: { ...get().errors, workingCapital: null },
    }),
  resetWallet: () =>
    set({ wallet: null, errors: { ...get().errors, wallet: null } }),
  resetRecentTransactions: () =>
    set({
      recentTransactions: null,
      errors: { ...get().errors, recentTransactions: null },
    }),
  resetScheduledTransfers: () =>
    set({
      scheduledTransfers: null,
      errors: { ...get().errors, scheduledTransfers: null },
    }),

  resetAll: () =>
    set({
      summary: null,
      workingCapital: null,
      wallet: null,
      recentTransactions: null,
      scheduledTransfers: null,
      errors: {
        summary: null,
        workingCapital: null,
        wallet: null,
        recentTransactions: null,
        scheduledTransfers: null,
      },
    }),
}));
