import Button from "../../../shared/components/button/button";
import { useLogout } from "../../../api/auth";
import toast from "react-hot-toast";
import Summary from "../components/summary/summary";
import WorkingCapital from "../components/workingCapiral/workingCapital";
import { useFinancialStore } from "../../../store/financialStore";
import { useEffect } from "react";
import RecentTransactions from "../components/recentTransactions/recentTransactions";
import Wallet from "../components/wallet/wallet";
import ScheduledTransfers from "../components/scheduledTransfers/scheduledTransfers";

const Dashboard = () => {
  const { mutateAsync: logoutMutation, isPending } = useLogout();
  const { fetchAll } = useFinancialStore();

  useEffect(() => {
    // fetch all financial data once on mount
    toast.promise(fetchAll(), {
      loading: "Fetching all financial data...",
      success: "All financial data fetched successfully!",
      error: "Error fetching all financial data",
    });
  }, []);

  const handleLogout = () => {
    toast.promise(logoutMutation(), {
      loading: "Logging out...",
      success: "Logged out successfully!",
      error: (err) => (
        <b>{err?.message || "Failed to log out. Please try again."}</b>
      ),
    });
  };

  return (
    <div className="p-8 overflow-y-auto h-screen">
      <h1 className="text-title-1 mb-4">Dashboard</h1>
      <p className="mb-8">Welcome to your dashboard!</p>

      <div className="w-[200px]">
        <Button variant="primary" onClick={handleLogout} disabled={isPending}>
          {isPending ? "Logging out..." : "Log Out"}
        </Button>
      </div>

      <Summary />
      <WorkingCapital />
      <RecentTransactions />
      <Wallet />
      <ScheduledTransfers />
    </div>
  );
};

export default Dashboard;
