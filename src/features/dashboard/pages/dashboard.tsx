import Summary from "../components/summary/summary";
import WorkingCapital from "../components/workingCapiral/workingCapital";
import RecentTransactions from "../components/recentTransactions/recentTransactions";
import Wallet from "../components/wallet/wallet";
import ScheduledTransfers from "../components/scheduledTransfers/scheduledTransfers";

const Dashboard = () => {
  return (
    <div className="flex flex-1 flex-row gap-[40px] h-full">
      <div className="flex flex-col flex-1 gap-[30px] h-full">
        <Summary />
        <WorkingCapital />
        <RecentTransactions />
      </div>
      <div className="flex flex-col w-[354px] gap-[30px] h-full">
        {/* <Wallet />
        <ScheduledTransfers /> */}
      </div>
    </div>
  );
};

export default Dashboard;
