import { twMerge } from "tailwind-merge";
import type { InputProps } from "./input.types";

const Input = ({
  type,
  id,
  className,
  label,
  labelClassName,
  error,
  ...props
}: InputProps) => {
  const classes = twMerge(
    "w-full",
    "text-[var(--text-color-3)]",
    "pt-[15px] pr-[25px] pb-[16px] pl-[20px]",
    "border border-[var(--border-color)] rounded-[10px]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
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
      {error && (
        <p className="text-error-1 text-[12px] font-normal">
          {Array.isArray(error) ? error.join(", ") : error}
        </p>
      )}
    </div>
  );
};

export default Input;
