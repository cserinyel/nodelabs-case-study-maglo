import toast from "react-hot-toast";
import { useLogout } from "../../../../api/auth";
import { twMerge } from "tailwind-merge";
import { sidebarMainMenuItems } from "./utils/constants";
import MenuItem from "./components/menuItem/menuItem";
import {
  HelpIcon,
  LogoutIcon,
  NotificationIcon,
  SettingsIcon,
} from "../../../../assets/icons/icons";
import MenuButton from "../menuButton/menuButton";
import { ROUTES } from "../../../../routes/utils/constants";

const Sidebar = () => {
  const { mutateAsync: logoutMutation, isPending } = useLogout();
  const handleLogout = () => {
    toast.promise(logoutMutation(), {
      loading: "Logging out...",
      success: "Logged out successfully!",
      error: (err) => (
        <b>{err?.message || "Failed to log out. Please try again."}</b>
      ),
    });
  };

  const sidebarClasses = twMerge(
    "flex flex-col items-baseline justify-between",
    "h-screen w-[250px] px-[25px] pt-[30px] pb-[100px]",
    "bg-[var(--bg-color-1)]",
    "z-9"
  );

  return (
    <div className={sidebarClasses}>
      <div className="flex flex-col w-full gap-[30px]">
        {/* Logo */}
        <div className="flex flex-row gap-[10px] w-full justify-between">
          <img
            src="/src/assets/images/maglo-logo.svg"
            alt="logo"
            className="min-w-[122px] h-auto"
          />
          <MenuButton mode="close" className="xl:hidden" />
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-[8px] w-full">
          {sidebarMainMenuItems.map((item) => (
            <MenuItem key={item.label} {...item} />
          ))}
        </nav>
      </div>

      <div className="w-[200px]">
        {/* <Button variant="primary" onClick={handleLogout} disabled={isPending}>
          {isPending ? "Logging out..." : "Log Out"}
        </Button> */}
        <nav className="flex flex-col gap-[8px] w-full">
          <MenuItem
            label="Notifications"
            to="/"
            icon={NotificationIcon}
            className="flex lg:hidden"
          />
          <MenuItem label="Help" to="/" icon={HelpIcon} />
          <MenuItem
            to={ROUTES.DASHBOARD.SETTINGS}
            label="Settings"
            icon={SettingsIcon}
          />
          <MenuItem
            label={isPending ? "Logging out..." : "Log Out"}
            onClick={handleLogout}
            disabled={isPending}
            icon={LogoutIcon}
          />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
