import Skeleton from "../../../../shared/components/skeleton/skeleton";
import Button from "../../../../shared/components/button/button";
import { useFinancialSummary } from "../../../../hooks/useFinancialData";

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

  if (isLoading || !summary) {
    return (
      <div className="space-y-4">
        <Skeleton variant="text" width="200px" height="24px" />
        <div className="space-y-2">
          <Skeleton variant="text" width="150px" height="20px" />
          <Skeleton variant="text" width="150px" height="20px" />
          <Skeleton variant="text" width="150px" height="20px" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Summary</h1>
      <div className="space-y-2">
        <p className="text-lg">
          Total Balance: {summary.totalBalance.amount}{" "}
          {summary.totalBalance.currency}
        </p>
        <p className="text-lg">
          Total Expense: {summary.totalExpense.amount}{" "}
          {summary.totalExpense.currency}
        </p>
        <p className="text-lg">
          Total Savings: {summary.totalSavings.amount}{" "}
          {summary.totalSavings.currency}
        </p>
      </div>
    </div>
  );
};

export default Summary;
