import useCommonStore from "../../../../store/commonStore";
import IconButton from "../../../../shared/components/iconButton/iconButton";
import {
  closeIcon,
  menuIcon,
} from "../../../../assets/icons/icons";

const MenuButton = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useCommonStore();

  const icon = isSidebarOpen ? closeIcon : menuIcon;

  const handleClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex items-center justify-center text-2 xl:hidden">
      <IconButton icon={icon} size="medium" onClick={handleClick} />
    </div>
  );
};

export default MenuButton;
