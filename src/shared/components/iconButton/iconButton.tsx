import { twMerge } from "tailwind-merge";
import type { IconButtonProps } from "./iconButton.types";
import Icon from "../icon/icon";

const IconButton = ({
  icon,
  size = "medium",
  className,
  onClick,
  disabled,
  ...props
}: IconButtonProps) => {
  const sizeClass = {
    xs: "w-[20px] h-[20px]",
    small: "w-[24px] h-[24px]",
    medium: "w-[32px] h-[32px]",
    large: "w-[40px] h-[40px]",
  };

  const classes = twMerge(
    sizeClass[size],
    "flex items-center justify-center",
    "transition-all duration-300 cursor-pointer",
    "rounded-full bg-transparent hover:bg-[var(--bg-color-1)]",
    className
  );

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <Icon src={icon} size="xs" className="" />
    </button>
  );
};

export default IconButton;
