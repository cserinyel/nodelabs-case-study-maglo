import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import Skeleton from "../../../../../../shared/components/skeleton/skeleton";
import type { FinancialBalance } from "../../../../../../types/financial";
import { getCurrencyWithSymbol } from "../../../../../finance/utils/helpers";
import Icon from "../../../../../../shared/components/icon/icon";

interface SummaryCardProps {
  isLoading: boolean;
  title: string;
  data?: FinancialBalance;
  icon: React.ComponentType;
  isFocused?: boolean;
  index?: number;
}

const SummaryCard = ({
  isLoading,
  data,
  title,
  icon,
  isFocused = false,
  index = 0,
}: SummaryCardProps) => {
  const cardClasses = twMerge(
    "min-h-[105px] w-full",
    "px-[20px]",
    "flex flex-row items-center gap-[15px]",
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
    <article
      className={twMerge(
        "flex flex-1 min-h-[105px] w-full",
        isFocused && "basis-full md:basis-0"
      )}
      aria-label={title}
    >
      {isLoading || !data ? (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      ) : (
        <motion.div
          className={cardClasses}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
        >
          <figure className={iconClasses} aria-hidden="true">
            <Icon src={icon} />
          </figure>
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
        </motion.div>
      )}
    </article>
  );
};

export default SummaryCard;
