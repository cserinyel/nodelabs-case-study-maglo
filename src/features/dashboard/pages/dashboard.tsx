import Summary from "../components/summary/summary";
import WorkingCapital from "../components/workingCapiral/workingCapital";
import RecentTransactions from "../components/recentTransactions/recentTransactions";
import Wallet from "../components/wallet/wallet";
import ScheduledTransfers from "../components/scheduledTransfers/scheduledTransfers";

const Dashboard = () => {
  return (
    <div className="flex flex-row gap-[40px]">
      <div className="flex-1">
        <Summary />
        {/* <WorkingCapital /> */}
        {/* <RecentTransactions /> */}
      </div>
      <div className="w-[354px]">
        {/* <Wallet /> */}
        {/* <ScheduledTransfers /> */}
      </div>
    </div>
  );
};

export default Dashboard;
