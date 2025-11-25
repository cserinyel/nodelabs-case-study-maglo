import { notificationIcon, searchIcon } from "../../../../assets/icons/icons";
import IconButton from "../../../../shared/components/iconButton/iconButton";
import ProfileMenu from "../../../../shared/components/profileMenu/profileMenu";

const TopBar = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center gap-[10px]">
        <div className="flex items-center justify-center xl:hidden">
          <IconButton icon={searchIcon} size="medium" />
        </div>
        <h1 className="text-title-2">Dashboard</h1>
      </div>
      <div className="flex flex-row items-center gap-[40px]">
        <div className="flex flex-row items-center gap-[25px]">
          <div className="flex items-center justify-center text-2">
            <IconButton icon={searchIcon} size="medium" />
          </div>
          <div className="flex items-center justify-center text-2">
            <IconButton icon={notificationIcon} size="medium" />
          </div>
        </div>
        <ProfileMenu />
      </div>
    </div>
  );
};

export default TopBar;
