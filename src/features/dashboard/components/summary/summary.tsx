import { useFinancialStore } from "../../../../store/financialStore";
import SummaryCard from "./components/summaryCard/summaryCard";
import { WalletAddIcon, WalletIcon } from "../../../../assets/icons/icons";
import ErrorOverlay from "../../../../shared/components/errorOverlay/errorOverlay";
import { useCallback } from "react";

const Summary = () => {
  const summary = useFinancialStore((state) => state.summary);
  const isLoading = useFinancialStore((state) => state.isLoading.summary);
  const error = useFinancialStore((state) => state.errors.summary);
  const refetch = useFinancialStore((state) => state.refetch);

  const handleRefetch = useCallback(() => refetch("summary"), [refetch]);

  if (error) {
    return (
      <ErrorOverlay
        error={error}
        onClick={handleRefetch}
        buttonText="Retry"
        orientation="horizontal"
      />
    );
  }

  return (
    <section
      className="flex flex-row flex-wrap gap-[25px] md:flex-nowrap"
      aria-label="Financial summary"
    >
      <SummaryCard
        isLoading={isLoading}
        title="Total Balance"
        data={summary?.totalBalance}
        icon={WalletIcon}
        isFocused={true}
        index={0}
      />
      <SummaryCard
        isLoading={isLoading}
        title="Total Expense"
        data={summary?.totalExpense}
        icon={WalletIcon}
        index={1}
      />
      <SummaryCard
        isLoading={isLoading}
        title="Total Savings"
        data={summary?.totalSavings}
        icon={WalletAddIcon}
        index={2}
      />
    </section>
  );
};

export default Summary;
