import Summary from "../components/summary/summary";
import WorkingCapital from "../components/workingCapital/workingCapital";
import RecentTransactions from "../components/recentTransactions/recentTransactions";
import Wallet from "../components/wallet/wallet";
import ScheduledTransfers from "../components/scheduledTransfers/scheduledTransfers";
import { twMerge } from "tailwind-merge";

const Dashboard = () => {
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
    <>
      <section
        className={dashboardLeftContentClasses}
        aria-label="Main dashboard content"
      >
        <section className="flex shrink-0 flex-col gap-[30px]">
          <Summary />
        </section>
        <section className="flex flex-col flex-1 h-full gap-[30px]">
          <WorkingCapital />
        </section>
        <section className="flex flex-col flex-1 h-full gap-[30px]">
          <RecentTransactions />
        </section>
      </section>
      <aside
        className={dashboardRightContentClasses}
        aria-label="Dashboard sidebar widgets"
      >
        <section className="flex flex-col flex-1 gap-[30px]">
          <Wallet />
        </section>
        <section className="flex flex-col flex-1 gap-[30px]">
          <ScheduledTransfers />
        </section>
      </aside>
    </>
  );
};

export default Dashboard;
