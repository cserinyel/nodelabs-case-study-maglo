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
  const errorId = error?.length ? `${id}-error` : undefined;
  const hasError = Boolean(error?.length);

  const classes = twMerge(
    "w-full h-[48px]",
    "text-[var(--text-color-3)] text-[14px]/[100%] font-[500]",
    "pt-[15px] pr-[25px] pb-[16px] pl-[20px]",
    "border border-[var(--border-color)] rounded-[10px]",
    "outline-[var(--color-primary)]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    hasError && "border-red-500 outline-red-500",
    className
  );
  const labelClasses = twMerge(
    "text-input-label",
    "h-[36px] flex items-center",
    labelClassName
  );

  const getErrorList = (errors: string[], errorListId: string) => {
    if (!errors || errors.length === 0) return null;
    return (
      <ul
        id={errorListId}
        className="flex flex-col"
        role="alert"
        aria-live="polite"
      >
        {errors.map((error) => (
          <li key={error} className="h-[20px]">
            <span className="text-red-500 text-[12px]/[16px] font-normal">
              {error}
            </span>
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
      <input
        type={type}
        id={id}
        className={classes}
        aria-invalid={hasError}
        aria-describedby={errorId}
        {...props}
      />
      {error && errorId && getErrorList(error, errorId)}
    </div>
  );
};

export default Input;
