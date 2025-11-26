import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { EyeIcon, EyeOffIcon } from "../../../assets/icons/icons";
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
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType && showPassword ? "text" : type;

  const errorId = error?.length ? `${id}-error` : undefined;
  const hasError = Boolean(error?.length);

  const classes = twMerge(
    "w-full h-[48px]",
    "text-[var(--text-color-3)] text-[14px]/[100%] font-[500]",
    "pt-[15px] pb-[16px] pl-[20px]",
    isPasswordType ? "pr-[50px]" : "pr-[25px]",
    "border border-[var(--border-color)] rounded-[10px]",
    "outline-[var(--color-primary)]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    isPasswordType &&
      !showPassword &&
      "tracking-[0.15em] font-[800] text-[26px]",
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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          id={id}
          className={classes}
          aria-invalid={hasError}
          aria-describedby={errorId}
          {...props}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-[15px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-[var(--text-color-3)] opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {error && errorId && getErrorList(error, errorId)}
    </div>
  );
};

export default Input;
