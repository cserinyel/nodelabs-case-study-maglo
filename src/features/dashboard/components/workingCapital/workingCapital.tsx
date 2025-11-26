import { useFinancialStore } from "../../../../store/financialStore";
import { LineChart } from "./components/lineChart/lineChart";
import { workingCapitalDataConverter } from "./utils/helpers";
import Select from "../../../../shared/components/select/select";
import { twMerge } from "tailwind-merge";
import Widget from "../../../../shared/components/widget/widget";
import { WIDGET_DELAYS } from "../../../../utils/animations";
import { useCallback } from "react";

const WorkingCapital = () => {
  const workingCapital = useFinancialStore((state) => state.workingCapital);
  const isLoading = useFinancialStore(
    (state) => state.isLoading.workingCapital
  );
  const error = useFinancialStore((state) => state.errors.workingCapital);
  const refetch = useFinancialStore((state) => state.refetch);

  const handleRefetch = useCallback(() => refetch("workingCapital"), [refetch]);

  const convertedData = workingCapital
    ? workingCapitalDataConverter(workingCapital)
    : null;

  const contentClasses = twMerge(
    "flex flex-col justify-between items-start gap-[20px] w-full",
    "lg:flex-row lg:items-center"
  );

  return (
    <Widget
      isLoading={isLoading || !workingCapital}
      error={error}
      onRetry={handleRefetch}
      className="shrink-0 pt-[15px] pb-[20px] pl-[25px] pr-[20px] border border-gray-200 rounded-md"
      animationDelay={WIDGET_DELAYS.workingCapital}
      ariaLabelledBy="working-capital-title"
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
            defaultValue="lastSevenDays"
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
        {convertedData && <LineChart {...convertedData} />}
      </figure>
    </Widget>
  );
};

export default WorkingCapital;
