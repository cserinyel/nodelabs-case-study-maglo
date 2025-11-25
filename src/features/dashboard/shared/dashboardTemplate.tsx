import { Outlet } from "react-router";
import toast from "react-hot-toast";
import { useFinancialStore } from "../../../store/financialStore";
import { useEffect } from "react";
import Sidebar from "../components/sidebar/sidebar";
import TopBar from "../components/topbar/topBar";
import { twMerge } from "tailwind-merge";
import { mediaQueryMerger } from "../../../utils/helpers";

const DashboardTemplate = () => {
  const { fetchAll } = useFinancialStore();

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
    mediaQueryMerger("xl", "translate-x-0 flex")
  );
  const dashboardTemplateRightPanelClasses = twMerge(
    "flex flex-col pt-[30px] pb-[43px] gap-[30px] relative",
    "w-full h-screen",
    "transition-all duration-300",
    mediaQueryMerger("xl", "ml-[250px]")
  );
  const dashboardTemplateMainContentClasses = twMerge(
    "flex overflow-y-auto h-full w-full px-[20px] md:px-[40px]"
  );

  return (
    <div className={dashboardTemplateWrapperClasses}>
      <div className={dashboardTemplateLeftPanelClasses}>
        <Sidebar />
      </div>
      <div className={dashboardTemplateRightPanelClasses}>
        <div className="px-[40px]">
          <TopBar />
        </div>
        <div className={dashboardTemplateMainContentClasses}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;
