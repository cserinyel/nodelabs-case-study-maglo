import useCommonStore from "../../../../store/commonStore";
import { closeIcon, menuIcon } from "../../../../assets/icons/icons";
import type { IconSize } from "../../../../shared/components/icon/icon.types";
import IconButton from "../../../../shared/components/iconButton/iconButton";

const MenuButton = ({
  size = "medium",
  className,
}: {
  size?: IconSize;
  className?: string;
}) => {
  const { isSidebarOpen, setIsSidebarOpen } = useCommonStore();

  const icon = isSidebarOpen ? closeIcon : menuIcon;

  const handleClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <IconButton
      icon={icon}
      size={size}
      onClick={handleClick}
      className={className}
    />
  );
};

export default MenuButton;
