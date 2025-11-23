import Skeleton from "../../../../shared/components/skeleton/skeleton";
import Button from "../../../../shared/components/button/button";
import { useFinancialWorkingCapital } from "../../../../hooks/useFinancialData";
import { LineChart } from "./components/lineChart/lineChart";
import { workingCapitalDataConverter } from "./utils/helpers";
import Select from "../../../../shared/components/select/select";

const WorkingCapital = () => {
  const { workingCapital, isLoading, error, refetchWorkingCapital } =
    useFinancialWorkingCapital();

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600">Error: {error.message}</p>
        <Button
          variant="border"
          onClick={refetchWorkingCapital}
          disabled={isLoading}
          className="mt-4 w-auto"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (isLoading || !workingCapital) {
    return (
      <div className="w-full h-full flex-1">
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>
    );
  }

  const realData = workingCapitalDataConverter(workingCapital);

  return (
    <div className="flex flex-col gap-[20px] w-full border border-gray-200 rounded-md py-[20px] px-[25px]">
      <div className="flex flex-row justify-between items-center gap-[20px] w-full">
        <h1 className="widget-header-title">Working Capital</h1>
        <div className="flex flex-row items-center justify-between gap-[10px] w-[340px] shrink-0">
          <div className="flex flex-row items-center justify-between gap-[30px]">
            <div className="flex flex-row items-center gap-[10px] text-[12px]/[100%]">
              <svg width={10} height={10}>
                <circle cx={5} cy={5} r={5} fill="var(--color-secondary)" />
              </svg>
              Income
            </div>
            <div className="flex flex-row items-center gap-[10px] text-[12px]/[100%]">
              <svg width={10} height={10}>
                <circle cx={5} cy={5} r={5} fill="var(--color-primary)" />
              </svg>
              Expense
            </div>
          </div>
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
      </div>
      <div className="w-full h-[200px] overflow-visible">
        <LineChart {...realData} />
      </div>
    </div>
  );
};

export default WorkingCapital;
