import { Outlet } from "react-router";
import toast from "react-hot-toast";
import { useFinancialStore } from "../../../store/financialStore";
import { useEffect } from "react";
import Sidebar from "../components/sidebar/sidebar";
import TopBar from "../components/topbar/topBar";

const DashboardTemplate = () => {
  const { fetchAll } = useFinancialStore();

  /* useEffect(() => {
    // fetch all financial data once on mount
    toast.promise(fetchAll(), {
      loading: "Fetching all financial data...",
      success: "All financial data fetched successfully!",
      error: "Error fetching all financial data",
    });
  }, []); */

  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col py-[30px] gap-[30px]">
        <div className="px-[40px]">
          <TopBar />
        </div>
        <div className="flex-1 overflow-y-auto h-screen px-[40px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;
