import Skeleton from "../../../../shared/components/skeleton/skeleton";
import { useFinancialWorkingCapital } from "../../../../hooks/useFinancialData";
import { LineChart } from "./components/lineChart/lineChart";
import { workingCapitalDataConverter } from "./utils/helpers";
import Select from "../../../../shared/components/select/select";
import { twMerge } from "tailwind-merge";
import ErrorOverlay from "../../../../shared/components/errorOverlay/errorOverlay";
import { motion } from "framer-motion";

const WorkingCapital = () => {
  const { workingCapital, isLoading, error, refetchWorkingCapital } =
    useFinancialWorkingCapital();

  if (error) {
    return (
      <ErrorOverlay
        error={error}
        onClick={refetchWorkingCapital}
        buttonText="Retry"
      />
    );
  }

  if (isLoading || !workingCapital) {
    return (
      <div className={twMerge("w-full h-full flex-1 min-h-[300px] xl:min-h-0")}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>
    );
  }

  const convertedData = workingCapitalDataConverter(workingCapital);

  const widgetClasses = twMerge(
    "flex flex-col flex-1 shrink-0 gap-[20px]",
    "w-full pt-[15px] pb-[20px] pl-[25px] pr-[20px]",
    "border border-gray-200 rounded-md"
  );

  const contentClasses = twMerge(
    "flex flex-col justify-between items-start gap-[20px] w-full",
    "lg:flex-row lg:items-center"
  );

  return (
    <motion.section
      className={widgetClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
      aria-labelledby="working-capital-title"
    >
      <header className={contentClasses}>
        <h2 id="working-capital-title" className="widget-header-title">
          Working Capital
        </h2>
        <div className="flex flex-row items-center justify-between shrink-0 w-full gap-[10px] lg:w-[340px]">
          <ul
            className="flex flex-row items-center justify-between gap-[30px]"
            aria-label="Chart legend"
          >
            <li className="flex flex-row items-center gap-[10px] text-[12px]/[100%]">
              <svg width={10} height={10} aria-hidden="true">
                <circle cx={5} cy={5} r={5} fill="var(--color-secondary)" />
              </svg>
              <span>Income</span>
            </li>
            <li className="flex flex-row items-center gap-[10px] text-[12px]/[100%]">
              <svg width={10} height={10} aria-hidden="true">
                <circle cx={5} cy={5} r={5} fill="var(--color-primary)" />
              </svg>
              <span>Expense</span>
            </li>
          </ul>
          <Select
            name="timeRange"
            selectedOptionKey="lastSevenDays"
            options={[
              { key: "lastSevenDays", value: "Last 7 Days" },
              { key: "lastTwoWeeks", value: "Last 2 Weeks" },
              { key: "lastMonth", value: "Last Month" },
              { key: "lastThreeMonths", value: "Last 3 Months" },
              { key: "lastSixMonths", value: "Last 6 Months" },
              { key: "lastYear", value: "Last Year" },
            ]}
          />
        </div>
      </header>
      <figure
        className="w-full flex-1 overflow-visible min-h-[200px]"
        aria-label="Working capital chart"
      >
        <LineChart {...convertedData} />
      </figure>
    </motion.section>
  );
};

export default WorkingCapital;
