import Icon from "../icon/icon";
import { ProfileMenuIcon } from "../../../assets/icons/icons";
import { twMerge } from "tailwind-merge";

const ProfileMenu = () => {
  const profileMenuWrapperClasses = twMerge(
    "flex flex-row items-center justify-between",
    "p-[6px] px-[7px]",
    "bg-[var(--profile-menu-bg-color)] rounded-full",
    "transition-all duration-300 cursor-pointer",
    "hover:bg-[var(--bg-color-2)]",
    "lg:min-w-[215px]"
  );
  return (
    <div className={profileMenuWrapperClasses}>
      <div className="flex flex-row items-center gap-[10px]">
        <img
          src="/src/assets/images/profile-image.png"
          alt="profile menu avatar"
          className="w-[36px] h-[36px] rounded-full object-cover"
        />
        <div className="flex-col items-start justify-start hidden lg:flex">
          <p className="text-[14px]/[100%] font-semibold">Mahfuzul Nabil</p>
        </div>
      </div>
      <div className="items-center justify-center w-[36px] h-[36px] text-1 hidden lg:flex">
        <Icon src={ProfileMenuIcon} size="xs" className="" />
      </div>
    </div>
  );
};

export default ProfileMenu;
