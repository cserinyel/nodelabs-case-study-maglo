import { NotificationIcon, SearchIcon } from "../../../../assets/icons/icons";
import IconButton from "../../../../shared/components/iconButton/iconButton";
import ProfileMenu from "../../../../shared/components/profileMenu/profileMenu";
import MenuButton from "../menuButton/menuButton";

const TopBar = () => {
  return (
    <header className="flex flex-row justify-between items-center h-[48px] px-[20px] xl:px-[40px]" role="banner">
      <div className="flex flex-row items-center gap-[10px]">
        <MenuButton mode="open" className="xl:hidden" />
        <h1 className="text-title-2">Dashboard</h1>
      </div>
      <nav className="flex flex-row items-center gap-[40px]" aria-label="Top bar actions">
        <div className="flex flex-row items-center gap-[25px]">
          <div className="flex items-center justify-center text-2">
            <IconButton icon={SearchIcon} size="medium" ariaLabel="Search" />
          </div>
          <div className="hidden items-center justify-center text-2 lg:flex">
            <IconButton icon={NotificationIcon} size="medium" ariaLabel="Notifications" />
          </div>
        </div>
        <ProfileMenu />
      </nav>
    </header>
  );
};

export default TopBar;
