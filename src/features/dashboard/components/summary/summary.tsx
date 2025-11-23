import Skeleton from "../../../../shared/components/skeleton/skeleton";
import Button from "../../../../shared/components/button/button";
import { useFinancialSummary } from "../../../../hooks/useFinancialData";
import SummaryCard from "./components/summaryCard/summaryCard";
import { WalletAddIcon, WalletIcon } from "../../../../assets/icons/icons";

const Summary = () => {
  const { summary, isLoading, error, refetchSummary } = useFinancialSummary();

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600">Error: {error.message}</p>
        <Button
          variant="border"
          onClick={refetchSummary}
          disabled={isLoading}
          className="mt-4 w-auto"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
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
