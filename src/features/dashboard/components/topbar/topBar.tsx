import { notificationIcon, searchIcon } from "../../../../assets/icons/icons";
import IconButton from "../../../../shared/components/iconButton/iconButton";
import ProfileMenu from "../../../../shared/components/profileMenu/profileMenu";
import MenuButton from "../menuButton/menuButton";

const TopBar = () => {
  return (
    <div className="flex flex-row justify-between items-center h-[48px] px-[20px] xl:px-[40px]">
      <div className="flex flex-row items-center gap-[10px]">
        <MenuButton />
        <h1 className="text-title-2">Dashboard</h1>
      </div>
      <div className="flex flex-row items-center gap-[40px]">
        <div className="flex flex-row items-center gap-[25px]">
          <div className="flex items-center justify-center text-2">
            <IconButton icon={searchIcon} size="medium" />
          </div>
          <div className="hidden items-center justify-center text-2 lg:flex">
            <IconButton icon={notificationIcon} size="medium" />
          </div>
        </div>
        <ProfileMenu />
      </div>
    </div>
  );
};

export default TopBar;
