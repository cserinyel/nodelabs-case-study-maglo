import { useFinancialSummary } from "../../../../hooks/useFinancialData";
import SummaryCard from "./components/summaryCard/summaryCard";
import { WalletAddIcon, WalletIcon } from "../../../../assets/icons/icons";
import ErrorOverlay from "../../../../shared/components/errorOverlay/errorOverlay";

const Summary = () => {
  const { summary, isLoading, error, refetchSummary } = useFinancialSummary();

  if (error) {
    return (
      <ErrorOverlay
        error={error}
        onClick={refetchSummary}
        buttonText="Retry"
        orientation="horizontal"
      />
    );
  }

  return (
    <div className="flex flex-row flex-wrap gap-[25px] md:flex-nowrap">
      <SummaryCard
        isLoading={isLoading}
        title="Total Balance"
        data={summary?.totalBalance}
        icon={WalletIcon}
        isFocused={true}
      />
      <SummaryCard
        isLoading={isLoading}
        title="Total Expense"
        data={summary?.totalExpense}
        icon={WalletIcon}
      />
      <SummaryCard
        isLoading={isLoading}
        title="Total Savings"
        data={summary?.totalSavings}
        icon={WalletAddIcon}
      />
    </div>
  );
};

export default Summary;
