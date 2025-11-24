import { createColumnHelper } from "@tanstack/react-table";
import type { FinancialTransfer } from "../../../../../types/financial";

export const scheduledTransfersColumnHelper =
  createColumnHelper<FinancialTransfer>();
