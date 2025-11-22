import { useFinancialRecentTransactions } from "../../../../hooks/useFinancialData";
import Button from "../../../../shared/components/button/button";
import Skeleton from "../../../../shared/components/skeleton/skeleton";

const RecentTransactions = () => {
  const { recentTransactions, isLoading, error, refetchRecentTransactions } =
    useFinancialRecentTransactions();

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600">Error: {error.message}</p>
        <Button
          variant="border"
          onClick={refetchRecentTransactions}
          disabled={isLoading}
          className="mt-4 w-auto"
        >
          Retry
        </Button>
      </div>
    );
  }
  if (isLoading || !recentTransactions) {
    return (
      <div className="space-y-4">
        <Skeleton variant="text" width="200px" height="24px" />
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recent Transactions</h1>
      <div className="space-y-2">
        {recentTransactions.transactions.map((transaction) => (
          <div key={transaction.id}>
            <p className="text-lg">{transaction.name}</p>
            <p className="text-lg">{transaction.amount}</p>
            <p className="text-lg">{transaction.currency}</p>
            <p className="text-lg">{transaction.date}</p>
            <p className="text-lg">{transaction.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
