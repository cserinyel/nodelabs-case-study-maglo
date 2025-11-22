import { useFinancialWallet } from "../../../../hooks/useFinancialData";
import Button from "../../../../shared/components/button/button";
import Skeleton from "../../../../shared/components/skeleton/skeleton";

const Wallet = () => {
  const { wallet, isLoading, error, refetchWallet } = useFinancialWallet();

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600">Error: {error.message}</p>
        <Button
          variant="border"
          onClick={refetchWallet}
          disabled={isLoading}
          className="mt-4 w-auto"
        >
          Retry
        </Button>
      </div>
    );
  }
  if (isLoading || !wallet) {
    return (
      <div className="space-y-4">
        <Skeleton variant="text" width="200px" height="24px" />
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Wallet</h1>
      {wallet.cards.map((card) => (
        <div key={card.id}>
          <p className="text-lg">{card.name}</p>
          <p className="text-lg">{card.type}</p>
          <p className="text-lg">{card.cardNumber}</p>
          <p className="text-lg">{card.bank}</p>
        </div>
      ))}
    </div>
  );
};

export default Wallet;
