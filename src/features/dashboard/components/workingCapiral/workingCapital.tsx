import Skeleton from "../../../../shared/components/skeleton/skeleton";
import Button from "../../../../shared/components/button/button";
import { useFinancialWorkingCapital } from "../../../../hooks/useFinancialData";

const WorkingCapital = () => {
  const { workingCapital, isLoading, error, refetchWorkingCapital } =
    useFinancialWorkingCapital();

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600">Error: {error.message}</p>
        <Button
          variant="border"
          onClick={refetchWorkingCapital}
          disabled={isLoading}
          className="mt-4 w-auto"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (isLoading || !workingCapital) {
    return (
      <div className="space-y-4">
        <Skeleton variant="text" width="200px" height="24px" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Working Capital</h1>
      <div className="space-y-2">
        <p className="text-lg">Period: {workingCapital.period}</p>
        <p className="text-lg">Currency: {workingCapital.currency}</p>
        <p className="text-lg">
          Total Income: {workingCapital.summary.totalIncome}
        </p>
        <p className="text-lg">
          Total Expense: {workingCapital.summary.totalExpense}
        </p>
        <p className="text-lg">
          Net Balance: {workingCapital.summary.netBalance}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workingCapital.data.map((item) => (
          <div key={item.month}>
            <p className="text-lg">Month: {item.month}</p>
            <p className="text-lg">Income: {item.income}</p>
            <p className="text-lg">Expense: {item.expense}</p>
            <p className="text-lg">Net: {item.net}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkingCapital;
