import { twMerge } from "tailwind-merge";
import Icon from "../icon/icon";
import type { ButtonProps } from "./button.types";

const Button = ({
  children,
  className,
  variant = "primary",
  buttonSize = "default",
  textColor = "primary",
  icon,
  iconSize,
  iconPosition = "left",
  iconRotation = "0",
  ...props
}: ButtonProps) => {
  const buttonTypeClass = {
    primary: twMerge(
      "text-[var(--text-color-1)] bg-[var(--color-primary)]",
      "hover:bg-[var(--color-primary-600)]"
    ),
    border: twMerge(
      "text-[var(--text-color-3)] bg-[var(--light-color)] border border-[var(--border-color)]",
      "hover:border-[var(--border-color-2)]"
    ),
    text: twMerge(
      "bg-transparent",
      "text-(--text-color-1)",
      textColor === "secondary" && "text-(--color-secondary)"
    ),
  };
  const buttonSizeClass = {
    small: twMerge(
      "gap-[6px]",
      "font-[600] text-[14px]/[100%]",
      "py-[10px] px-[16px]",
      "max-h-[32px]",
      variant === "text" && "max-h-[18px] p-0"
    ),
    default: twMerge(
      "font-[600] text-[16px]/[100%]",
      "py-[14px] px-[20px]",
      "max-h-[48px]",
      variant === "text" && "max-h-[24px]"
    ),
  };

  const classes = twMerge(
    "w-full",
    "flex items-center justify-center gap-[10px]",
    "py-[14px] px-[20px]",
    "rounded-[10px]",
    "cursor-pointer",
    "transition-all duration-300",
    iconPosition === "left" && "flex-row-reverse",
    buttonSizeClass[buttonSize],
    buttonTypeClass[variant],
    className,
    "hover:brightness-60"
  );

  const iconClasses = twMerge(
    "rotate-0",
    iconRotation === "90" && "rotate-90",
    iconRotation === "180" && "rotate-180",
    iconRotation === "270" && "rotate-270"
  );

  return (
    <button className={classes} {...props}>
      {children}
      {icon && <Icon src={icon} size={iconSize} className={iconClasses} />}
    </button>
  );
};

export default Button;
