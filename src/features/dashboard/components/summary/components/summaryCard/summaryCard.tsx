import { twMerge } from "tailwind-merge";
import Skeleton from "../../../../../../shared/components/skeleton/skeleton";
import type { FinancialBalance } from "../../../../../../types/financial";
import { getCurrencyWithSymbol } from "../../../../../finance/utils/helpers";
import Icon from "../../../../../../shared/components/icon/icon";

interface SummaryCardProps {
  isLoading: boolean;
  title: string;
  data?: FinancialBalance;
  icon: React.ReactNode;
  isFocused?: boolean;
}

const SummaryCard = ({
  isLoading,
  data,
  title,
  icon,
  isFocused = false,
}: SummaryCardProps) => {
  const cardClasses = twMerge(
    "min-h-[105px] w-full",
    "px-[20px]",
    "flex flex-row justify-between items-center gap-[15px]",
    "p-4 bg-(--bg-color-1) rounded-[10px]",
    isFocused && "bg-(--accent-color)"
  );
  const iconClasses = twMerge(
    "flex shrink-0 flex-row justify-center items-center",
    "bg-(--border-color-2) w-[42px] h-[42px] rounded-full",
    "fill-(--accent-color) text-(--accent-color)",
    isFocused &&
      "bg-(--accent-color-2) fill-(--color-primary) text-(--color-primary)"
  );
  return (
    <div className="flex flex-1 min-h-[105px] w-full">
      {isLoading || !data ? (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      ) : (
        <div className={cardClasses}>
          <div className={iconClasses}>
            <Icon src={icon} />
          </div>
          <div className="flex flex-col justify-center items-baseline gap-[10px]">
            <h3
              className={twMerge(
                "text-2 text-[14px]/[17px] font-normal",
                isFocused && "text-white"
              )}
            >
              {title}
            </h3>
            <p
              className={twMerge(
                "text-1 text-[24px]/[100%] font-bold",
                isFocused && "text-white"
              )}
            >
              {getCurrencyWithSymbol({
                currency: data.currency,
                value: data.amount,
                removeZeroDecimals: true,
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
