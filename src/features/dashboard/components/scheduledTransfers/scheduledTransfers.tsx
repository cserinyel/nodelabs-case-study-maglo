import { useFinancialScheduledTransfers } from "../../../../hooks/useFinancialData";
import Button from "../../../../shared/components/button/button";
import Skeleton from "../../../../shared/components/skeleton/skeleton";

const ScheduledTransfers = () => {
  const { scheduledTransfers, isLoading, error, refetchScheduledTransfers } =
    useFinancialScheduledTransfers();

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600">Error: {error.message}</p>
        <Button
          variant="border"
          onClick={refetchScheduledTransfers}
          disabled={isLoading}
          className="mt-4 w-auto"
        >
          Retry
        </Button>
      </div>
    );
  }
  if (isLoading || !scheduledTransfers) {
    return (
      <div className="space-y-4">
        <Skeleton variant="text" width="200px" height="24px" />
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Scheduled Transfers</h1>
      <div className="space-y-2">
        {scheduledTransfers.transfers.map((transfer) => (
          <div key={transfer.id}>
            <p className="text-lg">{transfer.name}</p>
            <p className="text-lg">{transfer.amount}</p>
            <p className="text-lg">{transfer.currency}</p>
            <p className="text-lg">{transfer.date}</p>
            <p className="text-lg">{transfer.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduledTransfers;
