import { twMerge } from "tailwind-merge";
import { useFinancialWallet } from "../../../../hooks/useFinancialData";
import Button from "../../../../shared/components/button/button";
import Skeleton from "../../../../shared/components/skeleton/skeleton";
import CreditCard from "./components/creditCard/creditCard";

const Wallet = () => {
  const { wallet, isLoading, error, refetchWallet } = useFinancialWallet();

  const widgetClasses = twMerge(
    "flex flex-col flex-1 gap-[15px] min-h-0",
    "w-full"
  );

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
      <div className="w-full h-full flex-1">
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>
    );
  }
  return (
    <div className={widgetClasses}>
      <div className="flex flex-row justify-between items-center gap-[20px] w-full shrink-0 h-[22px]">
        <h1 className="widget-header-title">Wallet</h1>
        <div className="flex flex-row items-center justify-end gap-[10px] shrink-0"></div>
      </div>
      <div className="flex flex-col w-full flex-1 min-h-0 relative items-start">
        {wallet.cards
          .sort((a, b) => (a.isDefault ? 1 : 0) - (b.isDefault ? 1 : 0))
          .map((card, sortedIndex) => (
            <CreditCard
              key={card.id}
              cardData={card}
              totalCards={wallet.cards.length}
              sortedIndex={sortedIndex}
            />
          ))}
      </div>
    </div>
  );
};

export default Wallet;
