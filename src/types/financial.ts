import type {
  FinancialTransactionStatus,
  FinancialTransferStatus,
  FinancialTrend,
  FinancialWalletCardNetwork,
  FinancialWalletCardType,
} from "../utils/constants";
/**
 * Financial Summary Types
 */
export type FinancialTrendType =
  (typeof FinancialTrend)[keyof typeof FinancialTrend];

export type FinancialBalance = {
  amount: number;
  currency: string;
  change: {
    percentage: number;
    trend: FinancialTrendType;
  };
};

export type FinancialSummary = {
  totalBalance: FinancialBalance;
  totalExpense: FinancialBalance;
  totalSavings: FinancialBalance;
  lastUpdated: string;
};

export interface FinancialSummaryResponse {
  success: boolean;
  message: string;
  data: FinancialSummary;
}
/**
 * Financial Working Capital Types
 */
export type FinancialWorkingCapitalData = {
  month: string;
  income: number;
  expense: number;
  net: number;
};
export type FinancialWorkingCapital = {
  period: string;
  currency: string;
  data: FinancialWorkingCapitalData[];
  summary: {
    totalIncome: number;
    totalExpense: number;
    netBalance: number;
  };
};
export interface FinancialWorkingCapitalResponse {
  success: boolean;
  message: string;
  data: FinancialWorkingCapital;
}
/**
 * Financial Wallet Types
 */
export type FinancialWalletCardType =
  (typeof FinancialWalletCardType)[keyof typeof FinancialWalletCardType];
export type FinancialWalletCardNetworkType =
  (typeof FinancialWalletCardNetwork)[keyof typeof FinancialWalletCardNetwork];
export type FinancialWalletCard = {
  id: string;
  name: string;
  type: FinancialWalletCardType;
  cardNumber: string;
  bank: string;
  network: FinancialWalletCardNetworkType;
  expiryMonth: number;
  expiryYear: number;
  color: string;
  isDefault: boolean;
};
export type FinancialWallet = {
  cards: FinancialWalletCard[];
};
export interface FinancialWalletResponse {
  success: boolean;
  message: string;
  data: FinancialWallet;
}
/**
 * Financial Recent Transactions Types
 */
export type FinancialTransactionStatusType =
  (typeof FinancialTransactionStatus)[keyof typeof FinancialTransactionStatus];

export type FinancialTransaction = {
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

export type FinancialRecentTransactions = {
  transactions: FinancialTransaction[];
  summary: {
    totalIncome: number;
    totalExpense: number;
    count: number;
  };
};

export interface FinancialRecentTransactionsResponse {
  success: boolean;
  message: string;
  data: FinancialRecentTransactions;
}
/**
 * Financial Scheduled Transfers Types
 */
export type FinancialTransferStatusType =
  (typeof FinancialTransferStatus)[keyof typeof FinancialTransferStatus];

export type FinancialTransfer = {
  id: string;
  name: string;
  image: string;
  date: string;
  amount: number;
  currency: string;
  status: FinancialTransferStatusType;
};

export type FinancialScheduledTransfers = {
  transfers: FinancialTransfer[];
  summary: {
    totalScheduledAmount: number;
    count: number;
  };
};

export interface FinancialScheduledTransfersResponse {
  success: boolean;
  message: string;
  data: FinancialScheduledTransfers;
}
