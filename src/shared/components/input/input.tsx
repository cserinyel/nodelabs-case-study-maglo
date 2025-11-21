import { twMerge } from "tailwind-merge";
import type { InputProps } from "./input.types";

const Input = ({
  type,
  id,
  className,
  label,
  labelClassName,
  ...props
}: InputProps) => {
  const classes = twMerge(
    "w-full",
    "text-[var(--text-color-3)]",
    "pt-[15px] pr-[25px] pb-[16px] pl-[20px]",
    "border border-[var(--border-color)] rounded-[10px]",
    className
  );
  const labelClasses = twMerge(
    "text-input-label",
    "h-[36px] flex items-center",
    labelClassName
  );
  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      <input type={type} id={id} className={classes} {...props} />
    </div>
  );
};

export default Input;
