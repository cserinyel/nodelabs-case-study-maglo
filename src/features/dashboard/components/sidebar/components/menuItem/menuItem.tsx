import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";
import type { SidebarMenuItem } from "../../utils/types";
import Icon from "../../../../../../shared/components/icon/icon";

const MenuItem = ({
  to,
  label,
  disabled,
  onClick,
  icon,
  className,
  end,
  ariaLabel,
}: SidebarMenuItem) => {
  if (to) {
    return (
      <NavLink
        key={label}
        to={to}
        end={end}
        aria-label={ariaLabel}
        className={({ isActive }) =>
          twMerge(
            "h-[48px]",
            "flex items-center justify-start gap-2",
            "px-[12px] py-[10px] rounded-[8px]",
            "text-[14px] font-medium",
            "transition-all duration-200",
            "hover:bg-primary-50",
            isActive
              ? "text-1 bg-(--color-primary) hover:bg-primary-600 fill-(--text-color-1)"
              : "text-2 hover:bg-(--border-color-2) hover:text-1] fill-(--text-color-2) hover:text-1 hover:fill-(--text-color-1)",
            disabled && "opacity-50 cursor-default pointer-events-none",
            className
          )
        }
      >
        {icon && <Icon src={icon} size="xs" className="" aria-hidden="true" />}
        <span>{label}</span>
      </NavLink>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={twMerge(
        "flex items-center justify-start gap-2",
        "h-[48px]",
        "cursor-pointer",
        "px-[12px] py-[10px] rounded-[8px]",
        "text-[14px] font-medium",
        "transition-all duration-200",
        "fill-(--text-color-2) hover:bg-primary-50",
        "transition-all duration-200",
        "text-2 hover:bg-(--border-color-2) hover:text-1 hover:fill-(--text-color-1)",
        disabled && "opacity-50 cursor-default pointer-events-none"
      )}
      aria-label={ariaLabel}
    >
      {icon && <Icon src={icon} size="xs" className="" aria-hidden="true" />}
      <span>{label}</span>
    </button>
  );
};

export default MenuItem;
