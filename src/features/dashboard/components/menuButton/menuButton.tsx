import useCommonStore from "../../../../store/commonStore";
import { CloseIcon, MenuIcon } from "../../../../assets/icons/icons";
import type { IconSize } from "../../../../shared/components/icon/icon.types";
import IconButton from "../../../../shared/components/iconButton/iconButton";

interface MenuButtonProps {
  mode: "open" | "close";
  size?: IconSize;
  className?: string;
}

const MenuButton = ({ mode, size = "medium", className }: MenuButtonProps) => {
  const { isSidebarOpen, setIsSidebarOpen } = useCommonStore();

  const icon = mode === "open" ? MenuIcon : CloseIcon;

  return (
    <IconButton
      icon={icon}
      size={size}
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className={className}
    />
  );
};

export default MenuButton;
