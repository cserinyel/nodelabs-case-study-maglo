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

// Data type keys for type safety
type DataKey =
  | "summary"
  | "workingCapital"
  | "wallet"
  | "recentTransactions"
  | "scheduledTransfers";

// Map of data types to their respective types
interface DataTypeMap {
  summary: FinancialSummary;
  workingCapital: FinancialWorkingCapital;
  wallet: FinancialWallet;
  recentTransactions: FinancialRecentTransactions;
  scheduledTransfers: FinancialScheduledTransfers;
}

// API functions map
const apiFunctions = {
  summary: getFinancialSummary,
  workingCapital: getFinancialWorkingCapital,
  wallet: getFinancialWallet,
  recentTransactions: getFinancialRecentTransactions,
  scheduledTransfers: getFinancialScheduledTransfers,
} as const;

// Display names for toast messages
const displayNames: Record<DataKey, string> = {
  summary: "Summary",
  workingCapital: "Working Capital",
  wallet: "Wallet",
  recentTransactions: "Recent Transactions",
  scheduledTransfers: "Scheduled Transfers",
};

interface FinancialState {
  // Data
  summary: FinancialSummary | null;
  workingCapital: FinancialWorkingCapital | null;
  wallet: FinancialWallet | null;
  recentTransactions: FinancialRecentTransactions | null;
  scheduledTransfers: FinancialScheduledTransfers | null;

  // Loading states
  isLoading: Record<DataKey, boolean>;

  // Error states
  errors: Record<DataKey, Error | null>;

  // Generic fetch action
  fetch: <K extends DataKey>(key: K) => Promise<void>;

  // Generic refetch action (with toast)
  refetch: <K extends DataKey>(key: K) => Promise<void>;

  // Fetch all data
  fetchAll: () => Promise<void>;

  // Refetch all data
  refetchAll: () => Promise<void>;

  // Reset specific data
  reset: <K extends DataKey>(key: K) => void;

  // Reset all data
  resetAll: () => void;
}

const initialLoadingState: Record<DataKey, boolean> = {
  summary: false,
  workingCapital: false,
  wallet: false,
  recentTransactions: false,
  scheduledTransfers: false,
};

const initialErrorState: Record<DataKey, Error | null> = {
  summary: null,
  workingCapital: null,
  wallet: null,
  recentTransactions: null,
  scheduledTransfers: null,
};

export const useFinancialStore = create<FinancialState>((set, get) => ({
  // Initial state
  summary: null,
  workingCapital: null,
  wallet: null,
  recentTransactions: null,
  scheduledTransfers: null,

  isLoading: { ...initialLoadingState },
  errors: { ...initialErrorState },

  // Generic fetch action
  fetch: async <K extends DataKey>(key: K) => {
    set((state) => ({
      isLoading: { ...state.isLoading, [key]: true },
      errors: { ...state.errors, [key]: null },
    }));

    try {
      const response = await apiFunctions[key]();
      set((state) => ({
        [key]: response.data as DataTypeMap[K],
        isLoading: { ...state.isLoading, [key]: false },
      }));
    } catch (error) {
      set((state) => ({
        isLoading: { ...state.isLoading, [key]: false },
        errors: { ...state.errors, [key]: error as Error },
      }));
      throw error;
    }
  },

  // Generic refetch action with toast
  refetch: async <K extends DataKey>(key: K) => {
    const displayName = displayNames[key];

    set((state) => ({
      isLoading: { ...state.isLoading, [key]: true },
      errors: { ...state.errors, [key]: null },
    }));

    await toast.promise(
      (async () => {
        try {
          const response = await apiFunctions[key]();
          set((state) => ({
            [key]: response.data as DataTypeMap[K],
            isLoading: { ...state.isLoading, [key]: false },
          }));
        } catch (error) {
          set((state) => ({
            isLoading: { ...state.isLoading, [key]: false },
            errors: { ...state.errors, [key]: error as Error },
          }));
          throw error;
        }
      })(),
      {
        loading: `Refetching ${displayName}...`,
        success: `${displayName} refetched successfully!`,
        error: (err: Error) =>
          err?.message || `Failed to refetch ${displayName}. Please try again.`,
      }
    );
  },

  // Fetch all data
  fetchAll: async () => {
    const { fetch } = get();
    const keys: DataKey[] = [
      "summary",
      "workingCapital",
      "wallet",
      "recentTransactions",
      "scheduledTransfers",
    ];

    await toast.promise(
      (async () => {
        const results = await Promise.allSettled(keys.map((key) => fetch(key)));
        if (results.some((result) => result.status === "rejected")) {
          throw new Error("Failed to fetch all financial data");
        }
      })(),
      {
        loading: "Fetching all financial data...",
        success: "All financial data fetched successfully!",
        error: (err) => err?.message || "Error fetching all financial data",
      }
    );
  },

  // Refetch all data
  refetchAll: async () => {
    const { refetch } = get();
    const keys: DataKey[] = [
      "summary",
      "workingCapital",
      "wallet",
      "recentTransactions",
      "scheduledTransfers",
    ];

    await Promise.allSettled(keys.map((key) => refetch(key)));
  },

  // Reset specific data
  reset: <K extends DataKey>(key: K) => {
    set((state) => ({
      [key]: null,
      errors: { ...state.errors, [key]: null },
    }));
  },

  // Reset all data
  resetAll: () => {
    set({
      summary: null,
      workingCapital: null,
      wallet: null,
      recentTransactions: null,
      scheduledTransfers: null,
      errors: { ...initialErrorState },
    });
  },
}));
