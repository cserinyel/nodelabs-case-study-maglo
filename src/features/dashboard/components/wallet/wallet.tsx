import { useFinancialWallet } from "../../../../hooks/useFinancialData";
import CreditCard from "./components/creditCard/creditCard";
import Widget from "../../../../shared/components/widget/widget";
import { WIDGET_DELAYS } from "../../../../utils/animations";

const Wallet = () => {
  const { wallet, isLoading, error, refetchWallet } = useFinancialWallet();

  return (
    <Widget
      isLoading={isLoading || !wallet}
      error={error}
      onRetry={refetchWallet}
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
