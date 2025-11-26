import { Outlet } from "react-router";
import toast from "react-hot-toast";
import { useFinancialStore } from "../../../store/financialStore";
import { useEffect } from "react";
import Sidebar from "../components/sidebar/sidebar";
import TopBar from "../components/topbar/topBar";
import { twMerge } from "tailwind-merge";
import useCommonStore from "../../../store/commonStore";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

const DashboardLayout = () => {
  const { fetchAll } = useFinancialStore();
  const { isSidebarOpen } = useCommonStore();
  const isXlOrAbove = useMediaQuery("xl");

  useEffect(() => {
    // fetch all financial data once on mount
    toast.promise(fetchAll(), {
      loading: "Fetching all financial data...",
      success: "All financial data fetched successfully!",
      error: "Error fetching all financial data",
    });
  }, [fetchAll]);

  const shouldShowSidebar = isXlOrAbove || isSidebarOpen;

  const dashboardTemplateWrapperClasses = twMerge("flex flex-row");
  const dashboardTemplateLeftPanelClasses = twMerge(
    "flex w-[250px] h-full fixed top-0 left-0",
    "transition-all duration-300",
    "translate-x-[-100%]",
    "z-[100]",
    shouldShowSidebar && "translate-x-0",
    "xl:translate-x-0 xl:flex"
  );
  const dashboardTemplateRightPanelClasses = twMerge(
    "flex flex-col pt-[30px] pb-[43px] gap-[30px] relative",
    "w-full h-screen",
    "transition-all duration-300",
    "xl:ml-[250px]"
  );
  const dashboardTemplateOverlayClasses = twMerge(
    "fixed top-0 left-0 w-screen h-screen bg-(--accent-color-2)/80 z-8 pointer-events-none",
    "transition-[opacity] duration-300",
    "opacity-0",
    isSidebarOpen && !isXlOrAbove && "opacity-100 pointer-events-auto"
  );
  const dashboarContentdWrapperClasses = twMerge(
    "flex flex-col gap-[40px] overflow-y-auto px-[20px]",
    "h-full w-full",
    "overflow-x-hidden",
    "md:gap-[40px]",
    "xl:flex-row xl:px-[40px]"
  );

  return (
    <section className={dashboardTemplateWrapperClasses}>
      <aside className={dashboardTemplateOverlayClasses} aria-hidden="true" />
      <section className={dashboardTemplateLeftPanelClasses}>
        <Sidebar />
      </section>
      <main className={dashboardTemplateRightPanelClasses}>
        <TopBar />
        <main className={dashboarContentdWrapperClasses}>
          <Outlet />
        </main>
      </main>
    </section>
  );
};

export default DashboardLayout;
