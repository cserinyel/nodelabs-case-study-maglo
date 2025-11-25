import { twMerge } from "tailwind-merge";
import { useFinancialWallet } from "../../../../hooks/useFinancialData";
import Skeleton from "../../../../shared/components/skeleton/skeleton";
import CreditCard from "./components/creditCard/creditCard";
import ErrorOverlay from "../../../../shared/components/errorOverlay/errorOverlay";

const Wallet = () => {
  const { wallet, isLoading, error, refetchWallet } = useFinancialWallet();

  const widgetClasses = twMerge(
    "flex flex-col flex-1 gap-[15px] min-h-0",
    "w-full"
  );

  if (error) {
    return (
      <ErrorOverlay error={error} onClick={refetchWallet} buttonText="Retry" />
    );
  }
  if (isLoading || !wallet) {
    return (
      <div className={twMerge("w-full h-full flex-1 min-h-[300px] xl:min-h-0")}>
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
      <div className="flex flex-col w-full flex-1 min-h-[300px] relative items-center justify-start">
        {wallet.cards.map((card) => (
          <CreditCard key={card.id} cardData={card} />
        ))}
      </div>
    </div>
  );
};

export default Wallet;
