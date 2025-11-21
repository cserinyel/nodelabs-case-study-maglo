import { twMerge } from "tailwind-merge";
import Icon from "../icon/icon";
import type { ButtonProps } from "./button.types";

const Button = ({
  children,
  className,
  variant = "primary",
  icon,
  iconSize,
  ...props
}: ButtonProps) => {
  const buttonTypeClass = {
    primary: "bg-[var(--color-primary)] hover:bg-[var(--color-primary-600)]",
    border:
      "bg-[var(--light-color)] border border-[var(--border-color)] hover:border-[var(--border-color-2)] ",
    text: "bg-transparent",
  };

  const classes = twMerge(
    "w-full",
    buttonTypeClass[variant],
    "flex items-center justify-center gap-[10px]",
    "text-[var(--text-color-1)] text-[600]",
    "pt-[15px] pr-[25px] pb-[16px] pl-[20px]",
    "rounded-[10px]",
    "cursor-pointer",
    "transition-all duration-300",
    className
  );

  return (
    <button className={classes} {...props}>
      {icon && <Icon src={icon} size={iconSize} />}
      {children}
    </button>
  );
};

export default Button;
