import { Outlet } from "react-router";
import toast from "react-hot-toast";
import { useFinancialStore } from "../../../store/financialStore";
import { useEffect } from "react";
import Sidebar from "../components/sidebar/sidebar";
import TopBar from "../components/topbar/topBar";
import { twMerge } from "tailwind-merge";
import { mediaQueryMerger } from "../../../utils/helpers";
import useCommonStore from "../../../store/commonStore";

const DashboardTemplate = () => {
  const { fetchAll } = useFinancialStore();
  const { isSidebarOpen } = useCommonStore();

  useEffect(() => {
    // fetch all financial data once on mount
    toast.promise(fetchAll(), {
      loading: "Fetching all financial data...",
      success: "All financial data fetched successfully!",
      error: "Error fetching all financial data",
    });
  }, []);

  const dashboardTemplateWrapperClasses = twMerge("flex flex-row");
  const dashboardTemplateLeftPanelClasses = twMerge(
    "flex w-[250px] h-full absolute",
    "transition-all duration-300",
    "translate-x-[-100%]",
    "z-[100]",
    isSidebarOpen && "translate-x-0",
    mediaQueryMerger("xl", "translate-x-0 flex")
  );
  const dashboardTemplateRightPanelClasses = twMerge(
    "flex flex-col pt-[30px] pb-[43px] gap-[30px] relative",
    "w-full h-screen",
    "transition-all duration-300",
    mediaQueryMerger("xl", "ml-[250px]")
  );
  const dashboardTemplateOverlayClasses = twMerge(
    "fixed top-0 left-0 w-screen h-screen bg-(--accent-color-2)/80 z-8 pointer-events-none",
    "transition-all duration-300",
    "opacity-0",
    isSidebarOpen && "opacity-100"
  );

  return (
    <div className={dashboardTemplateWrapperClasses}>
      <div className={dashboardTemplateOverlayClasses}></div>
      <div className={dashboardTemplateLeftPanelClasses}>
        <Sidebar />
      </div>
      <div className={dashboardTemplateRightPanelClasses}>
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardTemplate;
