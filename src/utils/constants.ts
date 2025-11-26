// Auth constants
export const ACCESS_TOKEN_KEY = "accessToken";

export const SIMULATED_ERROR_RATE = 0.1;

export const AUTH_ENDPOINTS = [
  "/users/login",
  "/users/register",
  "/users/refresh-token",
] as const;

export const FinancialTrend = {
  UP: "up",
  DOWN: "down",
  STABLE: "stable",
} as const;

export const FinancialWalletCardType = {
  CREDIT: "credit",
  DEBIT: "debit",
} as const;

export const FinancialWalletCardNetwork = {
  VISA: "Visa",
  MASTERCARD: "Mastercard",
} as const;

export const FinancialTransactionStatus = {
  COMPLETED: "completed",
  PENDING: "pending",
  FAILED: "failed",
} as const;

export const FinancialTransferStatus = {
  SCHEDULED: "scheduled",
  PROCESSING: "processing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;
