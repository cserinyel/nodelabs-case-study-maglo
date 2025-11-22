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
    "outline-[var(--color-primary)]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    error?.length && "border-red-500 outline-red-500",
    className
  );
  const labelClasses = twMerge(
    "text-input-label",
    "h-[36px] flex items-center",
    labelClassName
  );

  const getErrorList = (errors: string[]) => {
    if (!errors || errors.length === 0) return null;
    return (
      <ul className="flex flex-col gap-1">
        {errors.map((error) => (
          <li key={error}>
            <p className="text-red-500 text-[12px] font-normal">{error}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      <input type={type} id={id} className={classes} {...props} />
      {error && getErrorList(error)}
    </div>
  );
};

export default Input;
