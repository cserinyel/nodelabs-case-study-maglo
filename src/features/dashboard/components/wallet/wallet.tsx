import { useFinancialStore } from "../../../../store/financialStore";
import CreditCard from "./components/creditCard/creditCard";
import Widget from "../../../../shared/components/widget/widget";
import { WIDGET_DELAYS } from "../../../../utils/animations";
import { useCallback } from "react";

const Wallet = () => {
  const wallet = useFinancialStore((state) => state.wallet);
  const isLoading = useFinancialStore((state) => state.isLoading.wallet);
  const error = useFinancialStore((state) => state.errors.wallet);
  const refetch = useFinancialStore((state) => state.refetch);

  const handleRefetch = useCallback(() => refetch("wallet"), [refetch]);

  return (
    <Widget
      isLoading={isLoading || !wallet}
      error={error}
      onRetry={handleRefetch}
      className="gap-[15px]"
      animationDelay={WIDGET_DELAYS.wallet}
      ariaLabelledBy="wallet-title"
    >
      <header className="flex flex-row justify-between items-center gap-[20px] w-full shrink-0 h-[22px]">
        <h2 id="wallet-title" className="widget-header-title">
          Wallet
        </h2>
        <div className="flex flex-row items-center justify-end gap-[10px] shrink-0"></div>
      </header>
      <main className="flex flex-col w-full flex-1 min-h-[300px] relative items-center justify-start">
        {wallet?.cards.map((card) => (
          <CreditCard key={card.id} cardData={card} />
        ))}
      </main>
    </Widget>
  );
};

export default Wallet;
