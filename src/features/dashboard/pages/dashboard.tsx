import Summary from "../components/summary/summary";
import WorkingCapital from "../components/workingCapiral/workingCapital";
import RecentTransactions from "../components/recentTransactions/recentTransactions";
import Wallet from "../components/wallet/wallet";
import ScheduledTransfers from "../components/scheduledTransfers/scheduledTransfers";
import { twMerge } from "tailwind-merge";

const Dashboard = () => {
  const dashboardWrapperClasses = twMerge(
    "flex flex-col gap-[40px] overflow-y-auto px-[20px]",
    "h-full w-full",
    "overflow-x-hidden",
    "md:gap-[40px]",
    "xl:flex-row xl:px-[40px]"
  );
  const dashboardLeftContentClasses = twMerge(
    "flex flex-col gap-[30px]",
    "w-full",
    "md:flex-1"
  );
  const dashboardRightContentClasses = twMerge(
    "flex flex-col gap-[30px]",
    "w-full",
    "md:flex-row",
    "xl:flex-col xl:w-[354px]"
  );
  return (
    <div className={dashboardWrapperClasses}>
      <div className={dashboardLeftContentClasses}>
        <div className="flex shrink-0 flex-col gap-[30px]">
          <Summary />
        </div>
        <div className="flex flex-col flex-1 h-full gap-[30px]">
          <WorkingCapital />
        </div>
        <div className="flex flex-col flex-1 h-full gap-[30px]">
          <RecentTransactions />
        </div>
      </div>
      <div className={dashboardRightContentClasses}>
        <div className="flex flex-col flex-1 gap-[30px]">
          <Wallet />
        </div>
        <div className="flex flex-col flex-1 gap-[30px]">
          <ScheduledTransfers />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
